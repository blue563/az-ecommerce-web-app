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
    <div class="login-page">
        <form @submit.prevent="onSubmit" class="login-form">
            <h1 class="login-form__title">Sign in</h1>

            <label>
                <span>Username</span>
                <input v-model="form.username" type="text" required/>
            </label>
            <label>
                <span>Password</span>
                <input v-model="form.password" type="password" required/>
            </label>

            <p v-if="auth.error" class="login-form__error">{{ auth.error }}</p>

            <button type="submit" class="login-form__submit" :disabled="auth.isLoading">
                {{ auth.isLoading ? 'Signing in...' : 'Sign in' }}
            </button>
        </form>
    </div>
</template>

<style scoped lang="scss">
.login-page {
  display: flex;
  justify-content: center;
  padding-block: var(--space-6);
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  width: 100%;
  max-width: 360px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-6);

  &__title {
    margin: 0 0 var(--space-2);
    text-align: center;
  }

  &__error {
    color: #c0392b;
    margin: 0;
    font-size: 0.9rem;
  }

  &__submit {
    background: var(--color-header-dark, #131921);
    color: white;
    border: none;
    border-radius: 4px;
    padding: var(--space-3);
    cursor: pointer;
    font-weight: var(--font-weight-bold, 700);
    margin-inline: var(--space-4);

    &:hover:not(:disabled) {
        background: var(--color-header-light, #232f3e);
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
  }

  label {
        display: flex;
        flex-direction: column;
        gap: var(--space-2);

        span {
            text-align: center;
        }

        input {
            padding: var(--space-2);
            border: 1px solid #999;
            border-radius: 4px;
            background: #ffffff;
            color: #1a1a1a;
            text-align: center;
            margin-inline: var(--space-4);
        }
  }
}
</style>