import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import type { UseHeaderOutput } from '@/types';
import { AuthActionTypesEnum, AuthGettersEnum, RoutesEnum } from '@/types';

const useHeader = (): UseHeaderOutput => {
    const store = useStore();
    const router = useRouter();
    const { t } = useI18n();

    const isAuthenticated = computed<boolean>(
        () => store.getters[AuthGettersEnum.IS_AUTHENTICATED]
    );

    const headerLabel = computed<string>(() => t('shoppingLists'));
    const signinLabel = computed<string>(() => t('signin'));
    const signoutLabel = computed<string>(() => t('signout'));

    const logout = () => {
        store.dispatch(AuthActionTypesEnum.LOGOUT);

        router.replace(RoutesEnum.SIGNIN_PAGE);
    };

    return {
        headerLabel,
        isAuthenticated,
        logout,
        signinLabel,
        signoutLabel,
    };
};

export default useHeader;
