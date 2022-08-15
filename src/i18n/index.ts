import { createI18n } from 'vue-i18n';
import enStrings from './en';
import ruStrings from './ru';

const messages = {
    ...enStrings,
    ...ruStrings,
};

const i18n = createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'ru',
    messages,
});

export default i18n;
