<script setup>
import { computed } from 'vue';
import DepthFirst from '@/components/graph/DepthFirst.vue';
</script>

<template>
    <h2 class="text-xl font-semibold h-full py-auto">
        Depth First Search
    </h2>
    <div class="w-full h-[40rem] flex items-center justify-center bg-gray-100 rounded-md">
        <DepthFirst />
    </div>
</template>
