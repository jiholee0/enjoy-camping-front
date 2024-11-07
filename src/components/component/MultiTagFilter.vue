<template>
  <div class="multi-tag-filter">
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

<script>
export default {
  name: 'MultiTagFilter',
  props: {
    tags: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selectedTags: [],
    };
  },
  methods: {
    toggleTag(tag) {
      if (this.selectedTags.includes(tag)) {
        this.selectedTags = this.selectedTags.filter(t => t !== tag);
      } else {
        this.selectedTags.push(tag);
      }
    },
  },
};
</script>

<style scoped>
.multi-tag-filter {
  display: flex;
  gap: 4px;
}

.tag {
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
}

.tag-selected {
  background-color: #0077b6;
  color: white;
  padding-left: 4px;
}

.check-icon {
  margin-right: 4px;
  font-size: 11px;
}
</style>
