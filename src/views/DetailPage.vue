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
    <TabMenu class="tab-menu" :tabs="tabs" :reviewData="reviewData"/>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import DetailInfo from '@/components/component/DetailInfo.vue';
import PlaceMap from '@/components/component/PlaceMap.vue';
import CampsiteCardGrid from '@/components/layout/CampsiteCardGrid.vue';
import TabMenu from '@/components/component/TabMenu.vue';
import ReviewCardList from '@/components/layout/ReviewCardList.vue';

export default defineComponent({
  name: 'ViewAttractions',
  components: {
    DetailInfo,
    PlaceMap,
    TabMenu
  },
  data() {
    return {
      tabs: [
        { name: "tourist", label: "주변 관광지", component: CampsiteCardGrid },
        { name: "camping", label: "캠핑장 리뷰", component: ReviewCardList },
      ],
      reviewData: [
        { id: 1, name: '사용자1', rating: 4, content: '훌륭한 캠핑장이었습니다!' },
        { id: 2, name: '사용자2', rating: 5, content: '깨끗하고 편안한 캠핑장이었어요.' },
        { id: 3, name: '사용자3', rating: 3, content: '괜찮지만 약간 시끄러웠어요.' },
      ],
    };
  },
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
  height: 400px; /* 원하는 높이로 설정 */
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
  font-size: 24px;
  font-weight: bold;
  color: #333;
  padding-bottom: 20px;
  font-size: 1.2rem;
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
