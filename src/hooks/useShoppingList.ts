import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import type { ShoppingListType, UseShoppingListOutput } from '@/types';
import {
    ShoppingListsActionTypesEnum,
    ShoppingListsGettersEnum,
} from '@/types';

const useShoppingList = (id: string): UseShoppingListOutput => {
    const store = useStore();

    const { t } = useI18n();

    const somethingWentWrong = t('somethingWentWrong');

    const isLoading = ref<boolean>(false);
    const error = ref<string | null>(null);

    const shoppingList = computed<ShoppingListType>(
        () => store.getters[ShoppingListsGettersEnum.ACTIVE_SHOPPING_LIST]
    );

    const shouldShowTable = computed<boolean>(
        () => store.getters[ShoppingListsGettersEnum.HAS_PRODUCTS]
    );

    const loadActiveShoppingList = async (key: string) => {
        isLoading.value = true;
        try {
            await store.dispatch(
                ShoppingListsActionTypesEnum.LOAD_SHOPPING_LIST,
                key
            );
        } catch (err) {
            const typedError = err as Error;
            error.value = typedError?.message || somethingWentWrong;
        } finally {
            isLoading.value = false;
        }
    };

    const handleSubmit = async (enteredValue: string) => {
        try {
            await store.dispatch(
                ShoppingListsActionTypesEnum.ADD_PRODUCT_TO_SHOPPING_LIST,
                {
                    name: enteredValue,
                    shoppingListKey: id,
                }
            );
        } catch (err) {
            const typedError = err as Error;
            error.value = typedError?.message || somethingWentWrong;
        }

        loadActiveShoppingList(id);
    };

    const handleDelete = async (itemKey: string) => {
        try {
            await store.dispatch(
                ShoppingListsActionTypesEnum.DELETE_PRODUCT_FROM_SHOPPING_LIST,
                {
                    shoppingListKey: id,
                    itemKey,
                }
            );
        } catch (err) {
            const typedError = err as Error;
            error.value = typedError?.message || somethingWentWrong;
        }
    };

    const handleSelect = async (itemKey: string, status: boolean) => {
        try {
            await store.dispatch(
                ShoppingListsActionTypesEnum.TOGGLE_PRODUCT_STATUS,
                {
                    shoppingListKey: id,
                    itemKey,
                    status,
                }
            );
        } catch (err) {
            const typedError = err as Error;
            error.value = typedError?.message || somethingWentWrong;
        }
    };

    const handleError = () => {
        error.value = null;
    };

    return {
        handleDelete,
        handleError,
        handleSelect,
        handleSubmit,
        error,
        isLoading,
        loadActiveShoppingList,
        shoppingList,
        shouldShowTable,
    };
};

export default useShoppingList;
