<template>
    <td class="clickable table__delete-column">
        <base-button class="table__delete-btn" isIcon type="button">
            <img
                :src="trashIcon"
                alt="Delete product icon."
                height="32"
                width="32"
        /></base-button>
    </td>
</template>

<script setup lang="ts">
import trashIcon from '@/assets/trash-icon.png';
</script>

<style lang="scss" scoped>
.table__delete-column {
    width: 0.1rem;
}

.table__delete-btn {
    border: unset;
    background-color: unset;
    outline: unset;
}
</style>
