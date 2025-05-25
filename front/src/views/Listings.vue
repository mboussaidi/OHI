<template>
    <div class="listings">
        <div class="top-title">
            <p class="main-title">Our listings</p>
        </div>
        <div class="filterinfo">

            <div class="filterinfo_item">
                <div class="filterinfo_item-name">Category</div>
                <select v-model="selectedCategory" @change="fetchBusinesses">
                    <option value="">All Categories</option>
                    <option value="Restaurant">Restaurants</option>
                    <option value="Butcher">Butchers</option>
                </select>
            </div>

            <div class="filterinfo_item">
                <div class="filterinfo_item-name">City</div>
                <select v-model="selectedCity" @change="fetchBusinesses">
                    <option value="">All Cities</option>
                    <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
                </select>
            </div>
            <div class="filterinfo_item">
                <div class="filterinfo_item-name">Search</div>
                <input v-model="searchTerm" @input="fetchBusinesses" placeholder="Search..." />
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
                cities: ['Ottawa', 'Gatineau', 'Kanata', 'Nepean', 'Orléans', 'Gloucester', 'Barrhaven', 'Stittsville', 'Rockland', 'Manotick', 'Greely', 'Clarence Creek'],
    
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
                }
            },
    
            prevPage() {
                if (this.currentPage > 1) {
                    this.currentPage--;
                }
            }
        },
        mounted() {
            this.fetchBusinesses();
        }
    };
</script>

<style scoped>
    .listings {
        display: flex;
        flex-direction: column;
        align-items: center;
        min-height: 100vh;
        box-sizing: border-box;
        justify-content: flex-start;
    }
    
    
    .filterinfo {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;
        margin-bottom: 30px;
        flex-wrap: wrap;
    }
    
    
    .filterinfo_item {
        display: flex;
        flex-direction: column;
        align-items: center;
        min-width: 200px;
    }
    
    
    .filterinfo_item-name {
        font-weight: bold;
        margin-bottom: 5px;
        text-align: center;
    }
    
    
    select,
    input {
        width: 100%;
        height: 40px;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        transition: all 0.3s ease;
        box-sizing: border-box;
        font-size: 16px;
    }
    
    
    select:hover,
    input:hover {
        border-color: #007BFF;
    }
    
    .business-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 20px;
        max-width: 960px;
    }
    
    .card-header {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    
    .business-card {
        border: 1px solid #ccc;
        padding: 20px;
        width: 300px;
        height: 400px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        transition: transform 0.3s ease;
        opacity: 0;
        transform: translateY(20px);
        animation: fadeInUp 0.6s forwards;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        height: 100%;
    }
 
    .card-content {
        margin-top: auto; 
    }

    .card-title {
        height: 80px;
        text-align: center;
        align-content: top;
        margin-bottom: 20px;
    }




    
    .business-card h2 {
        font-size: 22px;
        white-space: normal;
        overflow: visible;
    }
    
    .business-card p {
        margin: 5px 0;
        font-size: 16px;
        line-height: 1.4;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    
    /* Sequential animation delay */
    
    .business-card:nth-child(1) {
        animation-delay: 0.15s;
    }
    
    .business-card:nth-child(2) {
        animation-delay: 0.3s;
    }
    
    .business-card:nth-child(3) {
        animation-delay: 0.45s;
    }
    
    .business-card:nth-child(4) {
        animation-delay: 0.6s;
    }
    
    .business-card:nth-child(5) {
        animation-delay: 0.75s;
    }
    
    .business-card:nth-child(6) {
        animation-delay: 0.9s;
    }
    
    .business-card:hover {
        transform: translateY(-20px) scale(1.05);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
    }
    
    
    @keyframes fadeInUp {
        0% {
            opacity: 0;
            transform: translateY(20px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    
    .pagination {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 30px;
    }
    
    .pagination button {
        background-color: #45764c;
        color: white;
        border: none;
        padding: 8px 15px;
        cursor: pointer;
        transition: background 0.3s;
        margin: 0 10px;
    }
    
    .pagination button:disabled {
        background-color: #a9abaad1;
        cursor: not-allowed;
    }
    
    .pagination button:hover:not(:disabled) {
        background-color: #389f47;
    }
    
    .pagination span {
        font-size: 16px;
    }
    
    .no-results {
        text-align: center;
        font-size: 18px;
        color: #555;
        margin: 40px 0;
    }
</style>