<!-- ButtonDark.vue -->
<template>
  <button class="button-dark" @click="$emit('click1')">
    <slot>{{ label }}</slot>
  </button>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  label: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.button-dark {
  background-color: #0077b6;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  white-space: nowrap;
  cursor: pointer;
  transition: background-color 0.5s;
  margin-right: 0.5rem;
}

.button-dark:hover {
  background-color: #81c3d7;
}
</style>
