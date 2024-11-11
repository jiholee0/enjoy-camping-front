<template>
  <div class="viewCampsites">
    <!-- Search Bar -->
    <div class="search-container">
      <SearchBar label="캠핑장 검색하기" v-model="searchQuery" />
      <ButtonDark class="search-button" @click="onSearch" label="검색" />
    </div>

    <!-- Filters Container -->
    <div class="filters-container">
      <div class="select-group">
        <SelectBox :options="regionOptions" placeholder="시/도 선택" v-model="selectedRegion" />
        <SelectBox :options="districtOptions" placeholder="구/군 선택" v-model="selectedDistrict" />
      </div>
      <SingleTagFilter :tags="sortOptions" v-model="selectedSort" />
    </div>

    <!-- Campsite Grid -->
    <div class="campsite-grid">
      <CampsiteCardGrid />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import SearchBar from '@/components/SearchBar.vue';
import SelectBox from '@/components/SelectBox.vue';
import SingleTagFilter from '@/components/SingleTagFilter.vue';
import CampsiteCardGrid from '@/layout/CampsiteCardGrid.vue';
import ButtonDark from '@/components/ButtonDark.vue';

// 상태 관리
const searchQuery = ref('');
const selectedRegion = ref('');
const selectedDistrict = ref('');
const selectedSort = ref('');

const regionOptions = ref([
  { value: 'seoul', label: '서울특별시' },
  { value: 'busan', label: '부산광역시' },
]);
const districtOptions = ref([
  { value: 'nowon', label: '노원구' },
  { value: 'gangnam', label: '강남구' },
]);
const sortOptions = ref(['이름순', '리뷰많은순']);

// 검색 버튼 클릭 시 호출되는 함수
const onSearch = () => {
  console.log('검색어:', searchQuery.value);
  console.log('선택된 지역:', selectedRegion.value);
  console.log('선택된 구/군:', selectedDistrict.value);
  console.log('정렬 기준:', selectedSort.value);
  // 검색 기능 로직을 추가할 수 있습니다
};
</script>

<style scoped>
.viewCampsites {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
}

.search-container {
  width: 100%;
  max-width: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}

.filters-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 800px;
  margin-bottom: 24px;
}

.select-group {
  display: flex;
  gap: 8px;
}
</style>
