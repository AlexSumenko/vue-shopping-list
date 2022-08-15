<template>
    <TheHeader />
    <main class="app">
        <RouterView v-slot="{ Component }">
            <transition name="route" mode="out-in">
                <component :is="Component"></component>
            </transition>
        </RouterView>
    </main>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { RouterView, useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import { AuthActionTypesEnum, AuthGettersEnum, RoutesEnum } from './types';
import TheHeader from '@/components/layout/TheHeader.vue';

const store = useStore();
const router = useRouter();
const { locale } = useI18n();

locale.value = localStorage.getItem('shl-locale') || locale.value;

store.dispatch(AuthActionTypesEnum.TRY_LOGIN);

const didAutoLogout = computed<boolean>(
    () => store.getters[AuthGettersEnum.DID_AUTO_LOGOUT]
);

watch(didAutoLogout, (newState, oldState) => {
    if (!newState) return;

    if (newState !== oldState) {
        router.replace(RoutesEnum.SIGNIN_PAGE);
    }
});
</script>

<style lang="scss">
@import '@/assets/variables';

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: sans-serif;
    font-size: 1rem;
    background-color: $shl-color--white;
    color: $shl-color--black;
    text-align: center;
}

table,
th,
td {
    border: 1px solid $shl-color--black;
    border-collapse: collapse;
    padding: 0.5rem 1rem;
}

table {
    width: 100%;

    & span {
        display: block;
        margin: 0.1rem 0;
    }
}

.app {
    max-width: $shl-max-body-width;
    min-width: $shl-min-body-width;
    padding: 1rem 1rem 3rem;
    margin: 0 auto;
}

.clickable {
    cursor: pointer;
}

.route-enter-from {
    opacity: 0;
    transform: translateY(-30px);
}

.route-enter-active {
    transition: all 0.3s ease-out;
}

.route-enter-to,
.route-leave-from {
    opacity: 1;
    transform: translateY(0);
}

.route-leave-active {
    transition: all 0.3s ease-in;
}

.route-leave-to {
    opacity: 0;
    transform: translateY(30px);
}

.visually-hidden {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    overflow: hidden;
    padding: 0;
    position: absolute !important;
    white-space: nowrap;
    width: 1px;
}
</style>
