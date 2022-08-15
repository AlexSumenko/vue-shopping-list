import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import type { ShoppingListsStateType } from '@/types';

export default {
    namespaced: true,
    state() {
        return {
            shoppingLists: [],
            activeShoppingList: {},
        } as ShoppingListsStateType;
    },
    actions,
    getters,
    mutations,
};
