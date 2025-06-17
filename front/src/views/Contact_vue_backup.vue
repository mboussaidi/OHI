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
            <form action="contact" method="post">
                <div class="form-group">
                    <label for="name">Your Name</label>
                    <input type="text" id="name" name="name" required>
                </div>
    
                <div class="form-group">
                    <label for="email">Your Email</label>
                    <input type="email" id="email" name="email" required>
                </div>
    
                <div class="form-group">
                    <label for="subject">Subject</label>
                    <input type="text" id="subject" name="subject" required>
                </div>
    
                <div class="form-group">
                    <label for="message">Message</label>
                    <textarea id="message" name="message" required></textarea>
                </div>
                <v-btn class="submit-button" @click="reloadPage">Submit</v-btn>
            </form>
        </div>
    </div>
</template>


<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const reloadPage = () => {
    router.go(0); // reload the page
};
</script>


<style scoped>

</style>