import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { isAxiosError } from 'axios';
import apiClient from '@/plugins/axios';
const router = useRouter();
const email = ref('');
const password = ref('');
const showPassword = ref(false);
const valid = ref(false);
const loginForm = ref();
const loading = ref(false);
const errorMessage = ref('');
const emailRules = [
    (v) => !!v || 'Email is required',
    (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
];
const passwordRules = [
    (v) => !!v || 'Password is required',
    (v) => v.length >= 6 || 'Password must be at least 6 characters',
];
async function handleLogin() {
    errorMessage.value = '';
    const { valid } = await loginForm.value?.validate();
    if (!valid)
        return;
    loading.value = true;
    try {
        // Send a request to the server API using our configured axios client
        await apiClient.post('/api/login', {
            email: email.value,
            password: password.value,
        });
        // With axios, a 2xx status code resolves the promise
        console.log(`User ${email.value} authenticated. Simulating OTP send.`);
        // Redirect to OTP page using the path. This can be more reliable than using the name.
        await router.push({ path: '/verify-otp', query: { email: email.value } });
    }
    catch (error) {
        if (isAxiosError(error) && error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            errorMessage.value = error.response.data.message || 'Invalid email or password.';
        }
        else {
            // This block catches other errors, including the navigation error you're seeing.
            console.error('An unexpected error occurred after login:', error);
            errorMessage.value = 'Login succeeded, but the next page could not be loaded. Please try again.';
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
    ...{ class: "login-sec" },
    fluid: true,
}));
const __VLS_2 = __VLS_1({
    ...{ class: "login-sec" },
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
    sm: "10",
    md: "7",
}));
const __VLS_11 = __VLS_10({
    cols: "12",
    sm: "10",
    md: "7",
}, ...__VLS_functionalComponentArgsRest(__VLS_10));
__VLS_12.slots.default;
const __VLS_13 = {}.VCardText;
/** @type {[typeof __VLS_components.VCardText, typeof __VLS_components.vCardText, typeof __VLS_components.VCardText, typeof __VLS_components.vCardText, ]} */ ;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({
    ...{ class: "text-center" },
}));
const __VLS_15 = __VLS_14({
    ...{ class: "text-center" },
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
__VLS_16.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
    ...{ class: "text-h3 font-weight-bold text-green-darken-4" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "text-subtitle-1 text-green-darken-4" },
});
var __VLS_16;
const __VLS_17 = {}.VCard;
/** @type {[typeof __VLS_components.VCard, typeof __VLS_components.vCard, typeof __VLS_components.VCard, typeof __VLS_components.vCard, ]} */ ;
// @ts-ignore
const __VLS_18 = __VLS_asFunctionalComponent(__VLS_17, new __VLS_17({
    ...{ class: "pa-4" },
    elevation: "10",
    rounded: "xl",
}));
const __VLS_19 = __VLS_18({
    ...{ class: "pa-4" },
    elevation: "10",
    rounded: "xl",
}, ...__VLS_functionalComponentArgsRest(__VLS_18));
__VLS_20.slots.default;
const __VLS_21 = {}.VCardTitle;
/** @type {[typeof __VLS_components.VCardTitle, typeof __VLS_components.vCardTitle, typeof __VLS_components.VCardTitle, typeof __VLS_components.vCardTitle, ]} */ ;
// @ts-ignore
const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({
    ...{ class: "text-h5 font-weight-bold justify-center" },
}));
const __VLS_23 = __VLS_22({
    ...{ class: "text-h5 font-weight-bold justify-center" },
}, ...__VLS_functionalComponentArgsRest(__VLS_22));
__VLS_24.slots.default;
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
const __VLS_29 = {}.VForm;
/** @type {[typeof __VLS_components.VForm, typeof __VLS_components.vForm, typeof __VLS_components.VForm, typeof __VLS_components.vForm, ]} */ ;
// @ts-ignore
const __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29({
    ...{ 'onSubmit': {} },
    ref: "loginForm",
    modelValue: (__VLS_ctx.valid),
}));
const __VLS_31 = __VLS_30({
    ...{ 'onSubmit': {} },
    ref: "loginForm",
    modelValue: (__VLS_ctx.valid),
}, ...__VLS_functionalComponentArgsRest(__VLS_30));
let __VLS_33;
let __VLS_34;
let __VLS_35;
const __VLS_36 = {
    onSubmit: (__VLS_ctx.handleLogin)
};
/** @type {typeof __VLS_ctx.loginForm} */ ;
var __VLS_37 = {};
__VLS_32.slots.default;
const __VLS_39 = {}.VTextField;
/** @type {[typeof __VLS_components.VTextField, typeof __VLS_components.vTextField, ]} */ ;
// @ts-ignore
const __VLS_40 = __VLS_asFunctionalComponent(__VLS_39, new __VLS_39({
    modelValue: (__VLS_ctx.email),
    label: "Email",
    rules: (__VLS_ctx.emailRules),
    prependInnerIcon: "mdi-email",
    type: "email",
    required: true,
}));
const __VLS_41 = __VLS_40({
    modelValue: (__VLS_ctx.email),
    label: "Email",
    rules: (__VLS_ctx.emailRules),
    prependInnerIcon: "mdi-email",
    type: "email",
    required: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_40));
const __VLS_43 = {}.VTextField;
/** @type {[typeof __VLS_components.VTextField, typeof __VLS_components.vTextField, ]} */ ;
// @ts-ignore
const __VLS_44 = __VLS_asFunctionalComponent(__VLS_43, new __VLS_43({
    ...{ 'onClick:appendInner': {} },
    modelValue: (__VLS_ctx.password),
    label: "Password",
    rules: (__VLS_ctx.passwordRules),
    prependInnerIcon: "mdi-lock",
    type: (__VLS_ctx.showPassword ? 'text' : 'password'),
    appendInnerIcon: (__VLS_ctx.showPassword ? 'mdi-eye' : 'mdi-eye-off'),
    required: true,
}));
const __VLS_45 = __VLS_44({
    ...{ 'onClick:appendInner': {} },
    modelValue: (__VLS_ctx.password),
    label: "Password",
    rules: (__VLS_ctx.passwordRules),
    prependInnerIcon: "mdi-lock",
    type: (__VLS_ctx.showPassword ? 'text' : 'password'),
    appendInnerIcon: (__VLS_ctx.showPassword ? 'mdi-eye' : 'mdi-eye-off'),
    required: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_44));
let __VLS_47;
let __VLS_48;
let __VLS_49;
const __VLS_50 = {
    'onClick:appendInner': (...[$event]) => {
        __VLS_ctx.showPassword = !__VLS_ctx.showPassword;
    }
};
var __VLS_46;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "text-center mt-4" },
});
const __VLS_51 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_52 = __VLS_asFunctionalComponent(__VLS_51, new __VLS_51({
    type: "submit",
    color: "green",
    disabled: (!__VLS_ctx.valid || __VLS_ctx.loading),
    loading: (__VLS_ctx.loading),
}));
const __VLS_53 = __VLS_52({
    type: "submit",
    color: "green",
    disabled: (!__VLS_ctx.valid || __VLS_ctx.loading),
    loading: (__VLS_ctx.loading),
}, ...__VLS_functionalComponentArgsRest(__VLS_52));
__VLS_54.slots.default;
var __VLS_54;
var __VLS_32;
var __VLS_20;
var __VLS_12;
var __VLS_8;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['login-sec']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-12']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-h3']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-green-darken-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-subtitle-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-green-darken-4']} */ ;
/** @type {__VLS_StyleScopedClasses['pa-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-h5']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
// @ts-ignore
var __VLS_38 = __VLS_37;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            email: email,
            password: password,
            showPassword: showPassword,
            valid: valid,
            loginForm: loginForm,
            loading: loading,
            errorMessage: errorMessage,
            emailRules: emailRules,
            passwordRules: passwordRules,
            handleLogin: handleLogin,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=Login.vue.js.map