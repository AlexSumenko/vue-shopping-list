<template>
    <section>
        <table>
            <tbody>
                <tr v-for="(item, idx) in shoppingLists" :key="item.key">
                    <td class="clickable" @click="selectItem(item.key)">
                        <span class="table__product-name">{{ item.name }}</span>
                        <span>{{ totalLabel }}: {{ totalItems(idx) }}</span>
                        <span class="table__products--bought"
                            >{{ boughtLabel }}: {{ boughtItems(idx) }}</span
                        >
                    </td>
                    <TableDeleteCell @click="deleteItem(item.key)" />
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps } from 'vue';
import { useI18n } from 'vue-i18n';
import TableDeleteCell from './TableDeleteCell.vue';
import type { ShoppingListsType } from '../../types';

const { t } = useI18n();

const props = defineProps<{
    shoppingLists: ShoppingListsType;
}>();

const emit = defineEmits<{
    (e: 'deleteItem', key: string): void;
    (e: 'selectItem', key: string): void;
}>();

const shoppingLists = computed<ShoppingListsType>(() => props.shoppingLists);
const boughtLabel = computed<string>(() => t('bought'));
const totalLabel = computed<string>(() => t('total'));

const totalItems = (idx: number): number =>
    shoppingLists.value[idx]?.items?.length || 0;
const boughtItems = (idx: number): number =>
    shoppingLists.value[idx]?.items?.reduce(
        (total: number, item: { bought: boolean }) =>
            total + Number(item.bought),
        0
    ) || 0;

const selectItem = (itemKey: string): void => {
    emit('selectItem', itemKey);
};

const deleteItem = (itemKey: string): void => {
    emit('deleteItem', itemKey);
};
</script>

<style lang="scss" scoped>
@import '@/assets/variables';

.table__product-name {
    font-weight: bold;
}

.table__products--bought {
    color: $shl-color--green;
}
</style>
