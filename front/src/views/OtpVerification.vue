<template>
  <v-container class="otp-input-sec" fluid>
    <v-row align="start" justify="center" class="pt-12">
      <v-col cols="12" sm="8" md="5">
        <v-card class="pa-4" elevation="10" rounded="xl">
          <v-card-title class="text-h5 font-weight-bold justify-center">
            Enter Verification Code
          </v-card-title>
          <v-card-text class="text-center">
            A 6-digit OTP has been sent to your email address:
            <br />
            <strong>{{ email }}</strong>
          </v-card-text>

          <v-alert
            v-if="errorMessage"
            type="error"
            class="mb-4 mx-4"
            density="compact"
            >{{ errorMessage }}</v-alert
          >

          <v-snackbar
            v-model="snackbar.show"
            :color="snackbar.color"
            :timeout="3000"
            location="top"
          >
            {{ snackbar.text }}
            <template v-slot:actions>
              <v-btn color="white" variant="text" @click="snackbar.show = false">Close</v-btn>
            </template>
          </v-snackbar>

          <v-form @submit.prevent="handleVerification">
            <div class="pa-4">
              <v-otp-input
                v-model="otp"
                :length="6"
                variant="underlined"
              ></v-otp-input>
            </div>

            <div class="text-center mt-2">
              <v-btn
                type="submit"
                color="green"
                :disabled="otp.length < 6 || loading"
                :loading="loading"
              >
                Verify
              </v-btn>
            </div>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { isAxiosError } from 'axios';
import apiClient from '@/plugins/axios';

const route = useRoute()
const router = useRouter()

const otp = ref('')
const email = computed(() => (route.query.email as string) || 'your email')
const loading = ref(false);
const errorMessage = ref('');
const snackbar = ref({
  show: false,
  text: '',
  color: 'success',
});

async function handleVerification() {
  if (otp.value.length < 6) return

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
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      errorMessage.value = error.response.data.message || 'An unknown error occurred.';
    } else {
      console.error('Verification failed:', error);
      errorMessage.value = 'An unexpected error occurred. Please try again.';
    }
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.otp-input-sec {
  min-height: 70rem;
  min-width: 70rem;
}
</style>