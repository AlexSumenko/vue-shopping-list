<template>
    <section>
        <form class="form" @submit.prevent="submitForm">
            <base-input
                :label="translatedLabel"
                should-hide-label
                :placeholder="placeholderLabel"
                input-type="text"
                input-id="input"
                v-model.trim="inputValue"
            ></base-input>
            <base-button class="form__button" isIcon>{{
                '\u2705'
            }}</base-button>
        </form>
    </section>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps<{
    label: string;
}>();

const emit = defineEmits<{
    (e: 'submit', value: string): void;
}>();

const inputValue = ref<string>('');

const placeholderLabel = computed<string>(() => t('startTyping'));
const translatedLabel = computed<string>(() => t(props.label));

const submitForm = () => {
    emit('submit', inputValue.value);
    inputValue.value = '';
};
</script>

<style lang="scss" scoped>
@import '@/assets/variables';

.form {
    margin-bottom: 1rem;
    position: sticky;
    top: 3rem;
    z-index: $shl-index--input;

    &__button {
        position: absolute;
        right: 1rem;
        top: 50%;
        transform: translateY(-50%);
        outline: unset;
        border: unset;
        background-color: $shl-color--white;
        font-size: 1.5rem;
    }
}
</style>
