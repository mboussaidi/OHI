<template>
    <v-container class="login-sec" fluid>
      <v-row align="start" justify="center" class="pt-12">
        <v-col cols="12" sm="10" md="7">
            <v-card-text class="text-center">
                <h1 class="text-h3 font-weight-bold text-green-darken-4">Limited access</h1>
                <p class="text-subtitle-1 text-green-darken-4">Please note that this content is limited to authorized users only.</p>
            </v-card-text>
          <v-card class="pa-4" elevation="10" rounded="xl">
            <v-card-title class="text-h5 font-weight-bold justify-center">
              Login
            </v-card-title>
  
            <v-alert
              v-if="errorMessage"
              type="error"
              class="mb-4 mx-4"
              density="compact"
              >{{ errorMessage }}</v-alert
            >

            <v-form @submit.prevent="handleLogin" ref="loginForm" v-model="valid">
              <v-text-field
                v-model="email"
                label="Email"
                :rules="emailRules"
                prepend-inner-icon="mdi-email"
                type="email"
                required
              />
              <v-text-field
                v-model="password"
                label="Password"
                :rules="passwordRules"
                prepend-inner-icon="mdi-lock"
                :type="showPassword ? 'text' : 'password'"
                :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append-inner="showPassword = !showPassword"
                required
              />
              <div class="text-center mt-4">
                <v-btn
                  type="submit"
                  color="green"
                  :disabled="!valid || loading"
                  :loading="loading"
                >
                  Login
                </v-btn>
              </div>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { isAxiosError } from 'axios';
  import apiClient from '@/plugins/axios';
  
  const router = useRouter();
  const email = ref('')
  const password = ref('')
  const showPassword = ref(false)
  const valid = ref(false)
  const loginForm = ref()
  const loading = ref(false);
  const errorMessage = ref('');
  
  const emailRules = [
    (v: string) => !!v || 'Email is required',
    (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
  ]
  
  const passwordRules = [
    (v: string) => !!v || 'Password is required',
    (v: string) => v.length >= 6 || 'Password must be at least 6 characters',
  ]
  
  async function handleLogin() {
    errorMessage.value = '';
    const { valid } = await loginForm.value?.validate();
    if (!valid) return;
  
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
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        errorMessage.value = error.response.data.message || 'Invalid email or password.';
      } else {
        // This block catches other errors, including the navigation error you're seeing.
        console.error('An unexpected error occurred after login:', error);
        errorMessage.value = 'Login succeeded, but the next page could not be loaded. Please try again.';
      }
    } finally {
      loading.value = false;
    }
  }
  </script>
  
  <style scoped>
  .login-sec {
    min-height: 100vh;
    min-width: 100vh;
  }
  </style>
  