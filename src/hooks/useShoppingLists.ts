import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import type { ShoppingListsType, UseShoppingListsOutput } from '@/types';
import {
    ShoppingListsActionTypesEnum,
    ShoppingListsGettersEnum,
} from '@/types';

const useShoppingLists = (): UseShoppingListsOutput => {
    const store = useStore();
    const router = useRouter();

    const { t } = useI18n();

    const somethingWentWrong = t('somethingWentWrong');

    const isLoading = ref<boolean>(false);
    const error = ref<string | null>(null);

    const shoppingLists = computed<ShoppingListsType>(
        () => store.getters[ShoppingListsGettersEnum.SHOPPING_LISTS]
    );

    const shouldShowTable = computed<boolean>(
        () => store.getters[ShoppingListsGettersEnum.HAS_SHOPPING_LISTS]
    );

    const loadShoppingLists = async () => {
        isLoading.value = false;
        try {
            isLoading.value = true;
            await store.dispatch(
                ShoppingListsActionTypesEnum.LOAD_SHOPPING_LISTS
            );
        } catch (err) {
            const typedError = err as Error;
            error.value = typedError?.message || somethingWentWrong;
        } finally {
            isLoading.value = false;
        }
    };

    const handleSelect = (key: string) => {
        router.push(`/shopping-list/${key}`);
    };

    const handleDelete = async (key: string) => {
        try {
            await store.dispatch(
                ShoppingListsActionTypesEnum.DELETE_SHOPPING_LIST,
                key
            );
        } catch (err) {
            const typedError = err as Error;
            error.value = typedError?.message || somethingWentWrong;
        }
    };

    const handleSubmit = async (enteredValue: string) => {
        try {
            await store.dispatch(
                ShoppingListsActionTypesEnum.ADD_SHOPPING_LIST,
                enteredValue
            );
        } catch (err) {
            const typedError = err as Error;
            error.value = typedError?.message || somethingWentWrong;
        }

        loadShoppingLists();
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
        loadShoppingLists,
        shoppingLists,
        shouldShowTable,
    };
};

export default useShoppingLists;
