<template>
    <div class="listings">
        <div class="top-title">
            <p class="main-title">Our Listings</p>
        </div>
        <div class="filterinfo">

            <div class="filterinfo_item">
                <div class="filterinfo_item-name">Category</div>
                <select class="filterinfo_item-value" v-model="selectedCategory" @change="fetchBusinesses">
                    <option value="">All Categories</option>
                    <option value="Restaurant">Restaurants</option>
                    <option value="Butcher">Butchers</option>
                </select>
            </div>

            <div class="filterinfo_item">
                <div class="filterinfo_item-name">Ottawa/Gatineau</div>
                <select class="filterinfo_item-value" v-model="selectedCity" @change="fetchBusinesses">
                    <option value="">All Areas</option>
                    <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
                </select>
            </div>
            <div class="filterinfo_item">
                <div class="filterinfo_item-name">Search</div>
                <input class="filterinfo_item-value" v-model="searchTerm" @input="fetchBusinesses" placeholder="Search..." />
            </div>
        </div>

        <!-- Display businesses or "No results" message -->
        <div class="business-list" v-if="businesses.length > 0">
            <div v-for="(business, index) in paginatedBusinesses" :key="business.b_id" class="business-card fade-in" :style="{ animationDelay: `${index * 0.15}s` }">

                <div class="card-header">
                    <v-icon
                      v-if="business.b_status === 'Verified'"
                      color="success"
                      icon="mdi-check-circle"
                      size="x-large"
                      class="business-logo"
                    ></v-icon>
                    <v-icon
                      v-else-if="business.b_status === 'Machine Slaughtered'"
                      color="warning"
                      icon="mdi-alert"
                      size="x-large"
                      class="business-logo"
                    ></v-icon>
                    <v-icon
                      v-else
                      color="error"
                      icon="mdi-alert-circle"
                      size="x-large"
                      class="business-logo"
                    ></v-icon>
                </div>

                <div class="card-title">
                    <h2>{{ business.b_name }}</h2>
                </div>
                <div class="card-content">
                    <p>{{ business.b_address }}</p>
                    <p>{{ business.b_city }}</p>
                    <p>{{ business.b_phone }}</p>
                    <p>Type: {{ business.b_type }}</p>
                    <p>Status: {{ business.b_status }}</p>
                    <p>Last check: {{ business.b_date_last_check }}</p>
                    <a :href="business.b_address_link" target="_blank" rel="noopener noreferrer" class="map-link">
                        <v-icon color="green" size="x-large">mdi-map-marker</v-icon>
                    </a>
                </div>
            </div>
        </div>

        <!-- "No results" message -->
        <div v-else class="no-results">
            <p>No businesses found. Try adjusting your filters or search criteria.</p>
        </div>

        <div class="pagination" v-if="businesses.length > 0">
            <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
            <span>Page {{ currentPage }} of {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage >= totalPages">Next</button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import apiClient from '@/plugins/axios';

interface Business {
  b_id: number;
  b_name: string;
  b_address: string;
  b_city: string;
  b_type: string;
  b_status: string;
  b_date_last_check: string;
  b_address_link: string;
  b_phone: string;
  b_fielda: string; // Assuming this field might still be used
}

const businesses = ref<Business[]>([]);
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
    } catch (error) {
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
</script>

<style scoped>

</style>