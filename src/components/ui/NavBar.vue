<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

const route = useRoute();
const router = useRouter();
const store = useStore();

const navigation = computed(() => [
    { name: 'About', href: '/vue-graph-algo-demo/' },
    { name: 'Breadth First', href: '/vue-graph-algo-demo/breadth-first', guest: true },
    { name: 'Depth First', href: '/vue-graph-algo-demo/depth-first', guest: true },
    { name: 'Kahn’s Algorithm', href: '/vue-graph-algo-demo/kahns', guest: true },
]);
</script>


<template>
  <nav class="bg-gray-800 text-white">
    <div class="container mx-auto px-4 py-4 flex justify-between items-center">
      <div class="flex items-center space-x-8">
        <div class="flex items-center">
          <span class="ml-3 font-bold text-lg">Graph Demo</span>
        </div>

        <div class="flex flex-wrap space-x-6">
          <a
            v-for="item in navigation"
            :key="item.name"
            :href="item.href"
            :class="[
    'text-sm font-semibold px-4 py-2 rounded-full transition-colors duration-200',
    '/vue-graph-algo-demo' + route.path === item.href
      ? 'bg-gray-200 text-gray-900'
      : 'bg-gray-700 text-white hover:bg-gray-600 hover:text-white'
  ]"
          >
            {{ item.name }}
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>
