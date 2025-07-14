import { createRouter, createWebHistory } from 'vue-router';
const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/MainView.vue'),
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('../views/About.vue'),
    },
    {
        path: '/halal',
        name: 'Halal',
        component: () => import('../views/Halal.vue'),
    },
    {
        path: '/contact',
        name: 'Contact',
        component: () => import('../views/Contact.vue'),
    },
    {
        path: '/listings',
        name: 'Listings',
        component: () => import('../views/Listings.vue'),
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue'),
    },
    {
        path: '/verify-otp',
        name: 'OtpVerification',
        component: () => import('../views/OtpVerification.vue'),
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('../views/Dashboard.vue'),
        meta: { requiresAuth: true }, // This route requires authentication
    },
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
// Global navigation guard
router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('authToken');
    if (to.meta.requiresAuth && !isAuthenticated) {
        // If the route requires authentication and the user is not authenticated, redirect to login.
        next({ name: 'Login' });
    }
    else {
        // Otherwise, allow navigation.
        next();
    }
});
export default router;
//# sourceMappingURL=index.js.map