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
                    <img v-if="business.b_status === 'Verified'" width="48" height="48" src="https://img.icons8.com/color/48/approval--v1.png" alt="VerifiedLogo" class="business-logo" />
                    <img v-else-if="business.b_fielda === 'Machine Slaughtered'" width="48" height="48" src="https://img.icons8.com/emoji/48/warning-emoji.png" alt="warning-emoji" class="business-logo" />
                    <img v-else-if="business.b_fielda === 'Unknown'" width="48" height="48" src="https://img.icons8.com/emoji/48/warning-emoji.png" alt="warning-emoji" class="business-logo" />
                    <img v-else width="48" height="48" src="https://img.icons8.com/external-febrian-hidayat-glyph-febrian-hidayat/48/1A1A1A/external-exclamation-mark-ui-essential-febrian-hidayat-glyph-febrian-hidayat.png" alt="external-exclamation-mark" class="business-logo"
                    />
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
                        <img width="32" height="32" src="https://img.icons8.com/ios/32/0f4110/place-marker--v1.png" alt="Map Marker" />
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

<script>
    import axios from 'axios';
    
    export default {
        data() {
            return {
                businesses: [],
                selectedCategory: '',
                selectedCity: '',
                searchTerm: '',
                cities: ["Barrhaven","Clarence Creek","Gatineau","Gloucester","Greely","Kanata","Manotick","Nepean","Orléans","Ottawa","Rockland","Stittsville"],
                currentPage: 1,
                itemsPerPage: 6
            };
        },
        computed: {
            totalPages() {
                return Math.ceil(this.businesses.length / this.itemsPerPage);
            },
    
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
                            search: this.searchTerm
                        }
                    });
                    this.businesses = response.data;
                    this.currentPage = 1; 
                } catch (error) {
                    console.error('Error fetching businesses:', error);
                }
            },
    
            nextPage() {
                if (this.currentPage < this.totalPages) {
                    this.currentPage++;
                    window.scrollTo(0, 0);
                }
            },
    
            prevPage() {
                if (this.currentPage > 1) {
                    this.currentPage--;
                    window.scrollTo(0, 0);
                }
            }
        },
        mounted() {
            this.fetchBusinesses();
        }
    };
</script>

<style scoped>

</style>