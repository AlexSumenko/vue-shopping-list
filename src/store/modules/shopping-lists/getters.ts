import type {
    ShoppingListsStateType,
    ShoppingListsType,
    ShoppingListType,
} from '@/types';

export default {
    shoppingLists(state: ShoppingListsStateType): ShoppingListsType {
        return state.shoppingLists;
    },
    hasShoppingLists(state: ShoppingListsStateType): boolean {
        return state.shoppingLists.length > 0;
    },
    activeShoppingList(
        state: ShoppingListsStateType
    ): ShoppingListType | Record<string, never> {
        return state.activeShoppingList;
    },
    hasProducts(state: ShoppingListsStateType): boolean {
        return state.activeShoppingList.items?.length > 0;
    },
};
