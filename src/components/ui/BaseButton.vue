<template>
    <button v-if="isIcon" class="clickable">
        <slot></slot>
    </button>
    <button v-else class="clickable btn">
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
    isIcon?: boolean;
}>();
</script>

<style lang="scss" scoped>
@import '@/assets/variables';

.btn {
    padding: 0.75rem 1.5rem;
    font: inherit;
    background-color: $shl-color--blue;
    border: 1px solid $shl-color--blue;
    color: $shl-color--white;
    cursor: pointer;
    border-radius: $shl-border-radius;
}
</style>
