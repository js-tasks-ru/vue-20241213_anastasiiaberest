<script setup></script>

<template>
  <div class="stretch-container">
    <slot />
  </div>
</template>

<style scoped>
.stretch-container > * {
  width: 100%;
  height: 100%;
}

.stretch-container > img :deep,
.stretch-container > video :deep,
.stretch-container > picture :deep{
  object-fit: scale-down;
}
</style>
