import { ref, computed, onMounted } from 'vue';
import apiClient from '@/plugins/axios';
const businesses = ref([]);
const selectedCategory = ref('');
const selectedCity = ref('');
const searchTerm = ref('');
const cities = ["Barrhaven", "Clarence Creek", "Gatineau", "Gloucester", "Greely", "Kanata", "Manotick", "Nepean", "Orléans", "Ottawa", "Rockland", "Stittsville"];
const currentPage = ref(1);
const itemsPerPage = 6;
const totalPages = computed(() => Math.ceil(businesses.value.length / itemsPerPage));
const paginatedBusinesses = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return businesses.value.slice(start, end);
});
async function fetchBusinesses() {
    try {
        const response = await apiClient.get('/api/businesses', {
            params: {
                city: selectedCity.value,
                type: selectedCategory.value,
                search: searchTerm.value
            }
        });
        businesses.value = response.data;
        currentPage.value = 1;
    }
    catch (error) {
        console.error('Error fetching businesses:', error);
    }
}
function nextPage() {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
        window.scrollTo(0, 0);
    }
}
function prevPage() {
    if (currentPage.value > 1) {
        currentPage.value--;
        window.scrollTo(0, 0);
    }
}
onMounted(() => {
    fetchBusinesses();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "listings" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "top-title" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "main-title" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "filterinfo" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "filterinfo_item" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "filterinfo_item-name" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
    ...{ onChange: (__VLS_ctx.fetchBusinesses) },
    ...{ class: "filterinfo_item-value" },
    value: (__VLS_ctx.selectedCategory),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "Restaurant",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "Butcher",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "filterinfo_item" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "filterinfo_item-name" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
    ...{ onChange: (__VLS_ctx.fetchBusinesses) },
    ...{ class: "filterinfo_item-value" },
    value: (__VLS_ctx.selectedCity),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "",
});
for (const [city] of __VLS_getVForSourceType((__VLS_ctx.cities))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        key: (city),
        value: (city),
    });
    (city);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "filterinfo_item" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "filterinfo_item-name" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    ...{ onInput: (__VLS_ctx.fetchBusinesses) },
    ...{ class: "filterinfo_item-value" },
    placeholder: "Search...",
});
(__VLS_ctx.searchTerm);
if (__VLS_ctx.businesses.length > 0) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "business-list" },
    });
    for (const [business, index] of __VLS_getVForSourceType((__VLS_ctx.paginatedBusinesses))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            key: (business.b_id),
            ...{ class: "business-card fade-in" },
            ...{ style: ({ animationDelay: `${index * 0.15}s` }) },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-header" },
        });
        if (business.b_status === 'Verified') {
            const __VLS_0 = {}.VIcon;
            /** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
            // @ts-ignore
            const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
                color: "success",
                icon: "mdi-check-circle",
                size: "x-large",
                ...{ class: "business-logo" },
            }));
            const __VLS_2 = __VLS_1({
                color: "success",
                icon: "mdi-check-circle",
                size: "x-large",
                ...{ class: "business-logo" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        }
        else if (business.b_status === 'Machine Slaughtered') {
            const __VLS_4 = {}.VIcon;
            /** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
            // @ts-ignore
            const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
                color: "warning",
                icon: "mdi-alert",
                size: "x-large",
                ...{ class: "business-logo" },
            }));
            const __VLS_6 = __VLS_5({
                color: "warning",
                icon: "mdi-alert",
                size: "x-large",
                ...{ class: "business-logo" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_5));
        }
        else {
            const __VLS_8 = {}.VIcon;
            /** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
            // @ts-ignore
            const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
                color: "error",
                icon: "mdi-alert-circle",
                size: "x-large",
                ...{ class: "business-logo" },
            }));
            const __VLS_10 = __VLS_9({
                color: "error",
                icon: "mdi-alert-circle",
                size: "x-large",
                ...{ class: "business-logo" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_9));
        }
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-title" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
        (business.b_name);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-content" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        (business.b_address);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        (business.b_city);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        (business.b_phone);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        (business.b_type);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        (business.b_status);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        (business.b_date_last_check);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
            href: (business.b_address_link),
            target: "_blank",
            rel: "noopener noreferrer",
            ...{ class: "map-link" },
        });
        const __VLS_12 = {}.VIcon;
        /** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
        // @ts-ignore
        const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
            color: "green",
            size: "x-large",
        }));
        const __VLS_14 = __VLS_13({
            color: "green",
            size: "x-large",
        }, ...__VLS_functionalComponentArgsRest(__VLS_13));
        __VLS_15.slots.default;
        var __VLS_15;
    }
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "no-results" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
}
if (__VLS_ctx.businesses.length > 0) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "pagination" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.prevPage) },
        disabled: (__VLS_ctx.currentPage === 1),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.currentPage);
    (__VLS_ctx.totalPages);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.nextPage) },
        disabled: (__VLS_ctx.currentPage >= __VLS_ctx.totalPages),
    });
}
/** @type {__VLS_StyleScopedClasses['listings']} */ ;
/** @type {__VLS_StyleScopedClasses['top-title']} */ ;
/** @type {__VLS_StyleScopedClasses['main-title']} */ ;
/** @type {__VLS_StyleScopedClasses['filterinfo']} */ ;
/** @type {__VLS_StyleScopedClasses['filterinfo_item']} */ ;
/** @type {__VLS_StyleScopedClasses['filterinfo_item-name']} */ ;
/** @type {__VLS_StyleScopedClasses['filterinfo_item-value']} */ ;
/** @type {__VLS_StyleScopedClasses['filterinfo_item']} */ ;
/** @type {__VLS_StyleScopedClasses['filterinfo_item-name']} */ ;
/** @type {__VLS_StyleScopedClasses['filterinfo_item-value']} */ ;
/** @type {__VLS_StyleScopedClasses['filterinfo_item']} */ ;
/** @type {__VLS_StyleScopedClasses['filterinfo_item-name']} */ ;
/** @type {__VLS_StyleScopedClasses['filterinfo_item-value']} */ ;
/** @type {__VLS_StyleScopedClasses['business-list']} */ ;
/** @type {__VLS_StyleScopedClasses['business-card']} */ ;
/** @type {__VLS_StyleScopedClasses['fade-in']} */ ;
/** @type {__VLS_StyleScopedClasses['card-header']} */ ;
/** @type {__VLS_StyleScopedClasses['business-logo']} */ ;
/** @type {__VLS_StyleScopedClasses['business-logo']} */ ;
/** @type {__VLS_StyleScopedClasses['business-logo']} */ ;
/** @type {__VLS_StyleScopedClasses['card-title']} */ ;
/** @type {__VLS_StyleScopedClasses['card-content']} */ ;
/** @type {__VLS_StyleScopedClasses['map-link']} */ ;
/** @type {__VLS_StyleScopedClasses['no-results']} */ ;
/** @type {__VLS_StyleScopedClasses['pagination']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            businesses: businesses,
            selectedCategory: selectedCategory,
            selectedCity: selectedCity,
            searchTerm: searchTerm,
            cities: cities,
            currentPage: currentPage,
            totalPages: totalPages,
            paginatedBusinesses: paginatedBusinesses,
            fetchBusinesses: fetchBusinesses,
            nextPage: nextPage,
            prevPage: prevPage,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=Listings.vue.js.map