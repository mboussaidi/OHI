import axios from 'axios';
export default (await import('vue')).defineComponent({
    data() {
        return {
            businesses: [],
            selectedCategory: '',
            selectedCity: '',
            // selectedStatus: '',
            searchTerm: '',
            cities: ['Ottawa', 'Gatineau', 'Kanata', 'Nepean', 'Orléans', 'Gloucester', 'Barrhaven', 'Stittsville', 'Rockland', 'Manotick', 'Greely'],
            // Pagination
            currentPage: 1,
            itemsPerPage: 6
        };
    },
    computed: {
        // Total pages calculation
        totalPages() {
            return Math.ceil(this.businesses.length / this.itemsPerPage);
        },
        // Businesses for the current page
        paginatedBusinesses() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.businesses.slice(start, end);
        }
    },
    methods: {
        async fetchBusinesses() {
            try {
                const response = await axios.get('http://localhost:3009/api/businesses', {
                    params: {
                        city: this.selectedCity,
                        type: this.selectedCategory,
                        // status: this.selectedStatus,
                        search: this.searchTerm
                    }
                });
                this.businesses = response.data;
                this.currentPage = 1; // Reset to the first page after filtering
            }
            catch (error) {
                console.error('Error fetching businesses:', error);
            }
        },
        // Go to the next page
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        // Go to the previous page
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        }
    },
    mounted() {
        this.fetchBusinesses();
    }
});
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['business-card']} */ ;
/** @type {__VLS_StyleScopedClasses['business-card']} */ ;
/** @type {__VLS_StyleScopedClasses['business-card']} */ ;
/** @type {__VLS_StyleScopedClasses['business-card']} */ ;
/** @type {__VLS_StyleScopedClasses['business-card']} */ ;
/** @type {__VLS_StyleScopedClasses['business-card']} */ ;
/** @type {__VLS_StyleScopedClasses['business-card']} */ ;
/** @type {__VLS_StyleScopedClasses['business-card']} */ ;
/** @type {__VLS_StyleScopedClasses['business-card']} */ ;
/** @type {__VLS_StyleScopedClasses['pagination']} */ ;
/** @type {__VLS_StyleScopedClasses['pagination']} */ ;
/** @type {__VLS_StyleScopedClasses['pagination']} */ ;
/** @type {__VLS_StyleScopedClasses['pagination']} */ ;
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
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
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
        if (business.b_fielda === 'Hand Slaughtered') {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
                width: "48",
                height: "48",
                src: "https://img.icons8.com/color/48/approval--v1.png",
                alt: "Hand Logo",
                ...{ class: "business-logo" },
            });
        }
        else if (business.b_fielda === 'Machine Slaughtered') {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
                width: "48",
                height: "48",
                src: "https://img.icons8.com/emoji/48/warning-emoji.png",
                alt: "warning-emoji",
                ...{ class: "business-logo" },
            });
        }
        else if (business.b_fielda === 'Unknown') {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
                width: "48",
                height: "48",
                src: "https://img.icons8.com/emoji/48/warning-emoji.png",
                alt: "warning-emoji",
                ...{ class: "business-logo" },
            });
        }
        else {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
                width: "48",
                height: "48",
                src: "https://img.icons8.com/external-febrian-hidayat-glyph-febrian-hidayat/48/1A1A1A/external-exclamation-mark-ui-essential-febrian-hidayat-glyph-febrian-hidayat.png",
                alt: "external-exclamation-mark",
                ...{ class: "business-logo" },
            });
        }
        __VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
        (business.b_name);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        (business.b_address);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        (business.b_city);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        (business.b_phone);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        (business.b_type);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        (business.b_fielda);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        (business.b_status);
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
/** @type {__VLS_StyleScopedClasses['filterinfo_item']} */ ;
/** @type {__VLS_StyleScopedClasses['filterinfo_item-name']} */ ;
/** @type {__VLS_StyleScopedClasses['filterinfo_item']} */ ;
/** @type {__VLS_StyleScopedClasses['filterinfo_item-name']} */ ;
/** @type {__VLS_StyleScopedClasses['business-list']} */ ;
/** @type {__VLS_StyleScopedClasses['business-card']} */ ;
/** @type {__VLS_StyleScopedClasses['fade-in']} */ ;
/** @type {__VLS_StyleScopedClasses['card-header']} */ ;
/** @type {__VLS_StyleScopedClasses['business-logo']} */ ;
/** @type {__VLS_StyleScopedClasses['business-logo']} */ ;
/** @type {__VLS_StyleScopedClasses['business-logo']} */ ;
/** @type {__VLS_StyleScopedClasses['business-logo']} */ ;
/** @type {__VLS_StyleScopedClasses['no-results']} */ ;
/** @type {__VLS_StyleScopedClasses['pagination']} */ ;
var __VLS_dollars;
let __VLS_self;
