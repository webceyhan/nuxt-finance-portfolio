import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
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
