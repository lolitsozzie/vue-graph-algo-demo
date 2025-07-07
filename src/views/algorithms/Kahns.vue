<script setup>
import { computed } from 'vue';
import graph from '@/components/graph/BreadthFirst.vue';
</script>

<template>
    <h2 class="text-xl font-semibold h-full py-auto">
        Kahn’s Algorithm
    </h2>
    <div class="w-full h-[32rem] flex items-center justify-center bg-gray-100 rounded-md">
        <graph />
    </div>
</template>
