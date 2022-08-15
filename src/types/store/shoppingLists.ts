export enum ShoppingListsMutationTypesEnum {
    SET_SHOPPING_LISTS = 'setShoppingLists',
    DELETE_SHOPPING_LIST = 'deleteShoppingList',
    SET_ACTIVE_SHOPPING_LIST = 'setActiveShoppingList',
    DELETE_PRODUCT_FROM_SHOPPING_LIST = 'deleteProductFromShoppingList',
    TOGGLE_PRODUCT_STATUS = 'toggleProductStatus',
}

export enum ShoppingListsActionTypesEnum {
    LOAD_SHOPPING_LISTS = 'shoppingLists/loadShoppingLists',
    ADD_SHOPPING_LIST = 'shoppingLists/addShoppingList',
    DELETE_SHOPPING_LIST = 'shoppingLists/deleteShoppingList',
    LOAD_SHOPPING_LIST = 'shoppingLists/loadShoppingList',
    ADD_PRODUCT_TO_SHOPPING_LIST = 'shoppingLists/addProductToShoppingList',
    DELETE_PRODUCT_FROM_SHOPPING_LIST = 'shoppingLists/deleteProductFromShoppingList',
    TOGGLE_PRODUCT_STATUS = 'shoppingLists/toggleProductBoughtStatusOnBackend',
}

export enum ShoppingListsGettersEnum {
    ACTIVE_SHOPPING_LIST = 'shoppingLists/activeShoppingList',
    SHOPPING_LISTS = 'shoppingLists/shoppingLists',
    HAS_SHOPPING_LISTS = 'shoppingLists/hasShoppingLists',
    HAS_PRODUCTS = 'shoppingLists/hasProducts',
}

export type ShoppingListItemType = {
    key: string;
    bought: boolean;
    product: string;
};

export type ShoppingListType = {
    key: string;
    name: string;
    items: ShoppingListItemType[];
};

export type ShoppingListsType = ShoppingListType[];

export type ShoppingListsStateType = {
    activeShoppingList: ShoppingListType | Record<string, never>;
    shoppingLists: ShoppingListsType;
};
