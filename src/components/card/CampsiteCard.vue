<template>
  <div class="card" @click="goToDetail">
    <div class="card-inner">
      <div class="image-container">
        <img :src="imageUrl ? imageUrl : NoImage" :alt="name" class="card-image" @error="handleImageError"/>
        <div class="gradient-overlay"></div>
        <div class="type-badge">
          캠핑장
        </div>
        <div v-if="distance" class="distance-badge">
          {{ roundedDistance }} km
        </div>
        <div
          :class="distance ? 'review-badge-with-distance' : 'review-badge-alone'"
        >
          리뷰 {{ reviewCnt ? reviewCnt : 0 }}개
        </div>
      </div>
      <div class="content-wrapper">
        <div class="card-content">
          <h3 class="card-title">{{ name }}</h3>
          <p class="card-address">
            <span class="location-icon">📍</span>
            {{ detailAddress }}
          </p>
          <p v-if="introduction" class="card-intro">{{ introduction }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';
import { useRouter } from 'vue-router';
import NoImage from '/images/NoImage.png';

const props = defineProps({
  name: String,
  detailAddress: String,
  introduction: String,
  imageUrl: String,
  id: Number,
  distance: Number,
  reviewCnt: Number,
});

const roundedDistance = computed(() => {
  return props.distance ? Math.round(props.distance * 10) / 10 : null;
});

const router = useRouter();

function goToDetail() {
  const routeName = 'Campsite' + 'DetailPage';

  router.push({
    name: routeName,
    params: { id: props.id },
  });
}

// 이미지 에러 핸들러
const handleImageError = (event) => {
  event.target.src = NoImage; // 이미지 로드 실패 시 대체 이미지로 설정
};
</script>

<style scoped>
.card {
  position: relative;
  width: 100%;
  height: 320px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background-color: white;
  min-width: 200px;
}

.card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 12px 32px rgba(0, 118, 182, 0.25);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover .card-image {
  /* transform: translateY(-8px) scale(1.02); */
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover .gradient-overlay {
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.7) 40%,
    rgba(255, 255, 255, 0.95) 60%,
    rgba(255, 255, 255, 1) 80%,
    rgba(255, 255, 255, 1) 100%
  );
  transform: scale(1.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover .content-wrapper {
  transform: translateY(-4px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover .card-title {
  color: #1a365d;
}

.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
}

.image-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 20%,
    rgba(255, 255, 255, 0.4) 50%,
    rgba(255, 255, 255, 0.9) 60%,
    rgba(255, 255, 255, 0.95) 80%,
    rgba(255, 255, 255, 1) 100%
  );
}

.type-badge {
  position: absolute;
  top: 16px;
  right: 16px;
  padding: 6px 12px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 600;
  color: #2c5282;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.content-wrapper {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 20px;
  z-index: 2;
  transition: transform 0.4s ease;
}

.card-content {
  color: #333333;
}

.card-title {
  font-size: 0.9rem;
  font-weight: 700;
  margin: 0 0 8px 0;
  word-break: keep-all;
  line-height: 1.4;
  color: #1a202c;
  transition: color 0.3s ease;
}

.card-address {
  font-size: 0.7rem;
  margin: 0 0 8px 0;
  opacity: 0.9;
  display: flex;
  align-items: center;
  gap: 4px;
  color: #4a5568;
  word-break: keep-all;
  line-height: 1.3;
}

.location-icon {
  font-size: 0.8rem;
}

.card-intro {
  font-size: 0.65rem;
  margin: 0;
  color: #4a5568;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: keep-all;
  line-height: 1.3;
}

.distance-badge {
  position: absolute;
  top: 16px;
  left: 16px;
  padding: 6px 12px;
  background-color: rgba(66, 153, 225, 0.9); /* 파란색 배경 */
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 600;
  color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 3;
}

.review-badge-with-distance {
  position: absolute;
  top: 48px; /* distance-badge 아래로 위치 */
  left: 16px;
  padding: 6px 12px;
  background-color: rgba(255, 128, 128);
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 600;
  color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 3;
}

.review-badge-alone {
  position: absolute;
  top: 16px; /* distance-badge 없을 때 기본 위치 */
  left: 16px;
  padding: 6px 12px;
  background-color: rgba(255, 128, 128);
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 600;
  color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 3;
}
</style>
