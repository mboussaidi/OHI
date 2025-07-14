import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { isAxiosError } from 'axios';
import apiClient from '@/plugins/axios';
const route = useRoute();
const router = useRouter();
const otp = ref('');
const email = computed(() => route.query.email || 'your email');
const loading = ref(false);
const errorMessage = ref('');
const snackbar = ref({
    show: false,
    text: '',
    color: 'success',
});
async function handleVerification() {
    if (otp.value.length < 6)
        return;
    loading.value = true;
    errorMessage.value = '';
    try {
        const response = await apiClient.post('/api/verify-otp', {
            email: email.value,
            otp: otp.value,
        });
        // Store the authentication token from the server response
        localStorage.setItem('authToken', response.data.token);
        snackbar.value = {
            show: true,
            text: 'Verification successful! You are now logged in.',
            color: 'success',
        };
        // On success, redirect to the dashboard after a short delay
        setTimeout(() => router.push({ name: 'Dashboard' }), 2000);
    }
    catch (error) {
        if (isAxiosError(error) && error.response) {
            errorMessage.value = error.response.data.message || 'An unknown error occurred.';
        }
        else {
            console.error('Verification failed:', error);
            errorMessage.value = 'An unexpected error occurred. Please try again.';
        }
    }
    finally {
        loading.value = false;
    }
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
const __VLS_0 = {}.VContainer;
/** @type {[typeof __VLS_components.VContainer, typeof __VLS_components.vContainer, typeof __VLS_components.VContainer, typeof __VLS_components.vContainer, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ class: "otp-input-sec" },
    fluid: true,
}));
const __VLS_2 = __VLS_1({
    ...{ class: "otp-input-sec" },
    fluid: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
__VLS_3.slots.default;
const __VLS_5 = {}.VRow;
/** @type {[typeof __VLS_components.VRow, typeof __VLS_components.vRow, typeof __VLS_components.VRow, typeof __VLS_components.vRow, ]} */ ;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
    align: "start",
    justify: "center",
    ...{ class: "pt-12" },
}));
const __VLS_7 = __VLS_6({
    align: "start",
    justify: "center",
    ...{ class: "pt-12" },
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
__VLS_8.slots.default;
const __VLS_9 = {}.VCol;
/** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
// @ts-ignore
const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({
    cols: "12",
    sm: "8",
    md: "5",
}));
const __VLS_11 = __VLS_10({
    cols: "12",
    sm: "8",
    md: "5",
}, ...__VLS_functionalComponentArgsRest(__VLS_10));
__VLS_12.slots.default;
const __VLS_13 = {}.VCard;
/** @type {[typeof __VLS_components.VCard, typeof __VLS_components.vCard, typeof __VLS_components.VCard, typeof __VLS_components.vCard, ]} */ ;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({
    ...{ class: "pa-4" },
    elevation: "10",
    rounded: "xl",
}));
const __VLS_15 = __VLS_14({
    ...{ class: "pa-4" },
    elevation: "10",
    rounded: "xl",
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
__VLS_16.slots.default;
const __VLS_17 = {}.VCardTitle;
/** @type {[typeof __VLS_components.VCardTitle, typeof __VLS_components.vCardTitle, typeof __VLS_components.VCardTitle, typeof __VLS_components.vCardTitle, ]} */ ;
// @ts-ignore
const __VLS_18 = __VLS_asFunctionalComponent(__VLS_17, new __VLS_17({
    ...{ class: "text-h5 font-weight-bold justify-center" },
}));
const __VLS_19 = __VLS_18({
    ...{ class: "text-h5 font-weight-bold justify-center" },
}, ...__VLS_functionalComponentArgsRest(__VLS_18));
__VLS_20.slots.default;
var __VLS_20;
const __VLS_21 = {}.VCardText;
/** @type {[typeof __VLS_components.VCardText, typeof __VLS_components.vCardText, typeof __VLS_components.VCardText, typeof __VLS_components.vCardText, ]} */ ;
// @ts-ignore
const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({
    ...{ class: "text-center" },
}));
const __VLS_23 = __VLS_22({
    ...{ class: "text-center" },
}, ...__VLS_functionalComponentArgsRest(__VLS_22));
__VLS_24.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.br)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
(__VLS_ctx.email);
var __VLS_24;
if (__VLS_ctx.errorMessage) {
    const __VLS_25 = {}.VAlert;
    /** @type {[typeof __VLS_components.VAlert, typeof __VLS_components.vAlert, typeof __VLS_components.VAlert, typeof __VLS_components.vAlert, ]} */ ;
    // @ts-ignore
    const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
        type: "error",
        ...{ class: "mb-4 mx-4" },
        density: "compact",
    }));
    const __VLS_27 = __VLS_26({
        type: "error",
        ...{ class: "mb-4 mx-4" },
        density: "compact",
    }, ...__VLS_functionalComponentArgsRest(__VLS_26));
    __VLS_28.slots.default;
    (__VLS_ctx.errorMessage);
    var __VLS_28;
}
const __VLS_29 = {}.VSnackbar;
/** @type {[typeof __VLS_components.VSnackbar, typeof __VLS_components.vSnackbar, typeof __VLS_components.VSnackbar, typeof __VLS_components.vSnackbar, ]} */ ;
// @ts-ignore
const __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29({
    modelValue: (__VLS_ctx.snackbar.show),
    color: (__VLS_ctx.snackbar.color),
    timeout: (3000),
    location: "top",
}));
const __VLS_31 = __VLS_30({
    modelValue: (__VLS_ctx.snackbar.show),
    color: (__VLS_ctx.snackbar.color),
    timeout: (3000),
    location: "top",
}, ...__VLS_functionalComponentArgsRest(__VLS_30));
__VLS_32.slots.default;
(__VLS_ctx.snackbar.text);
{
    const { actions: __VLS_thisSlot } = __VLS_32.slots;
    const __VLS_33 = {}.VBtn;
    /** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
    // @ts-ignore
    const __VLS_34 = __VLS_asFunctionalComponent(__VLS_33, new __VLS_33({
        ...{ 'onClick': {} },
        color: "white",
        variant: "text",
    }));
    const __VLS_35 = __VLS_34({
        ...{ 'onClick': {} },
        color: "white",
        variant: "text",
    }, ...__VLS_functionalComponentArgsRest(__VLS_34));
    let __VLS_37;
    let __VLS_38;
    let __VLS_39;
    const __VLS_40 = {
        onClick: (...[$event]) => {
            __VLS_ctx.snackbar.show = false;
        }
    };
    __VLS_36.slots.default;
    var __VLS_36;
}
var __VLS_32;
const __VLS_41 = {}.VForm;
/** @type {[typeof __VLS_components.VForm, typeof __VLS_components.vForm, typeof __VLS_components.VForm, typeof __VLS_components.vForm, ]} */ ;
// @ts-ignore
const __VLS_42 = __VLS_asFunctionalComponent(__VLS_41, new __VLS_41({
    ...{ 'onSubmit': {} },
}));
const __VLS_43 = __VLS_42({
    ...{ 'onSubmit': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_42));
let __VLS_45;
let __VLS_46;
let __VLS_47;
const __VLS_48 = {
    onSubmit: (__VLS_ctx.handleVerification)
};
__VLS_44.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "pa-4" },
});
const __VLS_49 = {}.VOtpInput;
/** @type {[typeof __VLS_components.VOtpInput, typeof __VLS_components.vOtpInput, typeof __VLS_components.VOtpInput, typeof __VLS_components.vOtpInput, ]} */ ;
// @ts-ignore
const __VLS_50 = __VLS_asFunctionalComponent(__VLS_49, new __VLS_49({
    modelValue: (__VLS_ctx.otp),
    length: (6),
    variant: "underlined",
}));
const __VLS_51 = __VLS_50({
    modelValue: (__VLS_ctx.otp),
    length: (6),
    variant: "underlined",
}, ...__VLS_functionalComponentArgsRest(__VLS_50));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "text-center mt-2" },
});
const __VLS_53 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_54 = __VLS_asFunctionalComponent(__VLS_53, new __VLS_53({
    type: "submit",
    color: "green",
    disabled: (__VLS_ctx.otp.length < 6 || __VLS_ctx.loading),
    loading: (__VLS_ctx.loading),
}));
const __VLS_55 = __VLS_54({
    type: "submit",
    color: "green",
    disabled: (__VLS_ctx.otp.length < 6 || __VLS_ctx.loading),
    loading: (__VLS_ctx.loading),
}, ...__VLS_functionalComponentArgsRest(__VLS_54));
__VLS_56.slots.default;
var __VLS_56;
var __VLS_44;
var __VLS_16;
var __VLS_12;
var __VLS_8;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['otp-input-sec']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-12']} */ ;
/** @type {__VLS_StyleScopedClasses['pa-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-h5']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-4']} */ ;
/** @type {__VLS_StyleScopedClasses['pa-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            otp: otp,
            email: email,
            loading: loading,
            errorMessage: errorMessage,
            snackbar: snackbar,
            handleVerification: handleVerification,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=OtpVerification.vue.js.map