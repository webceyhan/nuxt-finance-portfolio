import { watch } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { useAuth } from './composables/auth';
import Assets from './pages/Assets.vue';

const { user } = useAuth();

const routes = [
    {
        path: '/',
        name: 'assets',
        component: Assets,
    },
    {
        path: '/portfolio',
        name: 'portfolio',
        meta: { requiresAuth: true },
        component: () => import('./pages/Portfolio.vue'),
    },
    {
        path: '/holdings/:id',
        name: 'holding',
        meta: { requiresAuth: true },
        component: () => import('./pages/Holding.vue'),
    },
];

export const router = createRouter({
    routes,
    history: createWebHistory(),
    linkActiveClass: 'active',
    linkExactActiveClass: 'active',
});

// add auth guard to all routes which require authentication
router.beforeEach((to) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (!user.value) return { path: '/' };
    }
});

// redirect to home page if user signed out
watch(user, () => user.value || router.push('/'));
