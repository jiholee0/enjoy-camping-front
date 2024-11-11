<template>
  <div class="single-tag-filter">
    <button
      v-for="tag in tags"
      :key="tag"
      :class="['tag-button', { active: tag === selectedTag }]"
      @click="selectTag(tag)"
    >
      <span v-if="tag === selectedTag" class="check-icon">✓</span>
      {{ tag }}
    </button>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue';

defineProps({
  tags: {
    type: Array,
    required: true,
  },
});

const selectedTag = ref(null);

const selectTag = (tag) => {
  selectedTag.value = selectedTag.value === tag ? null : tag;
};
</script>

<style scoped>
.single-tag-filter {
  display: flex;
  gap: 4px;
}

.tag-button {
  padding: 4px 8px;
  font-size: 11px;
  height: 32px;
  display: flex;
  align-items: center;
  background-color: #f0f0f0;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
  border: none;
}

.tag-button.active {
  background-color: #0077b6;
  color: white;
  padding-left: 4px;
}

.check-icon {
  margin-right: 4px;
  font-size: 11px;
}
</style>
