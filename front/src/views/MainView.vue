<template>
    <div class="main-view">
        <div class="top-title">
            <p class="main-title">Ottawa Halal Initiative</p>
            <!-- <p class="sub-title">Monitoring Initiative</p> -->
        </div>
    
        <p class="description">Your trusted source for halal consumption in the Ottawa region</p>
    </div>
    
    <div class="section-home-acclist">
        <button class="redirect-button" @click="goToListings">View Listings</button>
    
    </div>
    
    <div class="section-home-about">
        <div class="left-section">
            <div class="title-section-home">
                <h2>Mission Statement</h2>
            </div>
            <div class="description-section-home">
                <span>Be Confident Wherever You Eat</span>
                <span>Ottawa Halal Initiative (OHI) was established for the purpose of making halal consumption an attainable goal for the Muslim population in the Ottawa region. Recognizing the importance of eating halal on both physical and spiritual health, OHI intends to inquire and verify the permissibility of the meat source.</span>
                <span>The Prophet (Sallallahu 'Alayhi Wasallam) said “The lawful is clear, and the unlawful is clear. Between these lie matters of doubt. Regarding these, many are ignorant. Whomsoever falls into these, falls into the unlawful, like a shepherd grazing (his flock) upon a sanctuary's perimeter very soon falls into trespass.” (Bukhari & Muslim)</span>
            </div>
        </div>
    
        <div class="right-section">
            <img src="/public/img/food-img-001.jpg" alt="" />
        </div>
    </div>
    
    <div class="section-home-recentlisting">
    
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'MainView',
    setup() {
        const router = useRouter();

        const goToListings = () => {
            router.push('/listings');
        };

        return {
            goToListings,
        };
    },
});
</script>
  

<style scoped>
</style>