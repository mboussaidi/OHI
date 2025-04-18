<template>
    <div class="footer-view">
    
        <div class="text-caption font-weight-regular opacity-60">
            <h3>Disclaimer: We are not a certification body. We simply inquire, verify, and make information available to the public.</h3>
        </div>
    
    
        <div>
            {{ new Date().getFullYear() }} — <strong>Ottawa Halal Initiative</strong>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'FooterView'
});
</script>