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

const submitForm = async () => {
    try {
        const response = await axios.post('http://localhost:3009/api/contact', formData.value);
        console.log('Form submitted successfully:', response.data);
        alert('Your message has been sent successfully!');
        // Optionally clear the form after successful submission
        formData.value = {
            name: '',
            email: '',
            subject: '',
            message: ''
        };
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('There was an error sending your message. Please try again later.');
    }
};
</script>

<style scoped>
</style>