<template>
  <div class="detail-page">
    <div class="image-container">
      <img src="/images/CampingExampleImage.png" alt="캠핑장 이미지" class="background-image" />
      <DetailInfo
        :name="name"
        :description=description
        :tel="tel || '010-0000-0000'"
        :address="address || '역삼 테헤란로 멀티캠퍼스'"
        :link="link || 'https://www.example.com'"
        class="detail-info-overlay"
      />
    </div>
    <div class="map-container">
      <div class="map-title">위치 정보</div>
      <div class="map">
        <PlaceMap :latitude="37.499613" :longitude="127.036431" />
      </div>
    </div>
    <TabMenu class="tab-menu" :tabs="tabs" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import DetailInfo from '@/components/DetailInfo.vue';
import PlaceMap from '@/components/PlaceMap.vue';
import CampsiteCardGrid from '@/layout/CampsiteCardGrid.vue';
import TabMenu from '@/components/TabMenu.vue';

const tabs = ref([
  { name: 'tourist', label: '주변 캠핑장', component: CampsiteCardGrid },
]);

const route = useRoute();

const name = route.query.name;
const address = route.query.address;
const description = route.query.description;
// const image = route.query.image;
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
