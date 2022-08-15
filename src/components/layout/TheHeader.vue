<template>
    <nav class="navbar">
        <div class="navbar__content">
            <RouterLink
                class="navbar__link"
                :to="RoutesEnum.SHOPPING_LISTS_PAGE"
            >
                <h1>{{ headerLabel }}</h1>
            </RouterLink>
            <RouterLink v-if="!isAuthenticated" :to="RoutesEnum.SIGNIN_PAGE">
                <base-button>{{ signinLabel }}</base-button>
            </RouterLink>
            <base-button v-else @click="logout">{{ signoutLabel }}</base-button>
            <LocaleSelector />
        </div>
    </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { RoutesEnum } from '../../types';
import useHeader from '../../hooks/useHeader';
import LocaleSelector from '../shared/LocaleSelector.vue';

const { headerLabel, isAuthenticated, logout, signinLabel, signoutLabel } =
    useHeader();
</script>

<style lang="scss" scoped>
@import '@/assets/variables';

.navbar {
    background-color: $shl-color--blue;
    color: $shl-color--black;
    height: 3rem;
    position: sticky;
    z-index: $shl-index--header;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    &__content {
        max-width: $shl-max-body-width;
        color: $shl-color--white;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 1rem;
        width: 100%;
    }

    &__link {
        text-decoration: none;
        color: $shl-color--white;
    }
}
</style>
