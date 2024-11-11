<template>
  <div class="tab-menu">
    <!-- 탭 메뉴 버튼들 -->
    <div class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab.name"
        :class="{ active: activeTab === tab.name }"
        @click="selectTab(tab.name)"
      >
        {{ tab.label }}
      </button>
    </div>
    <!-- 선택된 탭에 해당하는 구성 요소 렌더링 -->
    <div class="tab-content">
      <component :is="activeComponent" :reviews="reviews" />
    </div>
  </div>
</template>

<script>
import { ref, computed, defineComponent } from 'vue';

export default defineComponent({
  name: "TabMenu",
  props: {
    tabs: {
      type: Array,
      required: true,
    },
    reviewData: {
      type: Array,
      required: false,
      default: () => [], // 기본값을 빈 배열로 설정
    },
  },
  setup(props) {
    const activeTab = ref(props.tabs[0]?.name || ""); // 첫 번째 탭을 기본 활성 탭으로 설정

    const selectTab = (tabName) => {
      activeTab.value = tabName;
    };

    const activeComponent = computed(() => {
      const activeTabData = props.tabs.find((tab) => tab.name === activeTab.value);
      return activeTabData ? activeTabData.component : null;
    });

    // reviewData 이름을 reviews로 변경하여 반환
    return {
      activeTab,
      selectTab,
      activeComponent,
      reviews: props.reviewData, // 이름 변경
    };
  },
});
</script>

<style scoped>
.tab-menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100% ;
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
}

button.active {
  color: #0077b6;
  font-weight: bold;
  border-bottom: 2px solid #0077b6; /* Bottom border for active 탭 */
}

.tab-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
