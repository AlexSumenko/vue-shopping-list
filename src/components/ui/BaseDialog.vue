<template>
    <teleport to="body">
        <div v-if="show" @click="tryClose" class="backdrop"></div>
        <transition name="dialog">
            <dialog open v-if="show">
                <header>
                    <slot name="header">
                        <h2>{{ title }}</h2>
                    </slot>
                </header>
                <section>
                    <slot></slot>
                </section>
                <menu v-if="!isFixed">
                    <slot name="actions">
                        <base-button @click="tryClose">{{
                            closeLabel
                        }}</base-button>
                    </slot>
                </menu>
            </dialog>
        </transition>
    </teleport>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps<{
    show: boolean;
    title?: string;
    isFixed?: string;
}>();

const emit = defineEmits<{
    (e: 'close'): void;
}>();

const closeLabel = computed(() => t('close'));

const tryClose = (): void => {
    if (props.isFixed) {
        return;
    }

    emit('close');
};
</script>

<style scoped lang="scss">
@import '@/assets/variables';

.backdrop {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    background-color: $shl-color--backdrop;
    z-index: $shl-index--backdrop;
}

dialog {
    position: fixed;
    top: 20vh;
    left: 10%;
    width: 80%;
    z-index: $shl-index--dialog;
    border-radius: $shl-border-radius;
    border: none;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    padding: 0;
    margin: 0;
    overflow: hidden;
    background-color: $shl-color--white;

    &-enter-from,
    &-leave-to {
        opacity: 0;
        transform: scale(0.8);
    }

    &-enter-active {
        transition: all 0.3s ease-out;
    }

    &-leave-active {
        transition: all 0.3s ease-in;
    }

    &-enter-to,
    &-leave-from {
        opacity: 1;
        transform: scale(1);
    }
}

header {
    background-color: $shl-color--blue;
    color: $shl-color--white;
    width: 100%;
    padding: 1rem;

    & h2 {
        margin: 0;
    }
}

section {
    padding: 1rem;
}

menu {
    padding: 1rem;
    display: flex;
    justify-content: flex-end;
    margin: 0;
}

@media (min-width: 768px) {
    dialog {
        left: calc(50% - 20rem);
        width: 40rem;
    }
}
</style>
