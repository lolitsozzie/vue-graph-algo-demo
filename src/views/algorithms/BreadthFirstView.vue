<script setup>
import { computed } from 'vue';
import graph from '@/components/graph/BreadthFirst.vue';
</script>

<template>
  <h2 class="text-xl font-semibold h-full py-auto">
    Breadth First Search
  </h2>
  <div class="w-full h-[40rem] flex items-center justify-center bg-gray-100 rounded-md">
    <graph />
  </div>
  <div class="mt-6 max-w-2xl text-sm text-gray-700">
    <h2 class="text-lg font-semibold mb-2">Why Use Breadth-First Search?</h2>
    <ul class="list-disc pl-5 space-y-1">
      <li>Finds the shortest path in unweighted networks</li>
      <li>Useful for tracing how data, threats, or signals spread</li>
      <li>Powers friend recommendations in social networks</li>
      <li>Used in web crawlers and indexing algorithms</li>
      <li>Helps in routing protocols (like in mesh or peer networks)</li>
      <li>Drives pathfinding in games and AI</li>
      <li>Reliable for full graph exploration when coverage matters</li>
    </ul>
  </div>
</template>
