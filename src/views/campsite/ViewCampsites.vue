<template>
  <div class="viewCampsites">
    <!-- Filters Container -->
    <div class="filters-container">
      <div class="select-group">
        <SelectBox :options="regionOptions" placeholder="시/도 선택" v-model="selectedRegion" />
        <SelectBox :options="districtOptions" placeholder="구/군 선택" v-model="selectedDistrict" />
      </div>
      <SingleTagFilter class="single-tag-filter" :tags="sortOptions" v-model="selectedSort" />
    </div>

    <!-- Search Bar -->
    <div class="search-container">
      <SearchBar label="캠핑장 검색하기" v-model="searchQuery" />
      <ButtonDark class="search-button" @click="onSearch" label="검색" />
    </div>

    <!-- Campsite Grid -->
    <div class="campsite-grid">
      <CampsiteCardGrid
        :campings="campings"
        :total-pages="totalPages"
        :current-page="currentPage"
        @change-page="fetchCampings"/>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { getCampings } from '@/api/campsiteApi.js';
import SearchBar from '@/components/search/SearchBar.vue';
import SelectBox from '@/components/filter/SelectBox.vue';
import SingleTagFilter from '@/components/filter/SingleTagFilter.vue';
import CampsiteCardGrid from '@/layout/grid/CampsiteCardGrid.vue';
import ButtonDark from '@/components/button/ButtonDark.vue';

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

const campings = ref([]); // 캠핑장 목록 데이터
const currentPage = ref(1);
const itemsPerPage = 9;
const totalItems = ref(0);
const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage));

// 페이지에 따른 캠핑장 데이터를 API에서 가져오는 함수
const fetchCampings = async (page = 1) => {
  currentPage.value = page;
  try {
    const response = await getCampings(page, itemsPerPage, 'name', 'asc');
    campings.value = response.data.result;
    totalItems.value = response.data.totalCount;
  } catch (error) {
    console.error("캠핑장 데이터를 불러오는 중 오류가 발생했습니다:", error);
  }
};

// 컴포넌트가 마운트될 때 캠핑장 데이터를 로드
onMounted(() => {
  fetchCampings();
});
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
  justify-content: left;
  align-items: center;
  gap: 20px;
  width: 100%;
  max-width: 800px;
  margin-top: 24px;
}

.select-group {
  display: flex;
  gap: 8px;
}
</style>
