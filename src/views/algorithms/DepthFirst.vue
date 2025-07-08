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
  <div class="mt-6 max-w-2xl text-sm text-gray-700">
    <h2 class="text-lg font-semibold mb-2">Why Use Depth-First Search?</h2>
    <ul class="list-disc pl-5 space-y-1">
      <li>Efficient for exploring deeply nested structures or paths</li>
      <li>Ideal for solving puzzles or navigating mazes</li>
      <li>Used in cycle detection within dependency graphs</li>
      <li>Powers topological sorting for task scheduling and build tools</li>
      <li>Common in AI for decision trees and game move planning</li>
      <li>Supports backtracking-based algorithms like Sudoku solvers</li>
      <li>Useful for generating mazes or spanning trees</li>
    </ul>
  </div>

</template>
