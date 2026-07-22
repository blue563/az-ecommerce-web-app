<script setup lang="ts">
defineProps<{ message: string }>()
const emit = defineEmits<{
    retry: [] 
}>()
</script>

<template>
    <div class="error" role="alert">
        <p>{{ message }}</p>
        <button type="button" @click="emit('retry')">Retry</button>
    </div>
</template>