<template>
  <div class="single-tag-filter">
    <button
      v-for="tag in tags"
      :key="tag"
      :class="['tag-button', { active: tag === selectedTag }]"
      @click="toggleTag(tag)"
    >
      <span v-if="tag === selectedTag" class="check-icon">✓</span>
      {{ tag }}
    </button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue';

// Props 및 Emit 정의
const props = defineProps({
  tags: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: String,
    default: null,
  },
});

const emit = defineEmits(['update:modelValue']);
const selectedTag = ref(props.modelValue || props.tags[0]); // 초기값 설정

// 버튼 클릭 시 태그 선택 및 취소 로직
const toggleTag = (tag) => {
  if (selectedTag.value === tag) {
    selectedTag.value = tag; // 선택 취소 대신 그대로 유지
  } else {
    selectedTag.value = tag;
  }
  emit('update:modelValue', selectedTag.value); // 부모 컴포넌트로 값 전달
};

// modelValue가 변경될 때 selectedTag 업데이트
watch(() => props.modelValue, (newVal) => {
  selectedTag.value = newVal;
});
</script>

<style scoped>
.single-tag-filter {
  display: flex;
  gap: 4px;
}

.tag-button {
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
  border: none;
}

.tag-button.active {
  background-color: #435965;
  color: white;
  padding-left: 4px;
}

.check-icon {
  margin-right: 4px;
  font-size: 11px;
}
</style>
