<template>
    <div class="form__control">
        <label :for="inputId" :class="{ 'visually-hidden': shouldHideLabel }">{{
            label
        }}</label>
        <input
            :type="inputType"
            :id="inputId"
            :value="modelValue"
            @input="handleInput"
            :placeholder="placeholder"
        />
    </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
}>();

defineProps<{
    inputType: string;
    inputId: string;
    label: string;
    modelValue: string;
    placeholder?: string;
    shouldHideLabel?: boolean;
}>();

const handleInput = (event: Event): void => {
    emit('update:modelValue', (event.target as HTMLInputElement).value);
};
</script>

<style lang="scss" scoped>
@import '@/assets/variables';

.form__control {
    display: grid;
    gap: 0.5rem;

    & label {
        font-weight: bold;
    }

    & input {
        border-radius: $shl-border-radius;
        min-width: 20rem;
        outline: none;
        padding: 0.5rem 3.5rem 0.5rem 1rem;
    }
}
</style>
