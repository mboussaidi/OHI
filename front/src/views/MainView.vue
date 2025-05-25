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
                <p>Be Confident Wherever You Eat</p>
                <p>Ottawa Halal Initiative (OHI) was established for the purpose of making halal consumption an attainable goal for the Muslim population in the Ottawa region. Recognizing the importance of eating halal on both physical and spiritual health, OHI intends to inquire and verify the permissibility of the meat source.</p>
                <p>The Prophet (Sallallahu 'Alayhi Wasallam) said “The lawful is clear, and the unlawful is clear. Between these lie matters of doubt. Regarding these, many are ignorant. Whomsoever falls into these, falls into the unlawful, like a shepherd grazing (his flock) upon a sanctuary's perimeter very soon falls into trespass.” (Bukhari & Muslim)</p>
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
.redirect-button {
    box-shadow: 0 1px #ffffffbf inset;
    display: inline-block;
    padding: 12px 24px;
    font-weight: bold;
    color: rgb(220, 236, 229);
    text-decoration: none;
    border-radius: 8px;
    font-family: Inter, sans-serif;
    font-weight: 500;
    text-shadow: 0 0 2px rgba(0, 0, 0, .2);
    transition: all .2s ease-in-out;
    width: fit-content;
    /*  background: linear-gradient(135deg, #646cff, #535bf2);*/
    background: radial-gradient(141.42% 141.42% at 100% 0%, #ffffff80, #fff0), radial-gradient(140.35% 140.35% at 100% 94.74%, #116a4b, #bd34fe00), radial-gradient(89.94% 89.94% at 18.42% 15.79%, #165047, #41d1ff00);
    transition: background 0.3s, transform 0.2s;
    margin-top: 30px;
    margin-bottom: 30px;
    border: none;
    cursor: pointer;
    font-size: 18px;
}

.redirect-button:hover {
    background-color: #1af478;
}
</style>