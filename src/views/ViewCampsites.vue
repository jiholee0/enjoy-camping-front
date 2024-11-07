<template>
  <div class="viewCampsites">
    <!-- Search Bar -->
    <div class="search-container">
      <SearchBar label="캠핑장 검색하기" />
    </div>

    <!-- Filters Container -->
    <div class="filters-container">
      <div class="select-group">
        <SelectBox :options="regionOptions" placeholder="서울특별시" />
        <SelectBox :options="districtOptions" placeholder="노원구" />
      </div>
      <TagFilter :tags="sortOptions" />
    </div>

    <!-- Campsite Grid -->
    <div class="campsite-grid">
      <CampsiteCardGrid />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import SearchBar from '@/components/component/SearchBar.vue';
import SelectBox from '@/components/component/SelectBox.vue';
import TagFilter from '@/components/component/TagFilter.vue';
import CampsiteCardGrid from '@/components/layout/CampsiteCardGrid.vue';

export default defineComponent({
  name: 'ViewCampsites',
  components: {
    SearchBar,
    SelectBox,
    TagFilter,
    CampsiteCardGrid,
  },
  data() {
    return {
      regionOptions: [
        { value: 'seoul', label: '서울특별시' },
        { value: 'busan', label: '부산광역시' },
      ],
      districtOptions: [
        { value: 'nowon', label: '노원구' },
        { value: 'gangnam', label: '강남구' },
      ],
      sortOptions: ['이름순', '리뷰많은순'],
    };
  },
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
}

.filters-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px;
  max-width: 800px;
  margin-bottom: 24px;
}

.select-group {
  display: flex;
  gap: 8px;
}

</style>
