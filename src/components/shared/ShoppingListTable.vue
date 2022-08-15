<template>
    <section>
        <table>
            <tbody>
                <tr v-for="item in shoppingList.items" :key="item.key">
                    <td
                        class="clickable"
                        :class="{ 'product--bought': item.bought }"
                        @click="selectItem(item.key, !item.bought)"
                    >
                        {{ item.product }}
                    </td>
                    <TableDeleteCell @click="deleteItem(item.key)" />
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps } from 'vue';
import TableDeleteCell from './TableDeleteCell.vue';
import type { ShoppingListType } from '../../types';

const props = defineProps<{
    shoppingList: ShoppingListType;
}>();

const emit = defineEmits<{
    (e: 'deleteItem', itemKey: string): void;
    (e: 'selectItem', itemKey: string, status: boolean): void;
}>();

const shoppingList = computed<ShoppingListType>(() => props.shoppingList);

const selectItem = (itemKey: string, status: boolean): void => {
    emit('selectItem', itemKey, status);
};

const deleteItem = (itemKey: string): void => {
    emit('deleteItem', itemKey);
};
</script>

<style lang="scss" scoped>
@import '@/assets/variables';

.product--bought {
    background-color: $shl-color--green;
    color: $shl-color--black;
    text-decoration: line-through;
}
</style>
