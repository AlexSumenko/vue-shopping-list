import useRequest from '@/hooks/useRequest';
import type { AuthContext } from '@/types';
import { AuthMutationTypesEnum } from '@/types';

const { authRequest } = useRequest();
let timer: ReturnType<typeof setTimeout>;

export default {
    async authenticate(
        context: AuthContext,
        payload: { email: string; password: string }
    ) {
        const { data, error } = await authRequest<{
            email: string;
            password: string;
            returnSecureToken: true;
        }>(
            {
                email: payload.email,
                password: payload.password,
                returnSecureToken: true,
            },
            `${import.meta.env.VITE_AUTH_BASE_URL}?key=${
                import.meta.env.VITE_AUTH_KEY
            }`
        );

        if (error) {
            throw error;
        }

        const expiresIn = Number(data.expiresIn) * 1000;
        const expirationDate = new Date().getTime() + expiresIn;

        localStorage.setItem('token', data.idToken);
        localStorage.setItem('userId', data.localId);
        localStorage.setItem('tokenExpiration', expirationDate.toString());

        timer = setTimeout(() => {
            context.dispatch('autoLogout');
        }, expiresIn);

        context.commit(AuthMutationTypesEnum.SET_USER, {
            token: data.idToken,
            userId: data.localId,
        });
    },

    tryLogin(context: AuthContext) {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const tokenExpiration = localStorage.getItem('tokenExpiration');

        const expiresIn = Number(tokenExpiration) - new Date().getTime();

        if (expiresIn < 0) {
            return;
        }

        timer = setTimeout(() => {
            context.dispatch('autoLogout');
        }, expiresIn);

        if (token && userId) {
            context.commit(AuthMutationTypesEnum.SET_USER, {
                token,
                userId,
            });
        }
    },

    logout(context: AuthContext) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('tokenExpiration');

        clearTimeout(timer);

        context.commit(AuthMutationTypesEnum.SET_USER, {
            token: null,
            userId: null,
        });
    },

    autoLogout(context: AuthContext) {
        context.dispatch('logout');
        context.commit(AuthMutationTypesEnum.AUTO_LOGOUT);
    },
};
