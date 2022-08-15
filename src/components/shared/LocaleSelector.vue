<template>
    <div>
        <select
            class="language-selector"
            v-model="localeSelected"
            @change="toggleLocale"
        >
            <option value="en">{{ `🇺🇸 EN` }}</option>
            <option value="ru">{{ `🇷🇺 RU` }}</option>
        </select>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

const localeSelected = ref<string>(locale.value);

const toggleLocale = (): void => {
    locale.value = localeSelected.value;
    localStorage.setItem('shl-locale', localeSelected.value);
};
</script>

<style lang="scss" scoped>
@import '@/assets/variables';

.language-selector {
    border: none;
    color: $shl-color--blue;
    font-size: 1rem;
    outline: none;
}
</style>
