require('dotenv').config(); // Load environment variables from .env file

const corsOptions = {
    origin: process.env.NODE_ENV === 'production' 
      ? 'http://38.131.186.164' // Replace with your actual domain
      : '*', // Allow all for local development
  };

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer'); // Import nodemailer
const helmet = require('helmet'); // Helps secure your app by setting various HTTP headers
const rateLimit = require('express-rate-limit'); // Basic rate-limiting middleware
const morgan = require('morgan'); // For HTTP request logging
const yup = require('yup'); // For robust schema-based validation

const app = express();
const PORT = process.env.PORT;

app.use(cors(corsOptions));

// --- Helmet Configuration for Security Headers ---
const isProduction = process.env.NODE_ENV === 'production';

// Content-Security-Policy directives
const cspDirectives = {
    defaultSrc: ["'self'"],
    // 'unsafe-inline' and 'unsafe-eval' are often needed for development with Vue/Vite
    // For production, you should aim to remove these and use hashes/nonces or a stricter policy.
    scriptSrc: ["'self'", isProduction ? null : "'unsafe-inline'", isProduction ? null : "'unsafe-eval'"].filter(Boolean),
    styleSrc: ["'self'", isProduction ? null : "'unsafe-inline'"].filter(Boolean),
    imgSrc: ["'self'", "data:", "https://img.icons8.com"], // Allow images from self, data URIs, and icons8.com
    // Allow connections to your own API. Adjust for production domain.
    connectSrc: ["'self'", isProduction ? 'http://38.131.186.164' : 'http://localhost:3009'],
    fontSrc: ["'self'", "https:"], // Allow fonts from self and HTTPS
    objectSrc: ["'none'"], // Disallow <object>, <embed>, <applet>
    mediaSrc: ["'self'"],
    frameSrc: ["'self'"],
    // Consider adding 'report-uri' or 'report-to' for CSP violation reporting in production
};

app.use(helmet({
    // Content-Security-Policy: Protects against XSS and data injection attacks
    contentSecurityPolicy: {
        directives: cspDirectives,
    },
    // X-Frame-Options: SAMEORIGIN - Protects against clickjacking
    frameguard: { action: 'sameorigin' },
    // X-Content-Type-Options: nosniff - Prevents MIME-sniffing
    noSniff: true,
    // Referrer-Policy: Controls how much referrer information is sent
    referrerPolicy: { policy: isProduction ? 'no-referrer' : 'no-referrer-when-downgrade' },
    // Permissions-Policy: Controls browser features and APIs
    permissionsPolicy: {
        features: {
            geolocation: ['self'], // Allow geolocation only from same origin
            microphone: [], // Disallow microphone
            camera: [], // Disallow camera
            fullscreen: ['self'], // Allow fullscreen only from same origin
            // Add or remove features as needed for your application
            // Example: 'payment': ['self', 'https://payment.provider.com']
        },
    },
    // Other useful Helmet middlewares (many are enabled by default)
    hidePoweredBy: true, // Removes the X-Powered-By header
    hsts: { maxAge: 31536000, includeSubDomains: true, preload: true }, // Strict-Transport-Security for HTTPS
    // ... other helmet options can be configured here
}));

// --- HTTP Request Logging ---
// Use morgan. 'dev' format for development (colored status codes) and 'combined' for production.
app.use(morgan(isProduction ? 'combined' : 'dev'));

app.use(express.json());

// --- User Authentication ---

// In-memory store for OTPs. In a production app, use a database or Redis.
const otpStore = {};

// Path to the users database
const usersDbPath = path.join(__dirname, 'db/users.json');

// ✅ Read users from the JSON file
const getUsersFromFile = () => {
    try {
        console.log('[DEBUG] Reading from db/users.json');
        const data = fs.readFileSync(usersDbPath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('[ERROR] Could not read users.json:', error);
        return []; // Return empty array on error
    }
};

// ✅ POST /api/login - User Login
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(`[DEBUG] POST /api/login - Attempting login for: ${email}`);

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    const users = getUsersFromFile();
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // Generate a 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        // Store OTP with a 10-minute expiry
        otpStore[email] = {
            otp,
            expires: Date.now() + 10 * 60 * 1000, // 10 minutes from now
        };

        console.log(`[INFO] Login successful for ${email}. Generated OTP: ${otp}`);

        // --- Send OTP Email ---
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your One-Time Password (OTP)',
            html: `
                <p>Hello ${user.firstname},</p>
                <p>Your One-Time Password (OTP) for Ottawa Halal Initiative is:</p>
                <h2 style="text-align:center; letter-spacing: 2px;">${otp}</h2>
                <p>This code will expire in 10 minutes.</p>
                <p>If you did not request this, please ignore this email.</p>
            `
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log(`[INFO] OTP email sent successfully to ${email}.`);
            res.status(200).json({ message: 'Login successful! OTP has been sent to your email.' });
        } catch (error) {
            console.error(`[ERROR] Failed to send OTP email to ${email}:`, error);
            res.status(500).json({ message: 'Failed to send OTP. Please try again later.' });
        }
    } else {
        console.warn(`[WARN] Login failed for ${email}`);
        res.status(401).json({ message: 'Invalid email or password.' });
    }
});

// ✅ POST /api/verify-otp - Verify the OTP
app.post('/api/verify-otp', (req, res) => {
    const { email, otp } = req.body;
    console.log(`[DEBUG] POST /api/verify-otp - Verifying OTP for: ${email}`);

    if (!email || !otp) {
        return res.status(400).json({ message: 'Email and OTP are required.' });
    }

    const storedOtpData = otpStore[email];

    if (!storedOtpData || Date.now() > storedOtpData.expires || storedOtpData.otp !== otp) {
        if (storedOtpData && Date.now() > storedOtpData.expires) {
            delete otpStore[email]; // Clean up expired OTP
            return res.status(400).json({ message: 'OTP has expired. Please try logging in again.' });
        }
        console.warn(`[WARN] Invalid OTP attempt for ${email}.`);
        return res.status(400).json({ message: 'The OTP you entered is incorrect.' });
    }

    delete otpStore[email]; // OTP is used, so remove it
    console.log(`[INFO] OTP verification successful for ${email}.`);
    // In a real app, you would generate and return a JWT. For now, we'll create a simple mock token.
    const mockToken = `mock-jwt-for-${email}-${Date.now()}`;
    res.status(200).json({
        message: 'Verification successful! You are now logged in.',
        token: mockToken
    });
});

const dbPath = path.join(__dirname, 'db/businesses.json');

// ✅ Read data from the JSON file
const getBusinesses = () => {
    console.log('[DEBUG] Reading from db/businesses.json');
    const data = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(data);
};

// ✅ Write data to the JSON file
const saveBusinesses = (businesses) => {
    console.log('[DEBUG] Writing to db/businesses.json');
    fs.writeFileSync(dbPath, JSON.stringify(businesses, null, 2), 'utf-8');
};

// --- Nodemailer Transporter Setup ---
// Set up Nodemailer transporter using environment variables
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Use environment variable
        pass: process.env.EMAIL_PASS  // Use environment variable
    }
});
// --- End Nodemailer Transporter Setup ---

// --- Security Middleware ---

// Rate limiter to prevent brute-force attacks on the contact form
const contactLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 20, // Limit each IP to 10 requests per windowMs
	standardHeaders: true,
	legacyHeaders: false,
	message: 'Too many requests from this IP, please try again after 15 minutes',
});

// A mock authentication middleware. In a real app, this would validate a JWT.
const userAuth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Expects "Bearer <token>"
    if (token && token.startsWith('mock-jwt-for-')) {
        // For this demo, we'll just check if the token looks like our mock token.
        // A real app would verify the token's signature and expiration.
        console.log('[AUTH] User authenticated with mock token.');
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized: Invalid or missing token' });
    }
};

// Validation schema for the contact form
const contactSchema = yup.object({
    name: yup.string().trim().required('Name is required.'),
    email: yup.string().email('Must be a valid email.').required('Email is required.'),
    subject: yup.string().trim().required('Subject is required.'),
    message: yup.string().trim().required('Message is required.').min(10, 'Message must be at least 10 characters long.'),
});

// ✅ POST endpoint for contact form submissions
app.post('/api/contact', contactLimiter, async (req, res) => {
    const { name, email, subject, message } = req.body;
    console.log(`[DEBUG] POST /api/contact - Received submission from: ${name} <${email}>`);

    try {
        await contactSchema.validate(req.body, { abortEarly: false });
        console.log('[DEBUG] POST /api/contact - Validation successful.');

         const mailOptions = {
            from: process.env.EMAIL_USER, // Sender address (must be the same as your auth user for some services)
            to: process.env.EMAIL_USER, // Your email address where you want to receive requests
            subject: `New Contact Form Submission: ${subject}`,
            html: `
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log('[INFO] Contact form email sent successfully.');
        res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
        // Handle validation errors from Yup
        if (error instanceof yup.ValidationError) {
            console.warn('[WARN] Validation failed for /api/contact:', error.errors);
            return res.status(400).json({ message: 'Validation failed.', errors: error.errors });
        }
        // Handle other errors
        console.error('Error sending contact form email:', error);
        res.status(500).json({ message: 'Failed to send message.', error: error.message });
    }
});


// ✅ GET all businesses (with filters)
app.get('/api/businesses', (req, res) => {
    const { city, type, status, search } = req.query;
    let businesses = getBusinesses();
    console.log('[DEBUG] GET /api/businesses - Received filters:', { city, type, status, search });

    // Filtering
    if (city) {
        businesses = businesses.filter(b => b.b_city.toLowerCase().includes(city.toLowerCase()));
    }
    if (type) {
        businesses = businesses.filter(b => b.b_type.toLowerCase().includes(type.toLowerCase()));
    }
    // if (status) {
    //     businesses = businesses.filter(b => b.b_status.toLowerCase().includes(status.toLowerCase()));
    // }
    if (search) {
        businesses = businesses.filter(b =>
            b.b_name.toLowerCase().includes(search.toLowerCase()) ||
            b.b_address.toLowerCase().includes(search.toLowerCase()) ||
            b.b_city.toLowerCase().includes(search.toLowerCase())
        );
    }

    res.json(businesses);
});

// ✅ GET business by ID
app.get('/api/businesses/:id', (req, res) => {
    const businesses = getBusinesses();
    const business = businesses.find(b => b.b_id === parseInt(req.params.id));

    console.log(`[DEBUG] GET /api/businesses/:id - Searching for ID: ${req.params.id}`);

    if (!business) {
        return res.status(404).send('Business not found');
    }

    res.json(business);
});

// ✅ POST - Add a new business
app.post('/api/businesses', userAuth, (req, res) => {
    const businesses = getBusinesses();
    const maxId = businesses.reduce((max, b) => (b.b_id > max ? b.b_id : max), 0);
    const newBusiness = {
        b_id: maxId + 1,
        ...req.body
    };

    console.log('[DEBUG] POST /api/businesses - Creating new business:', newBusiness);

    businesses.push(newBusiness);
    saveBusinesses(businesses);

    res.status(201).json(newBusiness);
});

// ✅ PUT - Update a business by ID
app.put('/api/businesses/:id', userAuth, (req, res) => {
    const businesses = getBusinesses();
    const businessIndex = businesses.findIndex(b => b.b_id === parseInt(req.params.id));

    console.log(`[DEBUG] PUT /api/businesses/:id - Updating business ID ${req.params.id} with data:`, req.body);

    if (businessIndex === -1) {
        return res.status(404).send('Business not found');
    }

    businesses[businessIndex] = {
        ...businesses[businessIndex],
        ...req.body
    };

    saveBusinesses(businesses);
    res.json(businesses[businessIndex]);
});

// ✅ DELETE - Remove a business by ID
app.delete('/api/businesses/:id', userAuth, (req, res) => {
    let businesses = getBusinesses();
    const filteredBusinesses = businesses.filter(b => b.b_id !== parseInt(req.params.id));

    console.log(`[DEBUG] DELETE /api/businesses/:id - Deleting business ID: ${req.params.id}`);

    if (filteredBusinesses.length === businesses.length) {
        return res.status(404).send('Business not found');
    }

    saveBusinesses(filteredBusinesses);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});