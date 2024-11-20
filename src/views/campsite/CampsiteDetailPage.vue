<template>
  <div class="detail-page">
    <div class="image-container" :class="{ 'no-image': !image }">
      <template v-if="image">
        <img :src="image" alt="캠핑장 이미지" class="background-image" @error="handleImageError"/>
        <div class="gradient-overlay"></div>
      </template>
      <div v-else class="no-image-container"></div>

      <DetailInfo
        :name="name"
        :description="description"
        :tel="tel"
        :addr="addr"
        :link="link"
        class="detail-info-overlay"
      />
    </div>
    <div class="map-container" v-if="latitude !== 0 && longitude !== 0">
      <div class="map-title">위치 정보</div>
      <div class="map">
        <PlaceMap :latitude="latitude" :longitude="longitude" />
      </div>
    </div>
    <TabMenu
    class="tab-menu"
    :tabs="tabs"
    @change-page="handlePageChange"/>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, markRaw, computed } from 'vue';
import { useRoute } from 'vue-router';
import DetailInfo from '@/layout/detail/DetailInfo.vue';
import PlaceMap from '@/components/map/PlaceMap.vue';
import AttractionCardGrid from '@/layout/grid/AttractionCardGrid.vue';
import TabMenu from '@/components/tab/TabMenu.vue';
import ReviewCard2List from '@/layout/list/ReviewCard2List.vue';
import { getCampsiteDetail } from '@/api/campsiteApi';
import { getNearByCampsite } from '@/api/attractionApi';
import { getReviewByCampsite } from '@/api/reviewApi'; // 리뷰 API 추가

// tabs 배열 초기화
const tabs = ref([]);

// 상태 변수 정의
const name = ref('');
const addr = ref('');
const description = ref('');
const tel = ref('');
const link = ref('');
const image = ref('');
const latitude = ref(0); // 기본값 설정
const longitude = ref(0); // 기본값 설정

const nearbyCampsite = ref([]);
const reviewData = ref([]);
const currentPage = ref(1);
const itemsPerPage = 9;
const totalItems = ref(0);
const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage));
const order = ref('distance');
const sort = ref('asc');

watch(
  [nearbyCampsite, reviewData, currentPage, totalPages],
  () => {
    tabs.value = [
      {
        name: 'attractions',
        label: '주변 관광지',
        component: markRaw(AttractionCardGrid),
        props: {
          attractions: nearbyCampsite.value, // 주변 캠핑장 데이터
          totalPages: totalPages.value,
          currentPage: currentPage.value, // 현재 페이지 번호
        },
      },
      {
        name: 'reviews',
        label: '캠핑장 리뷰',
        component: markRaw(ReviewCard2List),
        props: {
          reviews: reviewData.value,
        },
      },
    ];
  },
  { immediate: true, deep: true }
);

const route = useRoute();

// 데이터 업데이트 시점에 따라 reactivity 추가
onMounted(async () => {
  try {
    const id = route.params.id; // 경로에서 id 가져오기
    const response = await getCampsiteDetail(id); // API 호출
    const data = response.data.result;

    // 응답 데이터를 상태 변수에 설정
    name.value = data.name || '';
    addr.value = data.detailAddress || '';
    description.value = data.introduction || '';
    tel.value = data.telephone || '';
    link.value = data.homepageUrl || '';
    image.value = data.imageUrl || '';
    latitude.value = data.latitude || 0;
    longitude.value = data.longitude || 0;

    await Promise.all([fetchNearByCampsite(id), fetchCampsiteReviews(id)]);
  } catch (error) {
    console.error('Failed to fetch detail data:', error);
  }
});

// 주변 관광지 데이터를 가져오는 함수
const fetchNearByCampsite = async (id) => {
  try {
    const response = await getNearByCampsite(
      id,
      currentPage.value,
      itemsPerPage,
      order.value,
      sort.value
    );
    nearbyCampsite.value = response.data.result || [];
    totalItems.value = response.data.totalCount || 0;
  } catch (error) {
    console.error('Failed to fetch nearby campsites:', error);
    nearbyCampsite.value = [];
    throw error;
  }
};

// 리뷰 데이터를 가져오는 함수
const fetchCampsiteReviews = async (id) => {
  try {
    const response = await getReviewByCampsite(id); // 리뷰 API 호출
    reviewData.value = response.data.result || [];
  } catch (error) {
    console.error('Failed to fetch reviews:', error);
    reviewData.value = [];
    throw error;
  }
};

// 이미지 에러 핸들러
const handleImageError = (event) => {
  image.value = '';
  event.target.src = '';
};

// 페이지 변경 핸들러
const handlePageChange = (newPage) => {
  if (newPage !== currentPage.value) {
    currentPage.value = newPage;
    fetchNearByCampsite(route.params.id); // 페이지 변경 시 데이터 다시 가져오기
  }
};
</script>


<style scoped>
.detail-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
}

.image-container {
  position: relative;
  width: 90%;
  height: 400px;
  max-width: 1000px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.gradient-overlay {
  position: absolute;
  inset: 0;
  width: 100%;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    transparent 50%,
    rgba(249, 255, 251, 0.9) 100%
  );
}

.no-image-container {
  height: 0;
}

.detail-info-overlay {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 1.5rem;
  border-radius: 0.5rem;
  background: linear-gradient(
    to top,
    rgba(249, 255, 251, 1) 0%,
    rgba(249, 255, 251, 0.9) 40%,
    rgba(249, 255, 251, 0.6) 80%,
    transparent 100%
  );
}

.image-container.no-image {
  height: 200px;
}

.image-container.no-image .detail-info-overlay {
  position: relative;
  bottom: auto;
  margin-top: 20px;
  padding: 0 !important;
}

.map-container {
  width: 90%;
  height: 400px;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.map-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  padding-bottom: 20px;
  width: 100%;
  align-self: flex-start;
}

.map {
  width: 100%;
  max-width: 1000px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.map:hover {
  box-shadow: 0px 6px 15px #0076b630 !important;
  transition: box-shadow 0.3s ease-in-out !important;
}

.tab-menu {
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>
