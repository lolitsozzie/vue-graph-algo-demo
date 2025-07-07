import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@views/HomeView.vue';
import BreadthFirstView from '@/views/algorithms/BreadthFirstView.vue';
import DepthFirst from '@/views/algorithms/DepthFirst.vue';
import Kahns from '@/views/algorithms/Kahns.vue';


const router = createRouter({
    history: createWebHistory('/vue-graph-algo-demo/'),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            meta: {
                guest: true,
            },
        },
        {
            path: '/breadth-first',
            name: 'breadth-first',
            component: BreadthFirstView,
            meta: {
                guest: true,
            },
        },
        {
            path: '/depth-first',
            name: 'depth-first',
            component: DepthFirst,
            meta: {
                guest: true,
            },
        },
        {
            path: '/kahns',
            name: 'kahns',
            component: Kahns,
            meta: {
                guest: true,
            },
        },
    ],
});

export default router;
