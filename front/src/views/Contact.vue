<template>
    <div class="contact-section">
        <div class="top-title">
            <p class="main-title">Contact Us</p>
            <div class="title-section-home">
                <h3>Looking to be added to our listing? Have a question?</h3>
            </div>
            <div>
                <p>Please fill out the form below to reach out with any questions or to request inclusion in the OHI listing.</p>
            </div>
        </div>

        <div class="contact-container">
            <v-snackbar
                v-model="snackbar.show"
                :color="snackbar.color"
                :timeout="6000"    
                location="top center"
            >
                <div v-html="snackbar.message"></div>
                <template v-slot:actions>
                    <v-btn variant="text" @click="snackbar.show = false">
                        Close
                    </v-btn>
                </template>
            </v-snackbar>
            <form @submit.prevent="submitForm">
                <div class="form-group">
                    <label for="name">Your Name</label>
                    <input type="text" id="name" class="contact-form-input" v-model="formData.name" required>
                </div>

                <div class="form-group">
                    <label for="email">Your Email</label>
                    <input type="email" id="email" class="contact-form-input" v-model="formData.email" required>
                </div>

                <div class="form-group">
                    <label for="subject">Subject</label>
                    <input type="text" id="subject" class="contact-form-input" v-model="formData.subject" required>
                </div>

                <div class="form-group">
                    <label for="message">Message</label>
                    <textarea id="message" class="contact-form-input" v-model="formData.message" required></textarea>
                </div>
                <v-btn type="submit" class="submit-button" elevation="6" variant="elevated">Submit</v-btn>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'; // Import ref
import axios from 'axios'; // Import axios for making HTTP requests

// Define a reactive object to store form data
const formData = ref({
    name: '',
    email: '',
    subject: '',
    message: ''
});

// Define a reactive object for the snackbar
const snackbar = ref({
    show: false,
    color: 'success', // 'success' or 'error'
    message: ''
});

const submitForm = async () => {
    snackbar.value.show = false; // Hide previous snackbars
    try {
        const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/api/contact`;
        const response = await axios.post(apiUrl, formData.value);
        console.log('Form submitted successfully:', response.data);

        snackbar.value = {
            show: true,
            color: 'success',
            message: 'Thank you for your message! <br>We will get back to you within 2 to 3 business days InshaAllah'
        };

        // Optionally clear the form after successful submission
        formData.value = {
            name: '',
            email: '',
            subject: '',
            message: ''
        };
    } catch (error) {
        console.error('Error submitting form:', error);
        let errorMessage = 'There was an error sending your message. Please try again later. We apologize for this inconvenience.';
        if (error.response?.data?.errors) {
            errorMessage = error.response.data.errors.join(' ');
        } else if (error.response?.data?.message) {
            errorMessage = error.response.data.message;
        }
        snackbar.value = { show: true, color: 'error', message: errorMessage };
    }
};
</script>

<style scoped>
</style>