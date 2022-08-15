import type { AuthStateType } from '@/types';

export default {
    token(state: AuthStateType): string | null {
        return state.token;
    },
    didAutoLogout(state: AuthStateType): boolean {
        return state.didAutoLogout;
    },
    isAuthenticated(state: AuthStateType): boolean {
        return !!state.token;
    },
};
