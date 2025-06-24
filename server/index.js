require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer'); // Import nodemailer

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

const dbPath = path.join(__dirname, 'db/businesses.json');

// ✅ Read data from the JSON file
const getBusinesses = () => {
    const data = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(data);
};

// ✅ Write data to the JSON file
const saveBusinesses = (businesses) => {
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


// ✅ POST endpoint for contact form submissions
app.post('/api/contact', async (req, res) => {
    console.log(`Server log #####: email preparation started`);

    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
         const mailOptions = {
            from: 'ottawahalalinitiative@gmail.com', // Sender address (must be the same as your auth user for some services)
            to: 'ottawahalalinitiative@gmail.com', // Your email address where you want to receive requests
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
        console.log('Contact form email sent successfully.');
        res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error sending contact form email:', error);
        res.status(500).json({ message: 'Failed to send message.', error: error.message });
    }
});


// ✅ GET all businesses (with filters)
app.get('/api/businesses', (req, res) => {
    const { city, type, status, search } = req.query;
    let businesses = getBusinesses();


    console.log(`Server log #####: GET businesses___=${businesses.b_city}`);

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
    console.log(`Server log: GET /api/businesses?city=${city}&type=${type}&status=${status}&search=${search}`);

});

// ✅ GET business by ID
app.get('/api/businesses/:id', (req, res) => {
    const businesses = getBusinesses();
    const business = businesses.find(b => b.b_id === parseInt(req.params.id));

    if (!business) {
        return res.status(404).send('Business not found');
    }

    res.json(business);
});

// ✅ POST - Add a new business
app.post('/api/businesses', (req, res) => {
    const businesses = getBusinesses();
    const newBusiness = {
        b_id: businesses.length + 1,
        ...req.body
    };

    businesses.push(newBusiness);
    saveBusinesses(businesses);

    res.status(201).json(newBusiness);
});

// ✅ PUT - Update a business by ID
app.put('/api/businesses/:id', (req, res) => {
    const businesses = getBusinesses();
    const businessIndex = businesses.findIndex(b => b.b_id === parseInt(req.params.id));

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
app.delete('/api/businesses/:id', (req, res) => {
    let businesses = getBusinesses();
    const filteredBusinesses = businesses.filter(b => b.b_id !== parseInt(req.params.id));

    if (filteredBusinesses.length === businesses.length) {
        return res.status(404).send('Business not found');
    }

    saveBusinesses(filteredBusinesses);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});