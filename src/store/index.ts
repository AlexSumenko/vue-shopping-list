import { createStore } from 'vuex';

import shoppingListsModule from './modules/shopping-lists';
import authModule from './modules/auth';

const store = createStore({
    modules: {
        auth: authModule,
        shoppingLists: shoppingListsModule,
    },
});

export default store;
