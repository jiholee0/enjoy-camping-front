<!-- ButtonLight.vue -->
<template>
  <button class="button-light" @click="$emit('click1')">
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
.button-light {
    background-color: transparent;
    color: #0077b6;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    white-space: nowrap;
    cursor: pointer;
    transition: color 0.3s;
    margin-right: 0.5rem;
}

.button-light:hover {
    color: #81c3d7;
}
</style>
