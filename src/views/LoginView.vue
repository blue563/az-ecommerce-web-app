<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore()
const router = useRouter()

const form = reactive({
    username: 'mor_2314',
    password: '83r5^_',
})

async function onSubmit() {
    const success = await auth.login({...form})
    if(success) {
        router.push({name: 'home'})
    }
}
</script>

<template>
    <form @submit.prevent="onSubmit" class="login-form">
        <label>
            <span>Username</span>
            <input v-model="form.username" type="text" required/>
        </label>
        <label>
            <span>Password</span>
            <input v-model="form.password" type="password" required/>
        </label>

        <p v-if="auth.error">{{ auth.error }}</p>

        <button type="submit" :disabled="auth.isLoading">
            {{ auth.isLoading ? 'Signing in...' : 'Sign in' }}
        </button>
    </form>
</template>

<style lang="scss">
.login-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);

  label {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }
}
</style>