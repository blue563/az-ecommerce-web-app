<script setup lang="ts">
defineProps<{ message: string }>()
const emit = defineEmits<{
    retry: [] 
}>()
</script>

<template>
    <div class="error" role="alert">
        <p>{{ message }}</p>
        <button @click="emit('retry')"></button>
    </div>
</template>