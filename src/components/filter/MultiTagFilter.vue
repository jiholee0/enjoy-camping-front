<template>
  <div class="multi-tag-filter">
    <div class="select-all-container">
      <div class="custom-checkbox">
        <input
          type="checkbox"
          id="selectAll"
          v-model="selectAll"
          @change="toggleSelectAll"
        />
        <label class="checkbox-label" for="selectAll">
          <div class="checkbox-box">
            <svg
              class="check-mark"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <span class="label-text">전체 선택</span>
        </label>
      </div>
    </div>
    <span
      v-for="tag in tags"
      :key="tag"
      class="tag"
      :class="{ 'tag-selected': selectedTags.includes(tag) }"
      @click="toggleTag(tag)"
    >
      <span v-if="selectedTags.includes(tag)" class="check-icon">✓</span>
      {{ tag }}
    </span>
  </div>
</template>

<script setup>
import { defineProps, ref, watch } from 'vue';

const props = defineProps({
  tags: {
    type: Array,
    default: () => [],
  },
});

const selectedTags = ref([...props.tags]);
const selectAll = ref(true);

function toggleSelectAll() {
  if (selectAll.value) {
    selectedTags.value = [...props.tags];
  } else {
    selectedTags.value = [];
  }
}

function toggleTag(tag) {
  if (selectedTags.value.includes(tag)) {
    selectedTags.value = selectedTags.value.filter(t => t !== tag);
  } else {
    selectedTags.value.push(tag);
  }
  selectAll.value = selectedTags.value.length === props.tags.length;
}

watch(() => props.tags, (newTags) => {
  selectedTags.value = [...newTags];
  selectAll.value = true;
});
</script>

<style scoped>
.multi-tag-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  align-items: center;
}

.select-all-container {
  margin-right: 12px;
  display: flex;
  align-items: center;
}

.custom-checkbox {
  position: relative;
}

.custom-checkbox input[type="checkbox"] {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
}

.checkbox-box {
  width: 18px;
  height: 18px;
  border: 2px solid #435965;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  background-color: white;
}

.check-mark {
  width: 12px;
  height: 12px;
  color: white;
  opacity: 0;
  transform: scale(0);
  transition: all 0.2s ease;
}

input[type="checkbox"]:checked + .checkbox-label .checkbox-box {
  background-color: #435965;
  border-color: #435965;
}

input[type="checkbox"]:checked + .checkbox-label .check-mark {
  opacity: 1;
  transform: scale(1);
}

input[type="checkbox"]:focus + .checkbox-label .checkbox-box {
  box-shadow: 0 0 0 2px rgba(67, 89, 101, 0.2);
}

.label-text {
  font-size: 13px;
  color: #435965;
}

.tag {
  padding: 4px 8px;
  font-size: 11px;
  height: 28px;
  display: flex;
  align-items: center;
  background-color: #f0f0f0;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
}

.tag-selected {
  background-color: #435965;
  color: white;
  padding-left: 4px;
}

.check-icon {
  margin-right: 4px;
  font-size: 11px;
}
</style>
