<template>
  <div class="home">
    <ImageSlider class="imageSlider" :images="['/images/main(1).png', '/images/main(2).png', '/images/main(3).png']"
      :interval="5000" />

    <ButtonDark class="view-all-campsites" label="View All Campsites" @click.capture="viewAll" />
    <div>
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
import { useRouter } from 'vue-router';
import { getCampsites } from '@/api/campsiteApi.js';
import CampsiteCardGrid from '@/layout/grid/CampsiteCardGrid.vue';
import ButtonDark from '@/components/button/ButtonDark.vue';
import ImageSlider from '@/layout/slider/ImageSlider.vue';

const router = useRouter();

const campings = ref([]); // 캠핑장 목록 데이터
const currentPage = ref(1);
const itemsPerPage = 9;
const totalItems = ref(0);
const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage));

// 페이지에 따른 캠핑장 데이터를 API에서 가져오는 함수
const fetchCampings = async (page = 1) => {
  currentPage.value = page;
  try {
    const response = await getCampsites({
      pageNo: page,
      pageCnt: itemsPerPage,
      order: 'id',
      sort: 'asc'
  });
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

const viewAll = () => {
  router.push('/viewCampsites');
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.view-all-campsites {
  margin: 25px;
}

.imageSlider {
  margin: 25px;
}
</style>
