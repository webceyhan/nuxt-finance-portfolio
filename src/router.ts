import { createRouter, createWebHistory } from 'vue-router';
import Assets from './pages/Assets.vue';

const routes = [
    {
        path: '/',
        name: 'assets',
        component: Assets,
    },
    {
        path: '/portfolio',
        name: 'portfolio',
        component: () => import(/* webpackChunkName: "portfolio" */ './pages/Portfolio.vue'),        
    }
];

export const router = createRouter({
    routes,
    history: createWebHistory(),
    linkActiveClass: 'active',
    linkExactActiveClass: 'active',
});
