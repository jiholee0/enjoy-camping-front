<template>
  <div class="view-campsites">
    <!-- Filters Container -->
    <div class="filters-container">
      <div class="select-group">
        <SelectBox
          :options="regionOptions"
          placeholder="시/도 선택"
          v-model="selectedRegion"
          @update:modelValue="onRegionChange"
        />
        <SelectBox
          :options="districtOptions"
          placeholder="구/군 선택"
          v-model="selectedDistrict"
          :key="selectedRegion"
        />
      </div>
      <SingleTagFilter class="single-tag-filter" :tags="sortOptions" v-model="selectedSort" />
    </div>

    <!-- Search Bar -->
    <div class="search-container">
      <SearchBar label="캠핑장 검색하기" @search="onSearch" v-model="searchQuery" />
      <ButtonDark class="search-button" @click.capture="onSearch" label="검색" />
    </div>

    <!-- Campsite Grid -->
    <div class="campsite-grid">
      <CampsiteCardGrid
      v-if="campings.length > 0"
        :campings="campings"
        :total-pages="totalPages"
        :current-page="currentPage"
        @change-page="fetchCampings"/>
      <p v-else class="no-results">검색 결과가 없습니다.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { getCampsites } from '@/api/campsiteApi.js';
import { getSidos, getGuguns } from '@/api/sidogugunApi.js';
import SearchBar from '@/components/search/SearchBar.vue';
import SelectBox from '@/components/filter/SelectBox.vue';
import SingleTagFilter from '@/components/filter/SingleTagFilter.vue';
import CampsiteCardGrid from '@/layout/grid/CampsiteCardGrid.vue';
import ButtonDark from '@/components/button/ButtonDark.vue';

// 상태 관리
const searchQuery = ref('');
const selectedRegion = ref('');
const selectedDistrict = ref('');
const selectedSort = ref('이름순'); // 기본값 설정

const regionOptions = ref([]);
const districtOptions = ref([]);
const sortOptions = ref(['이름순', '리뷰많은순']);

const campings = ref([]); // 캠핑장 목록 데이터
const currentPage = ref(1);
const itemsPerPage = 9;
const totalItems = ref(0);
const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage));
``
// 정렬 기준을 API 파라미터로 변환
const getSortParams = (sortValue) => {
  switch(sortValue) {
    case '이름순':
      return { order: 'name', sort: 'asc' };
    case '리뷰많은순':
      return { order: 'review_cnt', sort: 'desc' };
    default:
      return { order: 'id', sort: 'asc'};
  }
};

// 캠핑장 데이터를 API에서 가져오는 함수
const fetchCampings = async (page = 1) => {
  currentPage.value = page;
  try {
    const { order, sort } = getSortParams(selectedSort.value);
    const response = await getCampsites({
      keyword: searchQuery.value,
      sido: selectedRegion.value,
      gugun: selectedDistrict.value,
      pageNo: page,
      pageCnt: itemsPerPage,
      order: order,
      sort: sort
  });
    campings.value = response.data.result;
    totalItems.value = response.data.totalCount;
  } catch (error) {
    console.error("캠핑장 데이터를 불러오는 중 오류가 발생했습니다:", error);
  }
};

// 시/도 리스트를 API로부터 불러오는 함수
const fetchRegionOptions = async () => {
  try {
    const response = await getSidos();
    regionOptions.value = response.data.result.map(sido => ({
      value: sido.sidoCode,
      label: sido.sidoName
    }));
  } catch (error) {
    console.error("시/도 데이터를 불러오는 중 오류가 발생했습니다:", error);
  }
};

// 구/군 리스트를 API로부터 불러오는 함수
const fetchDistrictOptions = async (sidoCode) => {
  try {
    const response = await getGuguns(sidoCode);
    districtOptions.value = response.data.result.map(gugun => ({
      value: gugun.gugunCode,
      label: gugun.gugunName
    }));
  } catch (error) {
    console.error("구/군 데이터를 불러오는 중 오류가 발생했습니다:", error);
  }
};

// 지역 선택 시 구/군 리스트를 업데이트
const onRegionChange = async (value) => {
  selectedDistrict.value = ''; // 구/군 선택값 초기화
  districtOptions.value = []; // 구/군 리스트 초기화

  if (value) {
    await fetchDistrictOptions(value);
  }
};

// watch를 사용하여 selectedRegion이 빈 값일 때 처리
watch(selectedRegion, (newValue) => {
  if (!newValue) {
    selectedDistrict.value = '';
    districtOptions.value = [];
  }
});

// 검색 버튼 클릭 시 호출되는 함수
const onSearch = () => {
  currentPage.value = 1; // 검색 시 페이지 초기화
  fetchCampings(1);
};

// 컴포넌트가 마운트될 때 시/도 데이터를 로드하고 캠핑장 데이터를 로드
onMounted(() => {
  fetchRegionOptions();
  fetchCampings();
});
</script>

<style scoped>
.view-campsites {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  position: relative;
  overflow: hidden;
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

.no-results {
  text-align: center;
  font-size: 1rem;
  color: #777;
  margin-top: 100px;
}
</style>
