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
    <TabMenu class="tab-menu" :tabs="tabs" :reviewData="reviewData" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import DetailInfo from '@/layout/detail/DetailInfo.vue';
import PlaceMap from '@/components/map/PlaceMap.vue';
import AttractionCardGrid from '@/layout/grid/AttractionCardGrid.vue';
import TabMenu from '@/components/tab/TabMenu.vue';
import ReviewCard2List from '@/layout/list/ReviewCard2List.vue';
import { getCampsiteDetail } from '@/api/campsiteApi';

// 탭 및 리뷰 데이터 설정
const tabs = ref([
  { name: 'tourist', label: '주변 관광지', component: AttractionCardGrid },
  { name: 'camping', label: '캠핑장 리뷰', component: ReviewCard2List },
]);

const reviewData = ref([
  { id: 1, title: '제목1', content: '훌륭한 캠핑장이었습니다!', date: '2024-11-05 17:22' },
  { id: 2, title: '제목2', content: '깨끗하고 편안한 캠핑장이었어요.', date: '2024-11-05 17:22' },
  { id: 3, title: '제목3', content: '괜찮지만 약간 시끄러웠어요.', date: '2024-11-05 17:22' },
  // 더 많은 리뷰 데이터...
]);

// 라우터에서 전달된 query 데이터 가져오기
const route = useRoute();

// 상태 변수 정의
const name = ref('');
const addr = ref('');
const description = ref('');
const tel = ref('');
const link = ref('');
const image = ref('');
const latitude = ref(0); // 기본값 설정
const longitude = ref(0); // 기본값 설정

// 데이터 업데이트 시점에 따라 reactivity 추가
onMounted(async() => {
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
  } catch (error) {
    console.error('Failed to fetch detail data:', error);
  }
});

// 이미지 에러 핸들러
const handleImageError = (event) => {
  image.value = '';
  event.target.src = '';
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
