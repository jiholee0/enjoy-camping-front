<template>
  <div class="viewAttractions">
    <!-- Filters Container -->
    <div class="filters-container">
      <MultiTagFilter :tags="tags" v-model="selectedTags" />
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
    </div>

    <!-- Search Bar with Search Button -->
    <div class="search-container">
      <SearchBar label="관광지 검색하기" @search="onSearch" v-model="searchQuery" />
      <ButtonDark class="search-button" @click.capture="onSearch" label="검색"/>
    </div>

    <!-- Tourist Site Grid -->
    <div class="attraction-grid">
      <AttractionCardGrid
      v-if="attractions.length > 0"
        :attractions="attractions"
        :total-pages="totalPages"
        :current-page="currentPage"
        @change-page="fetchAttractions" />
        <p v-else class="no-results">검색 결과가 없습니다.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { getAttractions } from '@/api/attractionApi.js';
import { getSidos, getGuguns } from '@/api/sidogugunApi.js';
import { getContentTypes } from '@/api/contentTypeApi.js';
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

const tags = ref([]);
const regionOptions = ref([]);
const districtOptions = ref([]);

const attractions = ref([]); // 관광지 목록 데이터
const currentPage = ref(1);
const itemsPerPage = 9;
const totalItems = ref(0);
const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage));

// 페이지에 따른 관광지 데이터를 API에서 가져오는 함수
const fetchAttractions = async (page = 1) => {
  currentPage.value = page;
  try {
    const response = await getAttractions({
      keyword: searchQuery.value,
      sido: selectedRegion.value,
      gugun: selectedDistrict.value,
      contentTypes: selectedTags.value,
      pageNo: page,
      pageCnt: itemsPerPage,
    });
    attractions.value = response.data.result;
    totalItems.value = response.data.totalCount;
  } catch (error) {
    console.error("관광지 데이터를 불러오는 중 오류가 발생했습니다:", error);
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

// tags 데이터를 API에서 불러오는 함수
const fetchContentTypes = async () => {
  try {
    const response = await getContentTypes();
    tags.value = response.data.result.map(contentType => ({
      value: contentType.id,
      label: contentType.name
    }));
  } catch (error) {
    console.error("콘텐츠 유형 데이터를 불러오는 중 오류가 발생했습니다:", error);
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

// 검색 버튼 클릭 시 호출되는 함수
const onSearch = () => {
  currentPage.value = 1; // 검색 시 페이지 초기화
  fetchAttractions(1);
};

// 컴포넌트가 마운트될 때 관광지 데이터를 로드
onMounted(() => {
  fetchContentTypes();
  fetchRegionOptions();
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

.no-results {
  text-align: center;
  font-size: 1rem;
  color: #777;
  margin-top: 100px;
}
</style>
