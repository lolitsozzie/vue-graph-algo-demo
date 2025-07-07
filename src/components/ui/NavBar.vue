<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

const route = useRoute();
const router = useRouter();
const store = useStore();

const navigation = computed(() => [
    { name: 'Home', href: '/vue-graph-algo-demo/' },
    { name: 'Graph', href: '/vue-graph-algo-demo/graph', guest: true },
]);
</script>


<template>
    <nav class="bg-gray-800 text-white">
        <div class="container mx-auto px-4 py-4 flex justify-between items-center">
            <div class="flex items-center space-x-8">
                <div class="flex items-center">
                    <span class="ml-3 font-bold text-lg">Graph Demo</span>
                </div>

                <div class="hidden md:flex space-x-6">
                    <a
                        v-for="item in navigation"
                        :key="item.name"
                        :href="item.href"
                        :class="[
                            'text-sm font-medium hover:text-white',
                            route.path === item.href ? 'text-white underline' : ''
                        ]"
                    >
                    <div>
                        {{ item.name }}
                    </div>
                    </a>
                </div>
            </div>
        </div>
    </nav>
</template>
