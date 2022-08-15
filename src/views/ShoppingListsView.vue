<template>
    <div>
        <InputForm @submit="handleSubmit" label="shoppingListsInputLabel" />
        <LoadingErrorView
            card-text="noShoppingLists"
            :error="error"
            :is-loading="isLoading"
            :should-show-table="shouldShowTable"
            :handle-error="handleError"
        />
        <ShoppingListsTable
            v-if="!isLoading && !error && shouldShowTable"
            :shoppingLists="shoppingLists"
            @delete-item="handleDelete"
            @select-item="handleSelect"
        />
    </div>
</template>

<script setup lang="ts">
import useShoppingLists from '../hooks/useShoppingLists';
import InputForm from '../components/shared/InputForm.vue';
import LoadingErrorView from '../components/shared/LoadingErrorView.vue';
import ShoppingListsTable from '../components/shared/ShoppingListsTable.vue';

const {
    handleDelete,
    handleError,
    handleSelect,
    handleSubmit,
    error,
    isLoading,
    loadShoppingLists,
    shoppingLists,
    shouldShowTable,
} = useShoppingLists();

loadShoppingLists();
</script>
