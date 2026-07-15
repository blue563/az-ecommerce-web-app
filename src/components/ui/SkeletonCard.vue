<template>
    <div class="skeleton" aria-hidden="true">
        <div class="skeleton__img" />
        <div class="skeleton__line" />
    </div>
</template>

<style scoped lang="scss">
.skeleton {
  background: var(--color-surface);
  border-radius: var(--radius-md);
  padding: var(--space-4);

  &__img, &__line {
    background: var(--color-border);
    border-radius: var(--radius-sm);
    animation: pulse 1.2s ease-in-out infinite;
  }
  &__img { aspect-ratio: 1/1; margin-bottom: var(--space-2); }
  &__line { height: 1rem; }
}
@keyframes pulse { 50% { opacity: 0.5; } }
</style>