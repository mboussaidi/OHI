<template>
  <v-container class="dashboard-container">
    <v-row justify="center" class="mt-10">
      <v-col cols="12" md="10" lg="8">
        <v-card color="green-lighten-5" class="pa-6">
          <v-card-title class="text-h4 font-weight-bold text-green">
            Listing Management Dashboard
          </v-card-title>
          <v-card-text>
            <p>Welcome to the business management dashboard.</p>
            <p>When you finish your updates, please dissconnect by using the button "LOGOUT" below.</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" variant="elevated" @click="logout">Logout</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Business Management Table -->
    <v-row justify="center" class="mt-6">
      <v-col cols="12" md="10" lg="8">
        <v-card>
          <v-card-title class="text-h5 font-weight-bold text-green pt-4 px-4 pb-0">
            Businesses List
          </v-card-title>
          <div class="pa-4">
            <v-text-field
                v-model="search"
                append-inner-icon="mdi-magnify"
                label="Start typing to search businesses..."
                single-line
                hide-details
                density="compact"
              ></v-text-field>
          </div>
          <v-card-text class="pt-0">
            <v-alert v-if="error" type="error" density="compact" closable class="mb-4" @click:close="error = null">
              {{ error }}
            </v-alert>
            <v-data-table
              :headers="headers"
              :items="businesses"
              :loading="loading"
              :search="search"
              class="elevation-1"
              item-value="b_id"
              align="center"
            >
              <template v-slot:item.b_address_link="{ item }">
                <a v-if="item.b_address_link" :href="item.b_address_link" target="_blank" rel="noopener noreferrer">
                  <v-icon color="green">mdi-map-marker</v-icon>
                </a>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-icon class="mr-2" @click="openEditModal(item)"
                  >mdi-pencil</v-icon
                >
                <v-icon   color="error" @click="confirmDelete(item)">mdi-delete</v-icon>
              </template>
            </v-data-table>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green" variant="elevated" @click="openAddModal">Add Business</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Add/Edit Dialog -->
    <v-dialog v-model="showModal" max-width="600px">
      <v-card>
        <v-card-title align="center" class="text-h4 font-weight-bold text-green">
          <span class="text-h5">{{
            isEditing ? 'Edit Business' : 'Add Business'
          }}</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="businessForm" v-model="isFormValid">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="currentBusiness.b_name"
                    label="Name"
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="currentBusiness.b_address"
                    label="Address"
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="currentBusiness.b_city"
                    label="City"
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="currentBusiness.b_phone"
                    label="Phone Number"
                    :rules="[rules.phone]"
                    @input="formatPhoneNumber"
                    placeholder="e.g., 613-555-1234"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    v-model="currentBusiness.b_type"
                    :items="['Restaurant', 'Butcher']"
                    label="Type"
                    :rules="[rules.required]"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    v-model="currentBusiness.b_status"
                    :items="['Verified', 'Pending', 'Unverified']"
                    label="Status"
                    :rules="[rules.required]"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="currentBusiness.b_date_last_check"
                    label="Last Check Date"
                    type="date"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="currentBusiness.b_address_link"
                    label="Google Maps Link"
                    :rules="[rules.url]"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red-darken-1" variant="text" @click="closeModal"
            >Cancel</v-btn
          ><v-btn color="green-darken-1" variant="text" @click="saveBusiness" :disabled="!isFormValid"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="showDeleteConfirm" max-width="500px">
      <v-card>
        <v-card-title class="text-h5 font-weight-bold text-error text-center">Warning - Delete action!</v-card-title>
        <v-card-text>
          You are about to delete "{{ businessToDelete?.b_name }}". 
          This action cannot be undone.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="showDeleteConfirm = false">Cancel</v-btn>
          <v-btn color="red-darken-1" variant="text" @click="deleteBusinessConfirmed">Delete</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Inactivity Logout Dialog -->
    <v-dialog v-model="showInactivityDialog" max-width="500px" persistent>
      <v-card>
        <v-card-title class="text-h5 text-warning">Session Timeout</v-card-title>
        <v-card-text> You have been logged out due to 5 minutes of inactivity. </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="warning" variant="elevated" @click="handleInactivityLogout">OK</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import apiClient from '@/plugins/axios';
import { isAxiosError } from 'axios';

interface Business {
  b_id: number;
  b_name: string;
  b_address: string;
  b_city: string;
  b_type: string;
  b_phone?: string;
  b_status?: string;
  b_date_last_check?: string;
  b_address_link?: string;
}

const router = useRouter();

function logout() {
  localStorage.removeItem('authToken'); // Clear the authentication token
  router.push({ name: 'Login' }); // Redirect to the login page
}

// --- Business Management Logic ---

const businesses = ref<Business[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);
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
const currentBusiness = ref<Partial<Business>>({});
const businessForm = ref(); // Reference to the v-form
const isFormValid = ref(false);
const defaultBusiness: Partial<Business> = {
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
const businessToDelete = ref<Business | null>(null);

// Inactivity dialog state
const showInactivityDialog = ref(false);

const rules = {
  required: (v: any) => !!v || 'This field is required.',
  phone: (v: string) =>
    !v ||
    /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(v) ||
    'Phone number must be a valid format.',
  url: (v: string) =>
    !v ||
    /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(v) ||
    'URL must be a valid format.',
};

function formatPhoneNumber(event: Event) {
  const input = event.target as HTMLInputElement;
  if (!input.value) return;

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
    businesses.value = response.data.sort((a: Business, b: Business) =>
      a.b_name.localeCompare(b.b_name)
    );
  } catch (err) {
    console.error('Failed to fetch businesses:', err);
    error.value = 'Could not load business data. Please try again later.';
  } finally {
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

function openEditModal(business: Business) {
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
  if (!valid) return;

  error.value = null;
  try {
    if (isEditing.value) {
      // Update existing business
      await apiClient.put(`/api/businesses/${currentBusiness.value.b_id}`, currentBusiness.value);
    } else {
      // Add new business
      await apiClient.post('/api/businesses', currentBusiness.value);
    }
    closeModal();
    setTimeout(() => {
      fetchBusinesses(); // Refresh the list after a short delay
    }, 500);
  } catch (err) {
    if (isAxiosError(err) && err.response) {
      error.value = err.response.data.message || 'An error occurred while saving the business.';
    } else {
      console.error('Failed to save business:', err);
      error.value = 'An unexpected error occurred.';
    }
  }
}

function confirmDelete(business: Business) {
  businessToDelete.value = business;
  showDeleteConfirm.value = true;
}

async function deleteBusinessConfirmed() {
  if (!businessToDelete.value?.b_id) return;
  error.value = null;
  try {
    await apiClient.delete(`/api/businesses/${businessToDelete.value.b_id}`);
    showDeleteConfirm.value = false;
    businessToDelete.value = null;
    setTimeout(() => {
      fetchBusinesses(); // Refresh the list after a short delay
    }, 1000);
  } catch (err) {
    if (isAxiosError(err) && err.response) {
      error.value = err.response.data.message || 'An error occurred while deleting the business.';
    } else {
      console.error('Failed to delete business:', err);
      error.value = 'An unexpected error occurred.';
    }
  }
}

// --- Inactivity Logout Logic ---

let inactivityTimer: number | undefined;

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
</script>

<style scoped>
.dashboard-container {
  padding: 20px;
  min-height: 60rem;
  min-width: 100rem;
  margin-top: -20rem;
}

.dashboard-container .v-card {
  padding: 20px;
  border-radius: 10px;
}
.dashboard-container .v-card-title {
  font-weight: bold;
  font-size: 1.5rem;
}
</style>