import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import type { UseSigninOutput } from '@/types';
import { AuthActionTypesEnum, AuthGettersEnum, RoutesEnum } from '@/types';

const useSignin = (): UseSigninOutput => {
    const store = useStore();
    const router = useRouter();
    const { t } = useI18n();

    const emailValue = ref<string>('');
    const passwordValue = ref<string>('');
    const error = ref<string | null>(null);

    const emailLabel = computed<string>(() => t('email'));
    const passwordLabel = computed<string>(() => t('password'));
    const signinLabel = computed<string>(() => t('signin'));
    const dialogTitle = computed<string>(() => t('errorOccurred'));
    const somethingWentWrong = t<string>('somethingWentWrong');

    if (store.getters[AuthGettersEnum.IS_AUTHENTICATED]) {
        router.replace(RoutesEnum.SHOPPING_LISTS_PAGE);
    }

    const handleSubmit = async () => {
        const payload = {
            email: emailValue.value,
            password: passwordValue.value,
        };

        try {
            await store.dispatch(AuthActionTypesEnum.AUTHENTICATE, payload);

            router.replace(RoutesEnum.SHOPPING_LISTS_PAGE);
        } catch (err) {
            const typedError = err as Error;
            error.value = typedError?.message || somethingWentWrong;
        }
    };

    const handleError = () => {
        error.value = null;
    };

    return {
        dialogTitle,
        emailLabel,
        emailValue,
        error,
        handleError,
        handleSubmit,
        passwordLabel,
        passwordValue,
        signinLabel,
    };
};

export default useSignin;
