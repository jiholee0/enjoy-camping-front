<template>
  <div class="detail-page">
    <div class="image-container">
      <template v-if="image">
        <img :src="image" alt="관광지 이미지" class="background-image" @error="handleImageError"/>
        <div class="gradient-overlay"></div>
      </template>
      <div v-else class="no-image-container"></div>

      <DetailInfo
        :name="title"
        :description="overview"
        :tel="tel"
        :addr="address"
        :link="homepage"
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
      @change-page="handlePageChange"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch, markRaw, computed } from 'vue';
import { useRoute } from 'vue-router';
import DetailInfo from '@/layout/detail/DetailInfo.vue';
import PlaceMap from '@/components/map/PlaceMap.vue';
import CampsiteCardGrid from '@/layout/grid/CampsiteCardGrid.vue';
import TabMenu from '@/components/tab/TabMenu.vue';
import { getAttractionDetail } from '@/api/attractionApi';
import { getNearByAttraction } from '@/api/campsiteApi';

// tabs 배열 초기화
const tabs = ref([]);

// 상태 변수 정의
const title = ref('');
const address = ref('');
const overview = ref('');
const tel = ref('');
const homepage = ref('');
const image = ref('');
const latitude = ref(0);
const longitude = ref(0);

const nearbyAttraction = ref([]);
const currentPage = ref(1);
const itemsPerPage = 9;
const totalItems = ref(0);
const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage));
const order = ref('distance');
const sort = ref('asc');

watch(
  [nearbyAttraction, currentPage, totalPages],
  () => {
    tabs.value = [
      {
        name: 'campsites',
        label: '주변 캠핑장',
        component: markRaw(CampsiteCardGrid),
        props: {
          campings: nearbyAttraction.value, // 주변 캠핑장 데이터
          totalPages: totalPages.value,
          currentPage: currentPage.value, // 현재 페이지 번호
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
    const response = await getAttractionDetail(id); // API 호출
    const data = response.data.result;

    // 응답 데이터를 상태 변수에 설정
    title.value = data.title || '';
    address.value = (data.addr1 + (data.addr2 || '')).trim() || '';
    overview.value = data.overview || '';
    tel.value = data.tel || '';
    homepage.value = data.homepage || '';
    image.value = data.firstImage1 || data.firstImage2 || '';
    latitude.value = data.latitude || 0;
    longitude.value = data.longitude || 0;

    await fetchNearByAttraction(id);
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
});

// 주변 캠핑장 데이터를 가져오는 함수
const fetchNearByAttraction = async (id) => {
  try {
    const response = await getNearByAttraction(
      id,
      currentPage.value,
      itemsPerPage,
      order.value,
      sort.value
    );
    nearbyAttraction.value = response.data.result || [];
    totalItems.value = response.data.totalCount || 0;
  } catch (error) {
    console.error('Failed to fetch nearby campsites:', error);
    nearbyAttraction.value = [];
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
    fetchNearByAttraction(route.params.id); // 페이지 변경 시 데이터 다시 가져오기
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
  width: 100%;
  height: 400px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.background-image {
  width: 90%;
  height: 100%;
  max-width: 1000px;
  object-fit: cover;
}

.gradient-overlay {
  position: absolute;
  inset: 0;
  width: 90%;
  max-width: 1000px;
  margin: 0 auto;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    transparent 50%,
    rgba(255, 255, 255, 0.9) 100%
  );
}

.no-image-container {
  height: 0;
}

.detail-info-overlay {
  position: absolute;
  bottom: 0;
  width: 90%;
  max-width: 1000px;
  padding: 1.5rem;
  border-radius: 0.5rem;
  background: linear-gradient(
    to top,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0.9) 40%,
    rgba(255, 255, 255, 0.6) 80%,
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
