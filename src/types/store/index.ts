import type { ActionContext } from 'vuex';
import type { AuthStateType } from './auth';
import type { ShoppingListsStateType } from './shoppingLists';

export type AppStateType = {
    shoppingLists: ShoppingListsStateType;
    auth: AuthStateType;
};

export type AuthContext = ActionContext<AppStateType, AuthStateType>;

export type ShoppingListsContext = ActionContext<
    AppStateType,
    ShoppingListsStateType
>;

export * from './auth';
export * from './shoppingLists';
