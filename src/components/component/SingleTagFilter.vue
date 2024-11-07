<template>
  <div class="single-tag-filter">
    <button
      v-for="tag in tags"
      :key="tag"
      :class="['tag-button', { active: tag === selectedTag } ]"
      @click="selectTag(tag)"
    >
      <span v-if="tag === selectedTag" class="check-icon">✓</span>
      {{ tag }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'SingleTagFilter',
  props: {
    tags: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectedTag: null,
    };
  },
  methods: {
    selectTag(tag) {
      // 단일 선택을 위해 클릭한 태그를 selectedTag로 설정
      this.selectedTag = this.selectedTag === tag ? null : tag;
    },
  },
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
