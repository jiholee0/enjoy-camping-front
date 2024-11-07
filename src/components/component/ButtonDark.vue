<!-- ButtonDark.vue -->
<template>
  <button class="button-dark" @click="$emit('click')">
    <slot>{{label}}</slot>
  </button>
</template>

<script>
export default {
  props: {
        label: {
            type: String,
            required: true,
        },
    },
};
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
  transition: background-color 0.3s;
  margin-right: 0.5rem;
}

.button-dark:hover {
  background-color: #81c3d7;
}
</style>
