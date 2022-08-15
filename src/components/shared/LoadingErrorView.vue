<template>
    <base-dialog :show="!!error" :title="dialogTitle" @close="handleError">
        <p>{{ error }}</p>
    </base-dialog>
    <base-spinner v-if="isLoading"></base-spinner>
    <base-card v-else-if="!isLoading && !shouldShowTable">
        {{ translatedCardText }}
    </base-card>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
    cardText: string;
    isLoading: boolean;
    error: string | null;
    handleError: () => void;
    shouldShowTable: boolean;
}>();

const { t } = useI18n();

const translatedCardText = computed<string>(() => t(props.cardText));
const dialogTitle = computed<string>(() => t('errorOccurred'));
</script>
