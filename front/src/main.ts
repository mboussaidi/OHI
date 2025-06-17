// src/main.ts

import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Assuming you have a router
import './assets/main.css';

// --- Start of Vuetify Integration for TypeScript ---
import 'vuetify/styles'; // Import Vuetify styles
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
  components,
  directives,
  // You can add more Vuetify options here, like default theme, icons, etc.
});
// --- End of Vuetify Integration ---

const app = createApp(App);

app.use(router); // Use your router
app.use(vuetify); // <-- Add this line to tell Vue to use Vuetify

app.mount('#app');