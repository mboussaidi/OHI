import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
    name: 'MainView',
    setup() {
        const router = useRouter();
        // Example of using the environment variable
        console.log('API Base URL:', import.meta.env.VITE_API_BASE_URL);
        const goToListings = () => {
            router.push('/listings');
        };
        return {
            goToListings,
        };
    },
});
debugger; /* PartiallyEnd: #3632/script.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "main-view" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "top-title" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "main-title" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "description" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "section-home-acclist" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.goToListings) },
    ...{ class: "redirect-button" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "section-home-about" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "left-section" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "title-section-home" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "description-section-home" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "right-section" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
    src: "/img/food-img-001.jpg",
    alt: "",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "section-home-recentlisting" },
});
/** @type {__VLS_StyleScopedClasses['main-view']} */ ;
/** @type {__VLS_StyleScopedClasses['top-title']} */ ;
/** @type {__VLS_StyleScopedClasses['main-title']} */ ;
/** @type {__VLS_StyleScopedClasses['description']} */ ;
/** @type {__VLS_StyleScopedClasses['section-home-acclist']} */ ;
/** @type {__VLS_StyleScopedClasses['redirect-button']} */ ;
/** @type {__VLS_StyleScopedClasses['section-home-about']} */ ;
/** @type {__VLS_StyleScopedClasses['left-section']} */ ;
/** @type {__VLS_StyleScopedClasses['title-section-home']} */ ;
/** @type {__VLS_StyleScopedClasses['description-section-home']} */ ;
/** @type {__VLS_StyleScopedClasses['right-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-home-recentlisting']} */ ;
var __VLS_dollars;
let __VLS_self;
//# sourceMappingURL=MainView.vue.js.map