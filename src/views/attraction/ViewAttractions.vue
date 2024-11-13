<template>
  <div class="viewAttractions">
    <!-- Filters Container -->
    <div class="filters-container">
      <MultiTagFilter :tags="tags" v-model="selectedTags" />
      <div class="select-group">
        <SelectBox :options="regionOptions" placeholder="시/도 선택" v-model="selectedRegion" />
        <SelectBox :options="districtOptions" placeholder="구/군 선택" v-model="selectedDistrict" />
      </div>
    </div>

    <!-- Search Bar with Search Button -->
    <div class="search-container">
      <SearchBar label="캠핑장 검색하기" v-model="searchQuery" />
      <ButtonDark class="search-button" @click="onSearch" label="검색"/>
    </div>

    <!-- Tourist Site Grid -->
    <div class="attraction-grid">
      <AttractionCardGrid :filters="activeFilters" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import SearchBar from '@/components/search/SearchBar.vue';
import SelectBox from '@/components/filter/SelectBox.vue';
import MultiTagFilter from '@/components/filter/MultiTagFilter.vue';
import AttractionCardGrid from '@/layout/grid/AttractionCardGrid.vue';
import ButtonDark from '@/components/button/ButtonDark.vue';

// 검색어와 필터 상태 관리
const searchQuery = ref('');
const selectedTags = ref([]);
const selectedRegion = ref('');
const selectedDistrict = ref('');

const tags = ref(['관광지', '문화시설', '축제공연행사', '여행코스', '레포츠', '숙박', '쇼핑', '음식점']);
const regionOptions = ref([
  { value: 'seoul', label: '서울특별시' },
  { value: 'busan', label: '부산광역시' },
]);
const districtOptions = ref([
  { value: 'nowon', label: '노원구' },
  { value: 'gangnam', label: '강남구' },
]);

// 검색 버튼 클릭 시 호출되는 함수
const onSearch = () => {
  console.log('검색어:', searchQuery.value);
  console.log('선택된 태그:', selectedTags.value);
  console.log('선택된 지역:', selectedRegion.value);
  console.log('선택된 구/군:', selectedDistrict.value);
  // 검색 및 필터링 로직 추가
};

// 검색 조건에 따라 필터 데이터를 계산
const activeFilters = computed(() => ({
  query: searchQuery.value,
  tags: selectedTags.value,
  region: selectedRegion.value,
  district: selectedDistrict.value
}));
</script>

<style scoped>
.viewAttractions {
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
  flex-direction: column;
  gap: 16px;
  align-items: center;
  width: 100%;
  max-width: 800px;
  margin-top: 24px;
}

.select-group {
  display: flex;
  gap: 8px;
}

.attraction-grid {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 16px;
  max-width: 1000px;
  width: 100%;
}
</style>
