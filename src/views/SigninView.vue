<template>
    <section>
        <base-dialog :show="!!error" :title="dialogTitle" @close="handleError">
            <p>{{ error }}</p>
        </base-dialog>
        <base-card>
            <form class="signin__form" @submit.prevent="handleSubmit">
                <base-input
                    :label="emailLabel"
                    input-type="email"
                    input-id="email"
                    v-model.trim="emailValue"
                ></base-input>
                <base-input
                    :label="passwordLabel"
                    input-type="password"
                    input-id="password"
                    v-model.trim="passwordValue"
                ></base-input>
                <base-button type="submit">{{ signinLabel }}</base-button>
            </form>
        </base-card>
    </section>
</template>

<script setup lang="ts">
import useSignin from '../hooks/useSignin';

const {
    dialogTitle,
    emailLabel,
    emailValue,
    error,
    handleError,
    handleSubmit,
    passwordLabel,
    passwordValue,
    signinLabel,
} = useSignin();
</script>

<style lang="scss" scoped>
.signin__form {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
}
</style>
