<template>
  <div class="search-bar-container">
    <input
      type="text"
      :placeholder="label"
      class="search-bar"
      v-model="searchText"
    />
    <span v-if="searchText" class="clear-icon" @click="clearSearch">×</span>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';

defineProps({
  label: {
    type: String,
    default: '검색어를 입력하세요.',
  },
});

const searchText = ref('');

const clearSearch = () => {
  searchText.value = '';
};
</script>

<style scoped>
.search-bar-container {
  position: relative;
  display: flex;
  align-items: center;
  width: 90%;
  min-width: 700px;
  margin: 20px auto;
  padding: 5px;
  background-color: #f3f3f3e5;
  border-radius: 30px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.search-bar-container:hover {
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15);
}

.search-bar {
  flex: 1;
  padding: 14px 50px 14px 20px;
  border: none;
  border-radius: 40px;
  font-size: 14px;
  color: #333;
  background-color: transparent;
  outline: none;
}

.search-bar::placeholder {
  color: #a3a3a3;
  font-size: 14px;
}

.clear-icon {
  position: absolute;
  right: 20px;
  font-size: 20px;
  cursor: pointer;
  color: #888;
  transition: color 0.3s ease;
  user-select: none;
}

.clear-icon:hover {
  color: #555;
}
</style>
