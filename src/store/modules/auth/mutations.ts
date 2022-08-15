import type { AuthStateType } from '@/types';

export default {
    setUser(state: AuthStateType, payload: { token: string; userId: string }) {
        state.token = payload.token;
        state.userId = payload.userId;
        state.didAutoLogout = false;
    },
    autoLogout(state: AuthStateType) {
        state.didAutoLogout = true;
    },
};
