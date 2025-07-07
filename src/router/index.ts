import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@views/HomeView.vue';
import GraphView from '@views/GraphView.vue';


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
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
            path: '/graph',
            name: 'graph',
            component: GraphView,
            meta: {
                guest: true,
            },
        },
    ],
});

export default router;
