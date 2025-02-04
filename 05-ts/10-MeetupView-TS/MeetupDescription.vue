<script setup lang="ts">
// Make description optional if it’s not required
defineProps<{
  description?: string 
}>()
</script>

<template>
  <div class="meetup-description">{{ description }}</div>
</template>

<style scoped>
/* _meetup-description.css */
.meetup-description {
  margin: var(--spacing-large) 0;
  white-space: pre-wrap;
}
</style>
