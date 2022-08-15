<template>
    <div>
        <InputForm @submit="handleSubmit" label="productInputLabel" />
        <LoadingErrorView
            card-text="emptyShoppingList"
            :error="error"
            :is-loading="isLoading"
            :should-show-table="shouldShowTable"
            :handle-error="handleError"
        />
        <ShoppingListTable
            v-if="!isLoading && !error && shouldShowTable"
            :shoppingList="shoppingList"
            @delete-item="handleDelete"
            @select-item="handleSelect"
        />
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import useShoppingList from '../hooks/useShoppingList';
import InputForm from '../components/shared/InputForm.vue';
import LoadingErrorView from '../components/shared/LoadingErrorView.vue';
import ShoppingListTable from '../components/shared/ShoppingListTable.vue';

const props = defineProps<{
    id: string;
}>();

const {
    handleDelete,
    handleError,
    handleSelect,
    handleSubmit,
    error,
    isLoading,
    loadActiveShoppingList,
    shoppingList,
    shouldShowTable,
} = useShoppingList(props.id);

loadActiveShoppingList(props.id);
</script>
