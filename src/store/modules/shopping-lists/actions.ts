import useRequest from '@/hooks/useRequest';
import type { ShoppingListsContext } from '@/types';
import { AuthGettersEnum, ShoppingListsMutationTypesEnum } from '@/types';

const { getRequest, deleteRequest, postRequest, putRequest } = useRequest();

export default {
    withAuth(context: ShoppingListsContext, payload: string): string {
        const token = context.rootGetters[AuthGettersEnum.TOKEN];

        return `${payload}?auth=${token}`;
    },

    async loadShoppingLists(context: ShoppingListsContext) {
        const url = await context.dispatch('withAuth', 'shopping-lists.json');

        const { data, error } = await getRequest(url);

        if (error) {
            context.commit(
                ShoppingListsMutationTypesEnum.SET_SHOPPING_LISTS,
                []
            );

            throw error;
        }

        const shoppingLists = [];

        for (const shoppingListKey in data) {
            const newItems = [];
            for (const itemKey in data[shoppingListKey].items) {
                newItems.push({
                    key: itemKey,
                    ...data[shoppingListKey].items[itemKey],
                });
            }
            shoppingLists.push({
                key: shoppingListKey,
                name: data[shoppingListKey].name,
                items: newItems,
            });
        }

        context.commit(
            ShoppingListsMutationTypesEnum.SET_SHOPPING_LISTS,
            shoppingLists
        );
    },

    async addShoppingList(context: ShoppingListsContext, payload: string) {
        const url = await context.dispatch('withAuth', 'shopping-lists.json');

        const { error } = await postRequest<{ name: string }>(url, {
            name: payload,
        });

        if (error) {
            throw error;
        }
    },

    async deleteShoppingList(context: ShoppingListsContext, payload: string) {
        const url = await context.dispatch(
            'withAuth',
            `shopping-lists/${payload}.json`
        );

        const { error } = await deleteRequest(url);

        if (error) {
            throw error;
        }

        context.commit(
            ShoppingListsMutationTypesEnum.DELETE_SHOPPING_LIST,
            payload
        );
    },

    async loadShoppingList(context: ShoppingListsContext, payload: string) {
        const url = await context.dispatch(
            'withAuth',
            `shopping-lists/${payload}.json`
        );

        const { data, error } = await getRequest(url);

        if (error) {
            context.commit(
                ShoppingListsMutationTypesEnum.SET_ACTIVE_SHOPPING_LIST,
                {}
            );

            throw error;
        }

        const newItems = [];
        for (const key in data.items) {
            newItems.push({ key, ...data.items[key] });
        }
        const shoppingList = {
            key: payload,
            items: newItems,
            name: data.name,
        };

        context.commit(
            ShoppingListsMutationTypesEnum.SET_ACTIVE_SHOPPING_LIST,
            shoppingList
        );
    },

    async addProductToShoppingList(
        context: ShoppingListsContext,
        payload: { shoppingListKey: string; name: string }
    ) {
        const url = await context.dispatch(
            'withAuth',
            `shopping-lists/${payload.shoppingListKey}/items.json`
        );

        const { error } = await postRequest<{
            bought: boolean;
            product: string;
        }>(url, {
            product: payload.name,
            bought: false,
        });

        if (error) {
            throw error;
        }
    },

    async deleteProductFromShoppingList(
        context: ShoppingListsContext,
        payload: { shoppingListKey: string; itemKey: string }
    ) {
        const url = await context.dispatch(
            'withAuth',
            `shopping-lists/${payload.shoppingListKey}/items/${payload.itemKey}.json`
        );

        const { error } = await deleteRequest(url);

        if (error) {
            throw error;
        }

        context.commit(
            ShoppingListsMutationTypesEnum.DELETE_PRODUCT_FROM_SHOPPING_LIST,
            payload.itemKey
        );
    },

    async toggleProductBoughtStatusOnBackend(
        context: ShoppingListsContext,
        payload: { shoppingListKey: string; itemKey: string; status: boolean }
    ) {
        const url = await context.dispatch(
            'withAuth',
            `shopping-lists/${payload.shoppingListKey}/items/${payload.itemKey}/bought.json`
        );

        const { error } = await putRequest<boolean>(url, payload.status);
        if (error) {
            throw error;
        }

        context.commit(
            ShoppingListsMutationTypesEnum.TOGGLE_PRODUCT_STATUS,
            payload
        );
    },
};
