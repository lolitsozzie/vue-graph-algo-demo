<script setup>
import { computed } from 'vue';
import KahnsAlgorithm from '@/components/graph/KahnsAlgorithm.vue';
</script>

<template>
    <h2 class="text-xl font-semibold h-full py-auto">
        Kahn’s Algorithm
    </h2>
    <div class="w-full h-[40rem] flex items-center justify-center bg-gray-100 rounded-md">
        <KahnsAlgorithm />
    </div>
</template>
