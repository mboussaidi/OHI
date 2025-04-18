import { createRouter, createWebHistory } from 'vue-router';
import MainView from './views/MainView.vue';
import About from './views/About.vue';
import Contact from './views/Contact.vue';
import Listings from './views/Listings.vue';


const routes = [
  { path: '/', component: MainView },
  { path: '/about', component: About },
  { path: '/contact', component: Contact },
  { path: '/listings', component: Listings }
];  

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
