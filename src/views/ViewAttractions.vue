<template>
  <div class="viewAttractions">
    <!-- Search Bar with Search Button -->
    <div class="search-container">
      <SearchBar label="캠핑장 검색하기" />
      <ButtonDark class="search-button" @click.capture="onSearch">검색</ButtonDark>
    </div>

    <!-- Filters Container -->
    <div class="filters-container">
      <MultiTagFilter :tags="tags" />
      <div class="select-group">
        <SelectBox :options="regionOptions" placeholder="시/도 선택" />
        <SelectBox :options="districtOptions" placeholder="구/군 선택" />
      </div>
    </div>

    <!-- Tourist Site Grid -->
    <div class="attraction-grid">
      <AttractionCardGrid />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import SearchBar from '@/components/component/SearchBar.vue';
import SelectBox from '@/components/component/SelectBox.vue';
import MultiTagFilter from '@/components/component/MultiTagFilter.vue';
import AttractionCardGrid from '@/components/layout/AttractionCardGrid.vue';
import ButtonDark from '@/components/component/ButtonDark.vue';

export default defineComponent({
  name: 'ViewAttractions',
  components: {
    SearchBar,
    SelectBox,
    MultiTagFilter,
    AttractionCardGrid,
    ButtonDark
  },
  data() {
    return {
      tags: ['관광지', '문화시설', '축제공연행사', '여행코스', '레포츠', '숙박', '쇼핑', '음식점'],
      regionOptions: [
        { value: 'seoul', label: '서울특별시' },
        { value: 'busan', label: '부산광역시' },
      ],
      districtOptions: [
        { value: 'nowon', label: '노원구' },
        { value: 'gangnam', label: '강남구' },
      ],
      showFilters: true, // 필터가 항상 표시되도록 설정
    };
  },
  methods: {
    onSearch() {
    },
  },
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
  margin-bottom: 24px;
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
