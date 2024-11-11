<template>
  <div class="detail-page">
    <div class="image-container">
      <img src="/images/CampingExampleImage.png" alt="캠핑장 이미지" class="background-image" />
      <DetailInfo
        name="홍승찬 캠핑장"
        description="홍승찬 사장님이 운영하는 캠핑장"
        tel="010-0000-0000"
        addr="역삼 테헤란로 멀티캠퍼스"
        link="https://www.example.com"
        class="detail-info-overlay"
      />
    </div>
    <div class="map-container">
      <div class="map-title">위치 정보</div>
      <div class="map">
        <PlaceMap :latitude="37.499613" :longitude="127.036431" />
      </div>
    </div>
    <TabMenu class="tab-menu" :tabs="tabs" :reviewData="reviewData" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import DetailInfo from '@/components/DetailInfo.vue';
import PlaceMap from '@/components/PlaceMap.vue';
import CampsiteCardGrid from '@/layout/CampsiteCardGrid.vue';
import TabMenu from '@/components/TabMenu.vue';
import ReviewCard2List from '@/layout/ReviewCard2List.vue';

const tabs = ref([
  { name: 'tourist', label: '주변 관광지', component: CampsiteCardGrid },
  { name: 'camping', label: '캠핑장 리뷰', component: ReviewCard2List },
]);

const reviewData = ref([
{ id: 1, title: '제목1', content: '훌륭한 캠핑장이었습니다!', date: '2024-11-05 17:22' },
  { id: 2, title: '제목2', content: '깨끗하고 편안한 캠핑장이었어요.깨끗하고 편안한 캠핑장이었어요.깨끗하고 편안한 캠핑장이었어요.깨끗하고 편안한 캠핑장이었어요.깨끗하고 편안한 캠핑장이었어요.깨끗하고 편안한 캠핑장이었어요.깨끗하고 편안한 캠핑장이었어요.깨끗하고 편안한 캠핑장이었어요.깨끗하고 편안한 캠핑장이었어요.깨끗하고 편안한 캠핑장이었어요.깨끗하고 편안한 캠핑장이었어요.깨끗하고 편안한 캠핑장이었어요.깨끗하고 편안한 캠핑장이었어요.깨끗하고 편안한 캠핑장이었어요.깨끗하고 편안한 캠핑장이었어요.깨끗하고 편안한 캠핑장이었어요.깨끗하고 편안한 캠핑장이었어요.깨끗하고 편안한 캠핑장이었어요.깨끗하고 편안한 캠핑장이었어요.깨끗하고 편안한 캠핑장이었어요.깨끗하고 편안한 캠핑장이었어요.깨끗하고 편안한 캠핑장이었어요.깨끗하고 편안한 캠핑장이었어요.깨끗하고 편안한 캠핑장이었어요.깨끗하고 편안한 캠핑장이었어요.깨끗하고 편안한 캠핑장이었어요.깨끗하고 편안한 캠핑장이었어요.깨끗하고 편안한 캠핑장이었어요.깨끗하고 편안한 캠핑장이었어요.깨끗하고 편안한 캠핑장이었어요.깨끗하고 편안한 캠핑장이었어요.깨끗하고 편안한 캠핑장이었어요.깨끗하고 편안한 캠핑장이었어요.깨끗하고 편안한 캠핑장이었어요.', date: '2024-11-05 17:22' },
  { id: 3, title: '제목3', content: '괜찮지만 약간 시끄러웠어요.', date: '2024-11-05 17:22' },
  { id: 4, title: '제목4', content: '훌륭한 캠핑장이었습니다!', date: '2024-11-05 17:22' },
  { id: 5, title: '제목5', content: '깨끗하고 편안한 캠핑장이었어요.', date: '2024-11-05 17:22' },
  { id: 6, title: '제목6', content: '괜찮지만 약간 시끄러웠어요.', date: '2024-11-05 17:22' },
  { id: 7, title: '제목7', content: '훌륭한 캠핑장이었습니다!', date: '2024-11-05 17:22' },
  { id: 8, title: '제목8', content: '깨끗하고 편안한 캠핑장이었어요.', date: '2024-11-05 17:22' },
  { id: 9, title: '제목9', content: '괜찮지만 약간 시끄러웠어요.', date: '2024-11-05 17:22' },
]);
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
