<template>
  <div class="card" @click="goToDetail">
    <div class="card-inner">
      <div class="image-container">
        <img :src="firstImage1 ? firstImage1 : NoImage" :alt="title" class="card-image" @error="handleImageError"/>
        <div class="gradient-overlay"></div>
        <div class="type-badge">
          {{ contentTypeName }}
        </div>
      </div>
      <div class="content-wrapper">
        <div class="card-content">
          <h3 class="card-title">{{ title }}</h3>
          <p class="card-address">
            <span class="location-icon">📍</span>
            {{ addr1 }} {{ addr2 }}
          </p>
          <p v-if="overview" class="card-intro">{{ overview }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';
import NoImage from '/images/NoImage.png';
import { getContentType } from '@/api/contentTypeApi';

const props = defineProps({
  title: String,
  addr1: String,
  addr2: String,
  overview: String,
  firstImage1: String,
  no: Number,
  contentTypeId: Number
});

const router = useRouter();
const contentTypeName = ref(''); // 초기값은 빈 문자열로 설정

onMounted(async () => {
  try {
    const response = await getContentType(props.contentTypeId);
    contentTypeName.value = response.data.result.name;
  } catch (error) {
    console.error('Failed to fetch content type name:', error);
    contentTypeName.value = '관광지'; // 오류 시 기본값 설정
  }
});

function goToDetail() {
  const routeName = 'Attraction' + 'DetailPage';
  router.push({
    name: routeName,
    params: { id: props.no },
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
}

.card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 12px 32px rgba(0, 118, 182, 0.25);
}

.card:hover .card-image {
  transform: scale(1.1);
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
}

.card:hover .content-wrapper {
  transform: translateY(-4px);
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
  width: 120%;
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
</style>
