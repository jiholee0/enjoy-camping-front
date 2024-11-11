<template>
  <select class="select-box">
    <option value="" disabled selected hidden>{{ placeholder }}</option>
    <option
      v-for="option in options"
      :key="option.value"
      :value="option.value"
    >
      {{ option.label }}
    </option>
  </select>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  options: {
    type: Array,
    required: true,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: 'Sort by',
  },
});
</script>

<style scoped>
.select-box {
  width: 120px;
  height: 32px;
  line-height: 32px;
  padding: 0 24px 0 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 11px;
  background-color: #fff;
  color: #333;
  appearance: none;
  outline: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 8px center;
  cursor: pointer;
}

.select-box:hover {
  border-color: #bbb;
}

.select-box:focus {
  border-color: #999;
}
</style>
