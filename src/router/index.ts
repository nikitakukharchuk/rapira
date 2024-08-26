import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "../views/HomeView.vue";
import DefaultLayout from "../layouts/DefaultLayout.vue";

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: HomeView,
            meta: { layout: DefaultLayout, name: 'Главная ' },
        },
        {
            path: '/blog',
            component: () => import('../views/BlogView.vue'),
            meta: { layout: DefaultLayout, name: 'Блог' }
        },
    ],
})