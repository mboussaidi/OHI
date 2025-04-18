<script lang="ts">
import { defineComponent } from 'vue';
import FooterView from './views/FooterView.vue';

export default defineComponent({
    name: 'App',
    components: {
        FooterView
    }
});
</script>

<template>
    <!-- <v-app> -->
    <div id="app">
        <div class="container">
    
            <div class="body">
    
                <div class="section-home-header">
    
                    <header class="header">
                        <nav class="nav">
                            <router-link to="/">Home</router-link>
                            <router-link to="/about">About</router-link>
                            <router-link to="/listings">Listings</router-link>
                            <router-link to="/contact">Contact</router-link>
                        </nav>
                    </header>
    
                    <div class="black-gradient"></div>
    
    
    
                </div>
    
                <main class="main">
                    <router-view />
                </main>
    

    
    
                <div class="footer">
                    <FooterView />
                </div>
    
            </div>
        </div>
    
    </div>
    <!-- </v-app> -->
</template>



<style>

</style>
