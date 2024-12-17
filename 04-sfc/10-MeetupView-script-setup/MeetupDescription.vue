<!-- <script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MeetupDescription',

  props: {
    description: {
      type: String,
    },
  },
})
</script> -->

<script setup>
defineProps({
  description: {
    type: String,
  },
})
</script>

<template>
<div class="meetup-description" v-html="description"></div>
</template>

<style scoped>
.meetup-description {
  padding-top: 33px;
  margin-bottom: 24px;
  font-size: 18px;
  line-height: 28px;
  white-space: pre-wrap;
}
</style>
