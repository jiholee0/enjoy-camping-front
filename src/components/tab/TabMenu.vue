<template>
  <div class="tab-menu">
    <!-- 탭 메뉴 버튼들 -->
    <div class="tabs">
      <button v-for="tab in tabs" :key="tab.name" :class="{ active: activeTab === tab.name }"
        @click="selectTab(tab.name)">
        {{ tab.label }}
      </button>
    </div>
    <!-- 선택된 탭에 해당하는 구성 요소 렌더링 -->
    <div class="tab-content">
      <component v-if="activeComponent" :is="activeComponent" v-bind="activeTabProps" @change-page="handlePageChange" />
      <p v-else>구성 요소를 불러올 수 없습니다.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineProps } from 'vue';

const props = defineProps({
  tabs: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['change-page']); // 부모로 이벤트 전달

const activeTab = ref(props.tabs[0]?.name || ""); // 첫 번째 탭을 기본 활성 탭으로 설정

const selectTab = (tabName) => {
  activeTab.value = tabName;
};

const activeTabData = computed(() => props.tabs.find((tab) => tab.name === activeTab.value));

const activeComponent = computed(() => activeTabData.value?.component || null);

const activeTabProps = computed(() => {
  const tabProps = activeTabData.value?.props;
  return typeof tabProps === 'function' ? tabProps() : tabProps || {};
});
const handlePageChange = (newPage) => {
  emit('change-page', newPage);
};
</script>

<style scoped>
.tab-menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.tabs {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
}

button {
  background: none;
  border: none;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 8px;
  color: #333;
  font-weight: 500;
  transition: 0.4s;
}

button.active {
  color: #0077b6;
  font-weight: bold;
  border-bottom: 2px solid #0077b6;
}

button:hover {
  color: #81c3d7 !important;
}

.tab-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
