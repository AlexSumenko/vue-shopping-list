import type { ComputedRef, Ref } from 'vue';
import type { ShoppingListType, ShoppingListsType } from './store';

export type UseShoppingListOutput = {
    handleDelete: (itemKey: string) => void;
    handleError: () => void;
    handleSelect: (itemKey: string, status: boolean) => void;
    handleSubmit: (enteredValue: string) => void;
    error: Ref<string | null>;
    isLoading: Ref<boolean>;
    loadActiveShoppingList: (key: string) => Promise<void>;
    shoppingList: ComputedRef<ShoppingListType>;
    shouldShowTable: ComputedRef<boolean>;
};

export type UseShoppingListsOutput = {
    handleDelete: (key: string) => void;
    handleError: () => void;
    handleSelect: (key: string) => void;
    handleSubmit: (enteredValue: string) => void;
    error: Ref<string | null>;
    isLoading: Ref<boolean>;
    loadShoppingLists: () => Promise<void>;
    shoppingLists: ComputedRef<ShoppingListsType>;
    shouldShowTable: ComputedRef<boolean>;
};

export type UseSigninOutput = {
    dialogTitle: ComputedRef<string>;
    emailLabel: ComputedRef<string>;
    emailValue: Ref<string>;
    error: Ref<string | null>;
    handleError: () => void;
    handleSubmit: () => void;
    passwordLabel: ComputedRef<string>;
    passwordValue: Ref<string>;
    signinLabel: ComputedRef<string>;
};

export type UseHeaderOutput = {
    headerLabel: ComputedRef<string>;
    isAuthenticated: ComputedRef<boolean>;
    logout: () => void;
    signinLabel: ComputedRef<string>;
    signoutLabel: ComputedRef<string>;
};
