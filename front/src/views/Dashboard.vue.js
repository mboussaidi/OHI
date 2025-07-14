import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import apiClient from '@/plugins/axios';
import { isAxiosError } from 'axios';
const router = useRouter();
function logout() {
    localStorage.removeItem('authToken'); // Clear the authentication token
    router.push({ name: 'Login' }); // Redirect to the login page
}
// --- Business Management Logic ---
const businesses = ref([]);
const loading = ref(false);
const error = ref(null);
const search = ref('');
const headers = [
    { title: 'Name', key: 'b_name', align: 'start' },
    { title: 'Address', key: 'b_address' },
    { title: 'City', key: 'b_city' },
    { title: 'Type', key: 'b_type' },
    { title: 'Status', key: 'b_status' },
    { title: 'Map', key: 'b_address_link', sortable: false, align: 'center' },
    { title: 'Actions', key: 'actions', sortable: false, align: 'end' },
];
// Modal state
const showModal = ref(false);
const isEditing = ref(false);
const currentBusiness = ref({});
const businessForm = ref(); // Reference to the v-form
const isFormValid = ref(false);
const defaultBusiness = {
    b_name: '',
    b_address: '',
    b_city: '',
    b_type: '',
    b_phone: '',
    b_status: 'Verified',
    b_date_last_check: new Date().toISOString().split('T')[0], // Default to today
    b_address_link: '',
};
// Delete confirmation state
const showDeleteConfirm = ref(false);
const businessToDelete = ref(null);
// Inactivity dialog state
const showInactivityDialog = ref(false);
const rules = {
    required: (v) => !!v || 'This field is required.',
    phone: (v) => !v ||
        /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(v) ||
        'Phone number must be a valid format.',
    url: (v) => !v ||
        /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(v) ||
        'URL must be a valid format.',
};
function formatPhoneNumber(event) {
    const input = event.target;
    if (!input.value)
        return;
    const digits = input.value.replace(/\D/g, '').slice(0, 10);
    let formatted = digits;
    if (digits.length > 3) {
        formatted = `${digits.slice(0, 3)}-${digits.slice(3)}`;
    }
    if (digits.length > 6) {
        formatted = `${formatted.slice(0, 7)}-${digits.slice(6)}`;
    }
    currentBusiness.value.b_phone = formatted;
}
async function fetchBusinesses() {
    loading.value = true;
    error.value = null;
    try {
        const response = await apiClient.get('/api/businesses');
        // Sort by name as requested
        businesses.value = response.data.sort((a, b) => a.b_name.localeCompare(b.b_name));
    }
    catch (err) {
        console.error('Failed to fetch businesses:', err);
        error.value = 'Could not load business data. Please try again later.';
    }
    finally {
        loading.value = false;
    }
}
onMounted(() => {
    fetchBusinesses();
    // Set up inactivity detection when the user is on the dashboard
    setupInactivityListeners();
    resetInactivityTimer();
});
function openAddModal() {
    isEditing.value = false;
    currentBusiness.value = { ...defaultBusiness, b_date_last_check: new Date().toISOString().split('T')[0] };
    showModal.value = true;
}
function openEditModal(business) {
    isEditing.value = true;
    currentBusiness.value = { ...business };
    showModal.value = true;
}
function closeModal() {
    showModal.value = false;
    businessForm.value?.resetValidation();
}
async function saveBusiness() {
    const { valid } = await businessForm.value?.validate();
    if (!valid)
        return;
    error.value = null;
    try {
        if (isEditing.value) {
            // Update existing business
            await apiClient.put(`/api/businesses/${currentBusiness.value.b_id}`, currentBusiness.value);
        }
        else {
            // Add new business
            await apiClient.post('/api/businesses', currentBusiness.value);
        }
        closeModal();
        setTimeout(() => {
            fetchBusinesses(); // Refresh the list after a short delay
        }, 500);
    }
    catch (err) {
        if (isAxiosError(err) && err.response) {
            error.value = err.response.data.message || 'An error occurred while saving the business.';
        }
        else {
            console.error('Failed to save business:', err);
            error.value = 'An unexpected error occurred.';
        }
    }
}
function confirmDelete(business) {
    businessToDelete.value = business;
    showDeleteConfirm.value = true;
}
async function deleteBusinessConfirmed() {
    if (!businessToDelete.value?.b_id)
        return;
    error.value = null;
    try {
        await apiClient.delete(`/api/businesses/${businessToDelete.value.b_id}`);
        showDeleteConfirm.value = false;
        businessToDelete.value = null;
        setTimeout(() => {
            fetchBusinesses(); // Refresh the list after a short delay
        }, 1000);
    }
    catch (err) {
        if (isAxiosError(err) && err.response) {
            error.value = err.response.data.message || 'An error occurred while deleting the business.';
        }
        else {
            console.error('Failed to delete business:', err);
            error.value = 'An unexpected error occurred.';
        }
    }
}
// --- Inactivity Logout Logic ---
let inactivityTimer;
function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = window.setTimeout(() => {
        // Show the inactivity dialog instead of a browser alert
        showInactivityDialog.value = true;
    }, 5 * 60 * 1000); // 5 minutes in milliseconds
}
function handleInactivityLogout() {
    showInactivityDialog.value = false;
    logout();
}
function setupInactivityListeners() {
    // These events will reset the timer
    window.addEventListener('mousemove', resetInactivityTimer, { passive: true });
    window.addEventListener('keydown', resetInactivityTimer, { passive: true });
    window.addEventListener('click', resetInactivityTimer, { passive: true });
    window.addEventListener('scroll', resetInactivityTimer, { passive: true });
}
function cleanupInactivityListeners() {
    // Remove listeners to prevent memory leaks when the component is destroyed
    window.removeEventListener('mousemove', resetInactivityTimer);
    window.removeEventListener('keydown', resetInactivityTimer);
    window.removeEventListener('click', resetInactivityTimer);
    window.removeEventListener('scroll', resetInactivityTimer);
    clearTimeout(inactivityTimer);
}
onUnmounted(() => {
    cleanupInactivityListeners();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['dashboard-container']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard-container']} */ ;
// CSS variable injection 
// CSS variable injection end 
const __VLS_0 = {}.VContainer;
/** @type {[typeof __VLS_components.VContainer, typeof __VLS_components.vContainer, typeof __VLS_components.VContainer, typeof __VLS_components.vContainer, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ class: "dashboard-container" },
}));
const __VLS_2 = __VLS_1({
    ...{ class: "dashboard-container" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
__VLS_3.slots.default;
const __VLS_5 = {}.VRow;
/** @type {[typeof __VLS_components.VRow, typeof __VLS_components.vRow, typeof __VLS_components.VRow, typeof __VLS_components.vRow, ]} */ ;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
    justify: "center",
    ...{ class: "mt-10" },
}));
const __VLS_7 = __VLS_6({
    justify: "center",
    ...{ class: "mt-10" },
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
__VLS_8.slots.default;
const __VLS_9 = {}.VCol;
/** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
// @ts-ignore
const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({
    cols: "12",
    md: "10",
    lg: "8",
}));
const __VLS_11 = __VLS_10({
    cols: "12",
    md: "10",
    lg: "8",
}, ...__VLS_functionalComponentArgsRest(__VLS_10));
__VLS_12.slots.default;
const __VLS_13 = {}.VCard;
/** @type {[typeof __VLS_components.VCard, typeof __VLS_components.vCard, typeof __VLS_components.VCard, typeof __VLS_components.vCard, ]} */ ;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({
    color: "green-lighten-5",
    ...{ class: "pa-6" },
}));
const __VLS_15 = __VLS_14({
    color: "green-lighten-5",
    ...{ class: "pa-6" },
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
__VLS_16.slots.default;
const __VLS_17 = {}.VCardTitle;
/** @type {[typeof __VLS_components.VCardTitle, typeof __VLS_components.vCardTitle, typeof __VLS_components.VCardTitle, typeof __VLS_components.vCardTitle, ]} */ ;
// @ts-ignore
const __VLS_18 = __VLS_asFunctionalComponent(__VLS_17, new __VLS_17({
    ...{ class: "text-h4 font-weight-bold text-green" },
}));
const __VLS_19 = __VLS_18({
    ...{ class: "text-h4 font-weight-bold text-green" },
}, ...__VLS_functionalComponentArgsRest(__VLS_18));
__VLS_20.slots.default;
var __VLS_20;
const __VLS_21 = {}.VCardText;
/** @type {[typeof __VLS_components.VCardText, typeof __VLS_components.vCardText, typeof __VLS_components.VCardText, typeof __VLS_components.vCardText, ]} */ ;
// @ts-ignore
const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({}));
const __VLS_23 = __VLS_22({}, ...__VLS_functionalComponentArgsRest(__VLS_22));
__VLS_24.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
var __VLS_24;
const __VLS_25 = {}.VCardActions;
/** @type {[typeof __VLS_components.VCardActions, typeof __VLS_components.vCardActions, typeof __VLS_components.VCardActions, typeof __VLS_components.vCardActions, ]} */ ;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({}));
const __VLS_27 = __VLS_26({}, ...__VLS_functionalComponentArgsRest(__VLS_26));
__VLS_28.slots.default;
const __VLS_29 = {}.VSpacer;
/** @type {[typeof __VLS_components.VSpacer, typeof __VLS_components.vSpacer, typeof __VLS_components.VSpacer, typeof __VLS_components.vSpacer, ]} */ ;
// @ts-ignore
const __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29({}));
const __VLS_31 = __VLS_30({}, ...__VLS_functionalComponentArgsRest(__VLS_30));
const __VLS_33 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_34 = __VLS_asFunctionalComponent(__VLS_33, new __VLS_33({
    ...{ 'onClick': {} },
    color: "red",
    variant: "elevated",
}));
const __VLS_35 = __VLS_34({
    ...{ 'onClick': {} },
    color: "red",
    variant: "elevated",
}, ...__VLS_functionalComponentArgsRest(__VLS_34));
let __VLS_37;
let __VLS_38;
let __VLS_39;
const __VLS_40 = {
    onClick: (__VLS_ctx.logout)
};
__VLS_36.slots.default;
var __VLS_36;
var __VLS_28;
var __VLS_16;
var __VLS_12;
var __VLS_8;
const __VLS_41 = {}.VRow;
/** @type {[typeof __VLS_components.VRow, typeof __VLS_components.vRow, typeof __VLS_components.VRow, typeof __VLS_components.vRow, ]} */ ;
// @ts-ignore
const __VLS_42 = __VLS_asFunctionalComponent(__VLS_41, new __VLS_41({
    justify: "center",
    ...{ class: "mt-6" },
}));
const __VLS_43 = __VLS_42({
    justify: "center",
    ...{ class: "mt-6" },
}, ...__VLS_functionalComponentArgsRest(__VLS_42));
__VLS_44.slots.default;
const __VLS_45 = {}.VCol;
/** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
// @ts-ignore
const __VLS_46 = __VLS_asFunctionalComponent(__VLS_45, new __VLS_45({
    cols: "12",
    md: "10",
    lg: "8",
}));
const __VLS_47 = __VLS_46({
    cols: "12",
    md: "10",
    lg: "8",
}, ...__VLS_functionalComponentArgsRest(__VLS_46));
__VLS_48.slots.default;
const __VLS_49 = {}.VCard;
/** @type {[typeof __VLS_components.VCard, typeof __VLS_components.vCard, typeof __VLS_components.VCard, typeof __VLS_components.vCard, ]} */ ;
// @ts-ignore
const __VLS_50 = __VLS_asFunctionalComponent(__VLS_49, new __VLS_49({}));
const __VLS_51 = __VLS_50({}, ...__VLS_functionalComponentArgsRest(__VLS_50));
__VLS_52.slots.default;
const __VLS_53 = {}.VCardTitle;
/** @type {[typeof __VLS_components.VCardTitle, typeof __VLS_components.vCardTitle, typeof __VLS_components.VCardTitle, typeof __VLS_components.vCardTitle, ]} */ ;
// @ts-ignore
const __VLS_54 = __VLS_asFunctionalComponent(__VLS_53, new __VLS_53({
    ...{ class: "text-h5 font-weight-bold text-green pt-4 px-4 pb-0" },
}));
const __VLS_55 = __VLS_54({
    ...{ class: "text-h5 font-weight-bold text-green pt-4 px-4 pb-0" },
}, ...__VLS_functionalComponentArgsRest(__VLS_54));
__VLS_56.slots.default;
var __VLS_56;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "pa-4" },
});
const __VLS_57 = {}.VTextField;
/** @type {[typeof __VLS_components.VTextField, typeof __VLS_components.vTextField, typeof __VLS_components.VTextField, typeof __VLS_components.vTextField, ]} */ ;
// @ts-ignore
const __VLS_58 = __VLS_asFunctionalComponent(__VLS_57, new __VLS_57({
    modelValue: (__VLS_ctx.search),
    appendInnerIcon: "mdi-magnify",
    label: "Start typing to search businesses...",
    singleLine: true,
    hideDetails: true,
    density: "compact",
}));
const __VLS_59 = __VLS_58({
    modelValue: (__VLS_ctx.search),
    appendInnerIcon: "mdi-magnify",
    label: "Start typing to search businesses...",
    singleLine: true,
    hideDetails: true,
    density: "compact",
}, ...__VLS_functionalComponentArgsRest(__VLS_58));
const __VLS_61 = {}.VCardText;
/** @type {[typeof __VLS_components.VCardText, typeof __VLS_components.vCardText, typeof __VLS_components.VCardText, typeof __VLS_components.vCardText, ]} */ ;
// @ts-ignore
const __VLS_62 = __VLS_asFunctionalComponent(__VLS_61, new __VLS_61({
    ...{ class: "pt-0" },
}));
const __VLS_63 = __VLS_62({
    ...{ class: "pt-0" },
}, ...__VLS_functionalComponentArgsRest(__VLS_62));
__VLS_64.slots.default;
if (__VLS_ctx.error) {
    const __VLS_65 = {}.VAlert;
    /** @type {[typeof __VLS_components.VAlert, typeof __VLS_components.vAlert, typeof __VLS_components.VAlert, typeof __VLS_components.vAlert, ]} */ ;
    // @ts-ignore
    const __VLS_66 = __VLS_asFunctionalComponent(__VLS_65, new __VLS_65({
        ...{ 'onClick:close': {} },
        type: "error",
        density: "compact",
        closable: true,
        ...{ class: "mb-4" },
    }));
    const __VLS_67 = __VLS_66({
        ...{ 'onClick:close': {} },
        type: "error",
        density: "compact",
        closable: true,
        ...{ class: "mb-4" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_66));
    let __VLS_69;
    let __VLS_70;
    let __VLS_71;
    const __VLS_72 = {
        'onClick:close': (...[$event]) => {
            if (!(__VLS_ctx.error))
                return;
            __VLS_ctx.error = null;
        }
    };
    __VLS_68.slots.default;
    (__VLS_ctx.error);
    var __VLS_68;
}
const __VLS_73 = {}.VDataTable;
/** @type {[typeof __VLS_components.VDataTable, typeof __VLS_components.vDataTable, typeof __VLS_components.VDataTable, typeof __VLS_components.vDataTable, ]} */ ;
// @ts-ignore
const __VLS_74 = __VLS_asFunctionalComponent(__VLS_73, new __VLS_73({
    headers: (__VLS_ctx.headers),
    items: (__VLS_ctx.businesses),
    loading: (__VLS_ctx.loading),
    search: (__VLS_ctx.search),
    ...{ class: "elevation-1" },
    itemValue: "b_id",
    align: "center",
}));
const __VLS_75 = __VLS_74({
    headers: (__VLS_ctx.headers),
    items: (__VLS_ctx.businesses),
    loading: (__VLS_ctx.loading),
    search: (__VLS_ctx.search),
    ...{ class: "elevation-1" },
    itemValue: "b_id",
    align: "center",
}, ...__VLS_functionalComponentArgsRest(__VLS_74));
__VLS_76.slots.default;
{
    const { 'item.b_address_link': __VLS_thisSlot } = __VLS_76.slots;
    const [{ item }] = __VLS_getSlotParams(__VLS_thisSlot);
    if (item.b_address_link) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
            href: (item.b_address_link),
            target: "_blank",
            rel: "noopener noreferrer",
        });
        const __VLS_77 = {}.VIcon;
        /** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
        // @ts-ignore
        const __VLS_78 = __VLS_asFunctionalComponent(__VLS_77, new __VLS_77({
            color: "green",
        }));
        const __VLS_79 = __VLS_78({
            color: "green",
        }, ...__VLS_functionalComponentArgsRest(__VLS_78));
        __VLS_80.slots.default;
        var __VLS_80;
    }
}
{
    const { 'item.actions': __VLS_thisSlot } = __VLS_76.slots;
    const [{ item }] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_81 = {}.VIcon;
    /** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
    // @ts-ignore
    const __VLS_82 = __VLS_asFunctionalComponent(__VLS_81, new __VLS_81({
        ...{ 'onClick': {} },
        ...{ class: "mr-2" },
    }));
    const __VLS_83 = __VLS_82({
        ...{ 'onClick': {} },
        ...{ class: "mr-2" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_82));
    let __VLS_85;
    let __VLS_86;
    let __VLS_87;
    const __VLS_88 = {
        onClick: (...[$event]) => {
            __VLS_ctx.openEditModal(item);
        }
    };
    __VLS_84.slots.default;
    var __VLS_84;
    const __VLS_89 = {}.VIcon;
    /** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
    // @ts-ignore
    const __VLS_90 = __VLS_asFunctionalComponent(__VLS_89, new __VLS_89({
        ...{ 'onClick': {} },
        color: "error",
    }));
    const __VLS_91 = __VLS_90({
        ...{ 'onClick': {} },
        color: "error",
    }, ...__VLS_functionalComponentArgsRest(__VLS_90));
    let __VLS_93;
    let __VLS_94;
    let __VLS_95;
    const __VLS_96 = {
        onClick: (...[$event]) => {
            __VLS_ctx.confirmDelete(item);
        }
    };
    __VLS_92.slots.default;
    var __VLS_92;
}
var __VLS_76;
var __VLS_64;
const __VLS_97 = {}.VCardActions;
/** @type {[typeof __VLS_components.VCardActions, typeof __VLS_components.vCardActions, typeof __VLS_components.VCardActions, typeof __VLS_components.vCardActions, ]} */ ;
// @ts-ignore
const __VLS_98 = __VLS_asFunctionalComponent(__VLS_97, new __VLS_97({}));
const __VLS_99 = __VLS_98({}, ...__VLS_functionalComponentArgsRest(__VLS_98));
__VLS_100.slots.default;
const __VLS_101 = {}.VSpacer;
/** @type {[typeof __VLS_components.VSpacer, typeof __VLS_components.vSpacer, typeof __VLS_components.VSpacer, typeof __VLS_components.vSpacer, ]} */ ;
// @ts-ignore
const __VLS_102 = __VLS_asFunctionalComponent(__VLS_101, new __VLS_101({}));
const __VLS_103 = __VLS_102({}, ...__VLS_functionalComponentArgsRest(__VLS_102));
const __VLS_105 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_106 = __VLS_asFunctionalComponent(__VLS_105, new __VLS_105({
    ...{ 'onClick': {} },
    color: "green",
    variant: "elevated",
}));
const __VLS_107 = __VLS_106({
    ...{ 'onClick': {} },
    color: "green",
    variant: "elevated",
}, ...__VLS_functionalComponentArgsRest(__VLS_106));
let __VLS_109;
let __VLS_110;
let __VLS_111;
const __VLS_112 = {
    onClick: (__VLS_ctx.openAddModal)
};
__VLS_108.slots.default;
var __VLS_108;
var __VLS_100;
var __VLS_52;
var __VLS_48;
var __VLS_44;
const __VLS_113 = {}.VDialog;
/** @type {[typeof __VLS_components.VDialog, typeof __VLS_components.vDialog, typeof __VLS_components.VDialog, typeof __VLS_components.vDialog, ]} */ ;
// @ts-ignore
const __VLS_114 = __VLS_asFunctionalComponent(__VLS_113, new __VLS_113({
    modelValue: (__VLS_ctx.showModal),
    maxWidth: "600px",
}));
const __VLS_115 = __VLS_114({
    modelValue: (__VLS_ctx.showModal),
    maxWidth: "600px",
}, ...__VLS_functionalComponentArgsRest(__VLS_114));
__VLS_116.slots.default;
const __VLS_117 = {}.VCard;
/** @type {[typeof __VLS_components.VCard, typeof __VLS_components.vCard, typeof __VLS_components.VCard, typeof __VLS_components.vCard, ]} */ ;
// @ts-ignore
const __VLS_118 = __VLS_asFunctionalComponent(__VLS_117, new __VLS_117({}));
const __VLS_119 = __VLS_118({}, ...__VLS_functionalComponentArgsRest(__VLS_118));
__VLS_120.slots.default;
const __VLS_121 = {}.VCardTitle;
/** @type {[typeof __VLS_components.VCardTitle, typeof __VLS_components.vCardTitle, typeof __VLS_components.VCardTitle, typeof __VLS_components.vCardTitle, ]} */ ;
// @ts-ignore
const __VLS_122 = __VLS_asFunctionalComponent(__VLS_121, new __VLS_121({
    align: "center",
    ...{ class: "text-h4 font-weight-bold text-green" },
}));
const __VLS_123 = __VLS_122({
    align: "center",
    ...{ class: "text-h4 font-weight-bold text-green" },
}, ...__VLS_functionalComponentArgsRest(__VLS_122));
__VLS_124.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "text-h5" },
});
(__VLS_ctx.isEditing ? 'Edit Business' : 'Add Business');
var __VLS_124;
const __VLS_125 = {}.VCardText;
/** @type {[typeof __VLS_components.VCardText, typeof __VLS_components.vCardText, typeof __VLS_components.VCardText, typeof __VLS_components.vCardText, ]} */ ;
// @ts-ignore
const __VLS_126 = __VLS_asFunctionalComponent(__VLS_125, new __VLS_125({}));
const __VLS_127 = __VLS_126({}, ...__VLS_functionalComponentArgsRest(__VLS_126));
__VLS_128.slots.default;
const __VLS_129 = {}.VForm;
/** @type {[typeof __VLS_components.VForm, typeof __VLS_components.vForm, typeof __VLS_components.VForm, typeof __VLS_components.vForm, ]} */ ;
// @ts-ignore
const __VLS_130 = __VLS_asFunctionalComponent(__VLS_129, new __VLS_129({
    ref: "businessForm",
    modelValue: (__VLS_ctx.isFormValid),
}));
const __VLS_131 = __VLS_130({
    ref: "businessForm",
    modelValue: (__VLS_ctx.isFormValid),
}, ...__VLS_functionalComponentArgsRest(__VLS_130));
/** @type {typeof __VLS_ctx.businessForm} */ ;
var __VLS_133 = {};
__VLS_132.slots.default;
const __VLS_135 = {}.VContainer;
/** @type {[typeof __VLS_components.VContainer, typeof __VLS_components.vContainer, typeof __VLS_components.VContainer, typeof __VLS_components.vContainer, ]} */ ;
// @ts-ignore
const __VLS_136 = __VLS_asFunctionalComponent(__VLS_135, new __VLS_135({}));
const __VLS_137 = __VLS_136({}, ...__VLS_functionalComponentArgsRest(__VLS_136));
__VLS_138.slots.default;
const __VLS_139 = {}.VRow;
/** @type {[typeof __VLS_components.VRow, typeof __VLS_components.vRow, typeof __VLS_components.VRow, typeof __VLS_components.vRow, ]} */ ;
// @ts-ignore
const __VLS_140 = __VLS_asFunctionalComponent(__VLS_139, new __VLS_139({}));
const __VLS_141 = __VLS_140({}, ...__VLS_functionalComponentArgsRest(__VLS_140));
__VLS_142.slots.default;
const __VLS_143 = {}.VCol;
/** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
// @ts-ignore
const __VLS_144 = __VLS_asFunctionalComponent(__VLS_143, new __VLS_143({
    cols: "12",
}));
const __VLS_145 = __VLS_144({
    cols: "12",
}, ...__VLS_functionalComponentArgsRest(__VLS_144));
__VLS_146.slots.default;
const __VLS_147 = {}.VTextField;
/** @type {[typeof __VLS_components.VTextField, typeof __VLS_components.vTextField, typeof __VLS_components.VTextField, typeof __VLS_components.vTextField, ]} */ ;
// @ts-ignore
const __VLS_148 = __VLS_asFunctionalComponent(__VLS_147, new __VLS_147({
    modelValue: (__VLS_ctx.currentBusiness.b_name),
    label: "Name",
    rules: ([__VLS_ctx.rules.required]),
}));
const __VLS_149 = __VLS_148({
    modelValue: (__VLS_ctx.currentBusiness.b_name),
    label: "Name",
    rules: ([__VLS_ctx.rules.required]),
}, ...__VLS_functionalComponentArgsRest(__VLS_148));
var __VLS_146;
const __VLS_151 = {}.VCol;
/** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
// @ts-ignore
const __VLS_152 = __VLS_asFunctionalComponent(__VLS_151, new __VLS_151({
    cols: "12",
}));
const __VLS_153 = __VLS_152({
    cols: "12",
}, ...__VLS_functionalComponentArgsRest(__VLS_152));
__VLS_154.slots.default;
const __VLS_155 = {}.VTextField;
/** @type {[typeof __VLS_components.VTextField, typeof __VLS_components.vTextField, typeof __VLS_components.VTextField, typeof __VLS_components.vTextField, ]} */ ;
// @ts-ignore
const __VLS_156 = __VLS_asFunctionalComponent(__VLS_155, new __VLS_155({
    modelValue: (__VLS_ctx.currentBusiness.b_address),
    label: "Address",
    rules: ([__VLS_ctx.rules.required]),
}));
const __VLS_157 = __VLS_156({
    modelValue: (__VLS_ctx.currentBusiness.b_address),
    label: "Address",
    rules: ([__VLS_ctx.rules.required]),
}, ...__VLS_functionalComponentArgsRest(__VLS_156));
var __VLS_154;
const __VLS_159 = {}.VCol;
/** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
// @ts-ignore
const __VLS_160 = __VLS_asFunctionalComponent(__VLS_159, new __VLS_159({
    cols: "12",
    sm: "6",
}));
const __VLS_161 = __VLS_160({
    cols: "12",
    sm: "6",
}, ...__VLS_functionalComponentArgsRest(__VLS_160));
__VLS_162.slots.default;
const __VLS_163 = {}.VTextField;
/** @type {[typeof __VLS_components.VTextField, typeof __VLS_components.vTextField, typeof __VLS_components.VTextField, typeof __VLS_components.vTextField, ]} */ ;
// @ts-ignore
const __VLS_164 = __VLS_asFunctionalComponent(__VLS_163, new __VLS_163({
    modelValue: (__VLS_ctx.currentBusiness.b_city),
    label: "City",
    rules: ([__VLS_ctx.rules.required]),
}));
const __VLS_165 = __VLS_164({
    modelValue: (__VLS_ctx.currentBusiness.b_city),
    label: "City",
    rules: ([__VLS_ctx.rules.required]),
}, ...__VLS_functionalComponentArgsRest(__VLS_164));
var __VLS_162;
const __VLS_167 = {}.VCol;
/** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
// @ts-ignore
const __VLS_168 = __VLS_asFunctionalComponent(__VLS_167, new __VLS_167({
    cols: "12",
    sm: "6",
}));
const __VLS_169 = __VLS_168({
    cols: "12",
    sm: "6",
}, ...__VLS_functionalComponentArgsRest(__VLS_168));
__VLS_170.slots.default;
const __VLS_171 = {}.VTextField;
/** @type {[typeof __VLS_components.VTextField, typeof __VLS_components.vTextField, typeof __VLS_components.VTextField, typeof __VLS_components.vTextField, ]} */ ;
// @ts-ignore
const __VLS_172 = __VLS_asFunctionalComponent(__VLS_171, new __VLS_171({
    ...{ 'onInput': {} },
    modelValue: (__VLS_ctx.currentBusiness.b_phone),
    label: "Phone Number",
    rules: ([__VLS_ctx.rules.phone]),
    placeholder: "e.g., 613-555-1234",
}));
const __VLS_173 = __VLS_172({
    ...{ 'onInput': {} },
    modelValue: (__VLS_ctx.currentBusiness.b_phone),
    label: "Phone Number",
    rules: ([__VLS_ctx.rules.phone]),
    placeholder: "e.g., 613-555-1234",
}, ...__VLS_functionalComponentArgsRest(__VLS_172));
let __VLS_175;
let __VLS_176;
let __VLS_177;
const __VLS_178 = {
    onInput: (__VLS_ctx.formatPhoneNumber)
};
var __VLS_174;
var __VLS_170;
const __VLS_179 = {}.VCol;
/** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
// @ts-ignore
const __VLS_180 = __VLS_asFunctionalComponent(__VLS_179, new __VLS_179({
    cols: "12",
    sm: "6",
}));
const __VLS_181 = __VLS_180({
    cols: "12",
    sm: "6",
}, ...__VLS_functionalComponentArgsRest(__VLS_180));
__VLS_182.slots.default;
const __VLS_183 = {}.VSelect;
/** @type {[typeof __VLS_components.VSelect, typeof __VLS_components.vSelect, typeof __VLS_components.VSelect, typeof __VLS_components.vSelect, ]} */ ;
// @ts-ignore
const __VLS_184 = __VLS_asFunctionalComponent(__VLS_183, new __VLS_183({
    modelValue: (__VLS_ctx.currentBusiness.b_type),
    items: (['Restaurant', 'Butcher']),
    label: "Type",
    rules: ([__VLS_ctx.rules.required]),
}));
const __VLS_185 = __VLS_184({
    modelValue: (__VLS_ctx.currentBusiness.b_type),
    items: (['Restaurant', 'Butcher']),
    label: "Type",
    rules: ([__VLS_ctx.rules.required]),
}, ...__VLS_functionalComponentArgsRest(__VLS_184));
var __VLS_182;
const __VLS_187 = {}.VCol;
/** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
// @ts-ignore
const __VLS_188 = __VLS_asFunctionalComponent(__VLS_187, new __VLS_187({
    cols: "12",
    sm: "6",
}));
const __VLS_189 = __VLS_188({
    cols: "12",
    sm: "6",
}, ...__VLS_functionalComponentArgsRest(__VLS_188));
__VLS_190.slots.default;
const __VLS_191 = {}.VSelect;
/** @type {[typeof __VLS_components.VSelect, typeof __VLS_components.vSelect, typeof __VLS_components.VSelect, typeof __VLS_components.vSelect, ]} */ ;
// @ts-ignore
const __VLS_192 = __VLS_asFunctionalComponent(__VLS_191, new __VLS_191({
    modelValue: (__VLS_ctx.currentBusiness.b_status),
    items: (['Verified', 'Pending', 'Unverified']),
    label: "Status",
    rules: ([__VLS_ctx.rules.required]),
}));
const __VLS_193 = __VLS_192({
    modelValue: (__VLS_ctx.currentBusiness.b_status),
    items: (['Verified', 'Pending', 'Unverified']),
    label: "Status",
    rules: ([__VLS_ctx.rules.required]),
}, ...__VLS_functionalComponentArgsRest(__VLS_192));
var __VLS_190;
const __VLS_195 = {}.VCol;
/** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
// @ts-ignore
const __VLS_196 = __VLS_asFunctionalComponent(__VLS_195, new __VLS_195({
    cols: "12",
    sm: "6",
}));
const __VLS_197 = __VLS_196({
    cols: "12",
    sm: "6",
}, ...__VLS_functionalComponentArgsRest(__VLS_196));
__VLS_198.slots.default;
const __VLS_199 = {}.VTextField;
/** @type {[typeof __VLS_components.VTextField, typeof __VLS_components.vTextField, typeof __VLS_components.VTextField, typeof __VLS_components.vTextField, ]} */ ;
// @ts-ignore
const __VLS_200 = __VLS_asFunctionalComponent(__VLS_199, new __VLS_199({
    modelValue: (__VLS_ctx.currentBusiness.b_date_last_check),
    label: "Last Check Date",
    type: "date",
}));
const __VLS_201 = __VLS_200({
    modelValue: (__VLS_ctx.currentBusiness.b_date_last_check),
    label: "Last Check Date",
    type: "date",
}, ...__VLS_functionalComponentArgsRest(__VLS_200));
var __VLS_198;
const __VLS_203 = {}.VCol;
/** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
// @ts-ignore
const __VLS_204 = __VLS_asFunctionalComponent(__VLS_203, new __VLS_203({
    cols: "12",
}));
const __VLS_205 = __VLS_204({
    cols: "12",
}, ...__VLS_functionalComponentArgsRest(__VLS_204));
__VLS_206.slots.default;
const __VLS_207 = {}.VTextField;
/** @type {[typeof __VLS_components.VTextField, typeof __VLS_components.vTextField, typeof __VLS_components.VTextField, typeof __VLS_components.vTextField, ]} */ ;
// @ts-ignore
const __VLS_208 = __VLS_asFunctionalComponent(__VLS_207, new __VLS_207({
    modelValue: (__VLS_ctx.currentBusiness.b_address_link),
    label: "Google Maps Link",
    rules: ([__VLS_ctx.rules.url]),
}));
const __VLS_209 = __VLS_208({
    modelValue: (__VLS_ctx.currentBusiness.b_address_link),
    label: "Google Maps Link",
    rules: ([__VLS_ctx.rules.url]),
}, ...__VLS_functionalComponentArgsRest(__VLS_208));
var __VLS_206;
var __VLS_142;
var __VLS_138;
var __VLS_132;
var __VLS_128;
const __VLS_211 = {}.VCardActions;
/** @type {[typeof __VLS_components.VCardActions, typeof __VLS_components.vCardActions, typeof __VLS_components.VCardActions, typeof __VLS_components.vCardActions, ]} */ ;
// @ts-ignore
const __VLS_212 = __VLS_asFunctionalComponent(__VLS_211, new __VLS_211({}));
const __VLS_213 = __VLS_212({}, ...__VLS_functionalComponentArgsRest(__VLS_212));
__VLS_214.slots.default;
const __VLS_215 = {}.VSpacer;
/** @type {[typeof __VLS_components.VSpacer, typeof __VLS_components.vSpacer, typeof __VLS_components.VSpacer, typeof __VLS_components.vSpacer, ]} */ ;
// @ts-ignore
const __VLS_216 = __VLS_asFunctionalComponent(__VLS_215, new __VLS_215({}));
const __VLS_217 = __VLS_216({}, ...__VLS_functionalComponentArgsRest(__VLS_216));
const __VLS_219 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_220 = __VLS_asFunctionalComponent(__VLS_219, new __VLS_219({
    ...{ 'onClick': {} },
    color: "red-darken-1",
    variant: "text",
}));
const __VLS_221 = __VLS_220({
    ...{ 'onClick': {} },
    color: "red-darken-1",
    variant: "text",
}, ...__VLS_functionalComponentArgsRest(__VLS_220));
let __VLS_223;
let __VLS_224;
let __VLS_225;
const __VLS_226 = {
    onClick: (__VLS_ctx.closeModal)
};
__VLS_222.slots.default;
var __VLS_222;
const __VLS_227 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_228 = __VLS_asFunctionalComponent(__VLS_227, new __VLS_227({
    ...{ 'onClick': {} },
    color: "green-darken-1",
    variant: "text",
    disabled: (!__VLS_ctx.isFormValid),
}));
const __VLS_229 = __VLS_228({
    ...{ 'onClick': {} },
    color: "green-darken-1",
    variant: "text",
    disabled: (!__VLS_ctx.isFormValid),
}, ...__VLS_functionalComponentArgsRest(__VLS_228));
let __VLS_231;
let __VLS_232;
let __VLS_233;
const __VLS_234 = {
    onClick: (__VLS_ctx.saveBusiness)
};
__VLS_230.slots.default;
var __VLS_230;
var __VLS_214;
var __VLS_120;
var __VLS_116;
const __VLS_235 = {}.VDialog;
/** @type {[typeof __VLS_components.VDialog, typeof __VLS_components.vDialog, typeof __VLS_components.VDialog, typeof __VLS_components.vDialog, ]} */ ;
// @ts-ignore
const __VLS_236 = __VLS_asFunctionalComponent(__VLS_235, new __VLS_235({
    modelValue: (__VLS_ctx.showDeleteConfirm),
    maxWidth: "500px",
}));
const __VLS_237 = __VLS_236({
    modelValue: (__VLS_ctx.showDeleteConfirm),
    maxWidth: "500px",
}, ...__VLS_functionalComponentArgsRest(__VLS_236));
__VLS_238.slots.default;
const __VLS_239 = {}.VCard;
/** @type {[typeof __VLS_components.VCard, typeof __VLS_components.vCard, typeof __VLS_components.VCard, typeof __VLS_components.vCard, ]} */ ;
// @ts-ignore
const __VLS_240 = __VLS_asFunctionalComponent(__VLS_239, new __VLS_239({}));
const __VLS_241 = __VLS_240({}, ...__VLS_functionalComponentArgsRest(__VLS_240));
__VLS_242.slots.default;
const __VLS_243 = {}.VCardTitle;
/** @type {[typeof __VLS_components.VCardTitle, typeof __VLS_components.vCardTitle, typeof __VLS_components.VCardTitle, typeof __VLS_components.vCardTitle, ]} */ ;
// @ts-ignore
const __VLS_244 = __VLS_asFunctionalComponent(__VLS_243, new __VLS_243({
    ...{ class: "text-h5 font-weight-bold text-error text-center" },
}));
const __VLS_245 = __VLS_244({
    ...{ class: "text-h5 font-weight-bold text-error text-center" },
}, ...__VLS_functionalComponentArgsRest(__VLS_244));
__VLS_246.slots.default;
var __VLS_246;
const __VLS_247 = {}.VCardText;
/** @type {[typeof __VLS_components.VCardText, typeof __VLS_components.vCardText, typeof __VLS_components.VCardText, typeof __VLS_components.vCardText, ]} */ ;
// @ts-ignore
const __VLS_248 = __VLS_asFunctionalComponent(__VLS_247, new __VLS_247({}));
const __VLS_249 = __VLS_248({}, ...__VLS_functionalComponentArgsRest(__VLS_248));
__VLS_250.slots.default;
(__VLS_ctx.businessToDelete?.b_name);
var __VLS_250;
const __VLS_251 = {}.VCardActions;
/** @type {[typeof __VLS_components.VCardActions, typeof __VLS_components.vCardActions, typeof __VLS_components.VCardActions, typeof __VLS_components.vCardActions, ]} */ ;
// @ts-ignore
const __VLS_252 = __VLS_asFunctionalComponent(__VLS_251, new __VLS_251({}));
const __VLS_253 = __VLS_252({}, ...__VLS_functionalComponentArgsRest(__VLS_252));
__VLS_254.slots.default;
const __VLS_255 = {}.VSpacer;
/** @type {[typeof __VLS_components.VSpacer, typeof __VLS_components.vSpacer, typeof __VLS_components.VSpacer, typeof __VLS_components.vSpacer, ]} */ ;
// @ts-ignore
const __VLS_256 = __VLS_asFunctionalComponent(__VLS_255, new __VLS_255({}));
const __VLS_257 = __VLS_256({}, ...__VLS_functionalComponentArgsRest(__VLS_256));
const __VLS_259 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_260 = __VLS_asFunctionalComponent(__VLS_259, new __VLS_259({
    ...{ 'onClick': {} },
    color: "blue-darken-1",
    variant: "text",
}));
const __VLS_261 = __VLS_260({
    ...{ 'onClick': {} },
    color: "blue-darken-1",
    variant: "text",
}, ...__VLS_functionalComponentArgsRest(__VLS_260));
let __VLS_263;
let __VLS_264;
let __VLS_265;
const __VLS_266 = {
    onClick: (...[$event]) => {
        __VLS_ctx.showDeleteConfirm = false;
    }
};
__VLS_262.slots.default;
var __VLS_262;
const __VLS_267 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_268 = __VLS_asFunctionalComponent(__VLS_267, new __VLS_267({
    ...{ 'onClick': {} },
    color: "red-darken-1",
    variant: "text",
}));
const __VLS_269 = __VLS_268({
    ...{ 'onClick': {} },
    color: "red-darken-1",
    variant: "text",
}, ...__VLS_functionalComponentArgsRest(__VLS_268));
let __VLS_271;
let __VLS_272;
let __VLS_273;
const __VLS_274 = {
    onClick: (__VLS_ctx.deleteBusinessConfirmed)
};
__VLS_270.slots.default;
var __VLS_270;
const __VLS_275 = {}.VSpacer;
/** @type {[typeof __VLS_components.VSpacer, typeof __VLS_components.vSpacer, typeof __VLS_components.VSpacer, typeof __VLS_components.vSpacer, ]} */ ;
// @ts-ignore
const __VLS_276 = __VLS_asFunctionalComponent(__VLS_275, new __VLS_275({}));
const __VLS_277 = __VLS_276({}, ...__VLS_functionalComponentArgsRest(__VLS_276));
var __VLS_254;
var __VLS_242;
var __VLS_238;
const __VLS_279 = {}.VDialog;
/** @type {[typeof __VLS_components.VDialog, typeof __VLS_components.vDialog, typeof __VLS_components.VDialog, typeof __VLS_components.vDialog, ]} */ ;
// @ts-ignore
const __VLS_280 = __VLS_asFunctionalComponent(__VLS_279, new __VLS_279({
    modelValue: (__VLS_ctx.showInactivityDialog),
    maxWidth: "500px",
    persistent: true,
}));
const __VLS_281 = __VLS_280({
    modelValue: (__VLS_ctx.showInactivityDialog),
    maxWidth: "500px",
    persistent: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_280));
__VLS_282.slots.default;
const __VLS_283 = {}.VCard;
/** @type {[typeof __VLS_components.VCard, typeof __VLS_components.vCard, typeof __VLS_components.VCard, typeof __VLS_components.vCard, ]} */ ;
// @ts-ignore
const __VLS_284 = __VLS_asFunctionalComponent(__VLS_283, new __VLS_283({}));
const __VLS_285 = __VLS_284({}, ...__VLS_functionalComponentArgsRest(__VLS_284));
__VLS_286.slots.default;
const __VLS_287 = {}.VCardTitle;
/** @type {[typeof __VLS_components.VCardTitle, typeof __VLS_components.vCardTitle, typeof __VLS_components.VCardTitle, typeof __VLS_components.vCardTitle, ]} */ ;
// @ts-ignore
const __VLS_288 = __VLS_asFunctionalComponent(__VLS_287, new __VLS_287({
    ...{ class: "text-h5 text-warning" },
}));
const __VLS_289 = __VLS_288({
    ...{ class: "text-h5 text-warning" },
}, ...__VLS_functionalComponentArgsRest(__VLS_288));
__VLS_290.slots.default;
var __VLS_290;
const __VLS_291 = {}.VCardText;
/** @type {[typeof __VLS_components.VCardText, typeof __VLS_components.vCardText, typeof __VLS_components.VCardText, typeof __VLS_components.vCardText, ]} */ ;
// @ts-ignore
const __VLS_292 = __VLS_asFunctionalComponent(__VLS_291, new __VLS_291({}));
const __VLS_293 = __VLS_292({}, ...__VLS_functionalComponentArgsRest(__VLS_292));
__VLS_294.slots.default;
var __VLS_294;
const __VLS_295 = {}.VCardActions;
/** @type {[typeof __VLS_components.VCardActions, typeof __VLS_components.vCardActions, typeof __VLS_components.VCardActions, typeof __VLS_components.vCardActions, ]} */ ;
// @ts-ignore
const __VLS_296 = __VLS_asFunctionalComponent(__VLS_295, new __VLS_295({}));
const __VLS_297 = __VLS_296({}, ...__VLS_functionalComponentArgsRest(__VLS_296));
__VLS_298.slots.default;
const __VLS_299 = {}.VSpacer;
/** @type {[typeof __VLS_components.VSpacer, typeof __VLS_components.vSpacer, typeof __VLS_components.VSpacer, typeof __VLS_components.vSpacer, ]} */ ;
// @ts-ignore
const __VLS_300 = __VLS_asFunctionalComponent(__VLS_299, new __VLS_299({}));
const __VLS_301 = __VLS_300({}, ...__VLS_functionalComponentArgsRest(__VLS_300));
const __VLS_303 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_304 = __VLS_asFunctionalComponent(__VLS_303, new __VLS_303({
    ...{ 'onClick': {} },
    color: "warning",
    variant: "elevated",
}));
const __VLS_305 = __VLS_304({
    ...{ 'onClick': {} },
    color: "warning",
    variant: "elevated",
}, ...__VLS_functionalComponentArgsRest(__VLS_304));
let __VLS_307;
let __VLS_308;
let __VLS_309;
const __VLS_310 = {
    onClick: (__VLS_ctx.handleInactivityLogout)
};
__VLS_306.slots.default;
var __VLS_306;
const __VLS_311 = {}.VSpacer;
/** @type {[typeof __VLS_components.VSpacer, typeof __VLS_components.vSpacer, typeof __VLS_components.VSpacer, typeof __VLS_components.vSpacer, ]} */ ;
// @ts-ignore
const __VLS_312 = __VLS_asFunctionalComponent(__VLS_311, new __VLS_311({}));
const __VLS_313 = __VLS_312({}, ...__VLS_functionalComponentArgsRest(__VLS_312));
var __VLS_298;
var __VLS_286;
var __VLS_282;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['dashboard-container']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-10']} */ ;
/** @type {__VLS_StyleScopedClasses['pa-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-h4']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-green']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-h5']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-green']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['pb-0']} */ ;
/** @type {__VLS_StyleScopedClasses['pa-4']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-0']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['elevation-1']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-h4']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-green']} */ ;
/** @type {__VLS_StyleScopedClasses['text-h5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-h5']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-error']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-h5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-warning']} */ ;
// @ts-ignore
var __VLS_134 = __VLS_133;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            logout: logout,
            businesses: businesses,
            loading: loading,
            error: error,
            search: search,
            headers: headers,
            showModal: showModal,
            isEditing: isEditing,
            currentBusiness: currentBusiness,
            businessForm: businessForm,
            isFormValid: isFormValid,
            showDeleteConfirm: showDeleteConfirm,
            businessToDelete: businessToDelete,
            showInactivityDialog: showInactivityDialog,
            rules: rules,
            formatPhoneNumber: formatPhoneNumber,
            openAddModal: openAddModal,
            openEditModal: openEditModal,
            closeModal: closeModal,
            saveBusiness: saveBusiness,
            confirmDelete: confirmDelete,
            deleteBusinessConfirmed: deleteBusinessConfirmed,
            handleInactivityLogout: handleInactivityLogout,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=Dashboard.vue.js.map