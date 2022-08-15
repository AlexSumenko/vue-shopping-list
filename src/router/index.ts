import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';
import ShoppingListsView from '@/views/ShoppingListsView.vue';
import SigninView from '@/views/SigninView.vue';
import { AuthGettersEnum, RoutesEnum } from '@/types';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/', redirect: RoutesEnum.SHOPPING_LISTS_PAGE },
        {
            path: RoutesEnum.SIGNIN_PAGE,
            name: 'signin',
            component: SigninView,
            meta: { requiresNonAuth: true },
        },
        {
            path: RoutesEnum.SHOPPING_LISTS_PAGE,
            name: 'shopping-lists',
            component: ShoppingListsView,
            meta: { requiresAuth: true },
        },
        {
            path: RoutesEnum.SHOPPING_LIST_PAGE,
            name: 'shopping-list',
            props: true,
            component: () => import('@/views/ShoppingListView.vue'),
            meta: { requiresAuth: true },
        },
        {
            path: '/:notFound(.*)',
            component: () => import('@/views/NotFoundView.vue'),
        },
    ],
});

router.beforeEach((to, _, next) => {
    if (
        to.meta.requiresAuth &&
        !store.getters[AuthGettersEnum.IS_AUTHENTICATED]
    ) {
        next(RoutesEnum.SIGNIN_PAGE);
    } else if (
        to.meta.requiresNonAuth &&
        store.getters[AuthGettersEnum.IS_AUTHENTICATED]
    ) {
        next(RoutesEnum.SHOPPING_LISTS_PAGE);
    } else {
        next();
    }
});

export default router;
