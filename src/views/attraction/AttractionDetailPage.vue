<template>
  <div class="detail-page">
    <div class="image-container">
      <img v-if="image" :src="image" alt="관광지 이미지" class="background-image" />
      <DetailInfo
        :name="title"
        :description="overview"
        :tel="tel"
        :addr="address"
        :link="homepage"
        class="detail-info-overlay"
      />
    </div>
    <div class="map-container">
      <div class="map-title">위치 정보</div>
      <div class="map">
        <PlaceMap :latitude="latitude" :longitude="longitude" />
      </div>
    </div>
    <TabMenu class="tab-menu" :tabs="tabs" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import DetailInfo from '@/layout/detail/DetailInfo.vue';
import PlaceMap from '@/components/map/PlaceMap.vue';
import CampsiteCardGrid from '@/layout/grid/CampsiteCardGrid.vue';
import TabMenu from '@/components/tab/TabMenu.vue';
import { getAttractionDetail } from '@/api/attractionApi';

const tabs = ref([
  { name: 'tourist', label: '주변 캠핑장', component: CampsiteCardGrid },
]);

const route = useRoute();

// 상태 변수 정의
const title = ref('');
const address = ref('');
const overview = ref('');
const tel = ref('');
const homepage = ref('');
const image = ref('');
const latitude = ref(37.499613); // 기본값 설정
const longitude = ref(127.036431); // 기본값 설정

onMounted(async () => {
  try {
    const id = route.params.id; // 경로에서 id 가져오기
    const response = await getAttractionDetail(id); // API 호출
    const data = response.data.result;

    // 응답 데이터를 상태 변수에 설정
    title.value = data.title || '';
    address.value = data.addr1 + data.addr2 || '';
    overview.value = data.overview || '';
    tel.value = data.tel || '';
    homepage.value = data.homepage || '';
    image.value = data.firstImage1 || data.firstImage2 || '';
    latitude.value = data.latitude || 0;
    longitude.value = data.longitude || 0;
  } catch (error) {
    console.error('Failed to fetch detail data:', error);
  }
});
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
  height: auto;
  max-width: 1000px;
  object-fit: cover;
  object-position: center;
}

.detail-info-overlay {
  position: absolute;
  width: 90%;
  max-width: 1000px;
  height: 50%;
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
  align-self: left;
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
