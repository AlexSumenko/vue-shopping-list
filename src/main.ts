import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './i18n';

import BaseButton from '@/components/ui/BaseButton.vue';
import BaseCard from '@/components/ui/BaseCard.vue';
import BaseDialog from '@/components/ui/BaseDialog.vue';
import BaseInput from '@/components/ui/BaseInput.vue';
import BaseSpinner from '@/components/ui/BaseSpinner.vue';

const app = createApp(App);

app.use(router);
app.use(store);
app.use(i18n);

app.component('base-button', BaseButton);
app.component('base-card', BaseCard);
app.component('base-dialog', BaseDialog);
app.component('base-input', BaseInput);
app.component('base-spinner', BaseSpinner);

router.isReady().then(() => {
    app.mount('#app');
});
