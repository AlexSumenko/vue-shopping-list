import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import type { AuthStateType } from '@/types';

export default {
    namespaced: true,
    state() {
        return {
            didAutoLogout: false,
            token: null,
            userId: null,
        } as AuthStateType;
    },
    actions,
    getters,
    mutations,
};
