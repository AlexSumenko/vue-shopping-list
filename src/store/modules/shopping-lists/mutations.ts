import type {
    ShoppingListItemType,
    ShoppingListsStateType,
    ShoppingListType,
    ShoppingListsType,
} from '@/types';

export default {
    deleteShoppingList(state: ShoppingListsStateType, payload: string) {
        const deletedListIndex = state.shoppingLists.findIndex(
            (shList: ShoppingListType) => shList.key === payload
        );
        state.shoppingLists.splice(deletedListIndex, 1);
    },

    setActiveShoppingList(
        state: ShoppingListsStateType,
        payload: ShoppingListType
    ) {
        state.activeShoppingList = payload;
    },

    setShoppingLists(
        state: ShoppingListsStateType,
        payload: ShoppingListsType
    ) {
        state.shoppingLists = payload.reverse();
    },

    deleteProductFromShoppingList(
        state: ShoppingListsStateType,
        payload: string
    ) {
        const deletedProductIndex = state.activeShoppingList.items.findIndex(
            (item: ShoppingListItemType) => item.key === payload
        );
        state.activeShoppingList.items.splice(deletedProductIndex, 1);
    },

    toggleProductStatus(
        state: ShoppingListsStateType,
        payload: { itemKey: string; status: boolean }
    ) {
        const toggledProductIndex = state.activeShoppingList.items.findIndex(
            (item: ShoppingListItemType) => item.key === payload.itemKey
        );
        state.activeShoppingList.items[toggledProductIndex].bought =
            payload.status;
    },
};
