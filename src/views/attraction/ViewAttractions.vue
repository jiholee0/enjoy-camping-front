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
      <SearchBar label="관광지 검색하기" v-model="searchQuery" />
      <ButtonDark class="search-button" @click="onSearch" label="검색"/>
    </div>

    <!-- Tourist Site Grid -->
    <div class="attraction-grid">
      <AttractionCardGrid
        :attractions="attractions"
        :total-pages="totalPages"
        :current-page="currentPage"
        @change-page="fetchAttractions" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { getAttractions } from '@/api/attractionApi.js';
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
  console.log('선택된 지역:', selectedRegion.value);
  console.log('선택된 구/군:', selectedDistrict.value);
  console.log('선택된 태그:', selectedTags.value);
  // 검색 기능 로직을 추가할 수 있습니다
};

const attractions = ref([]); // 관광지 목록 데이터
const currentPage = ref(1);
const itemsPerPage = 9;
const totalItems = ref(0);
const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage));

// 페이지에 따른 관광지 데이터를 API에서 가져오는 함수
const fetchAttractions = async (page = 1) => {
  currentPage.value = page;
  try {
    const response = await getAttractions(page, itemsPerPage, 'title', 'asc');
    attractions.value = response.data.result;
    totalItems.value = response.data.totalCount;
  } catch (error) {
    console.error("관광지 데이터를 불러오는 중 오류가 발생했습니다:", error);
  }
};

// 컴포넌트가 마운트될 때 관광지 데이터를 로드
onMounted(() => {
  fetchAttractions();
});
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
