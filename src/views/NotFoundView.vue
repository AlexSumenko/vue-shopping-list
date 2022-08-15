<template>
    <section>
        <base-card>
            <h2>{{ pageNotFound }}</h2>
            <p>{{ pageDoesntExist }}</p>
            <RouterLink :to="RoutesEnum.SHOPPING_LISTS_PAGE">
                <base-button>{{ goToHome }}</base-button></RouterLink
            >
        </base-card>
    </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { RoutesEnum } from '../types';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const pageNotFound = computed<string>(() => t('pageNotFound'));
const pageDoesntExist = computed<string>(() => t('pageDoesntExist'));
const goToHome = computed<string>(() => t('goToHome'));
</script>
