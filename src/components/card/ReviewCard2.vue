<template>
  <div class="review-card2" @click="navigateToReview">
    <div class="card-content">
      <h3 class="card-title">{{ title }}</h3>
      <div class="card-body" v-html="truncateContent(content)"></div>
    </div>
    <div class="card-footer">
      <span class="card-date">{{ formatDate(date) }}</span>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  campsiteId: {
    type: Number,
    required: true,
  },
  reviewId: {
    type: Number,
    required: true,
  },
});

const router = useRouter();

// 리뷰 페이지로 이동하는 함수
const navigateToReview = () => {
  router.push({
    name: 'ViewReviewPage',
    query: {
      campsiteId : props.campsiteId,
      reviewId : props.reviewId,
    },
  });
};

// 날짜 포맷팅 함수
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }).format(date);
};

const truncateContent = (content) => {
  if (!content) return '';
  // HTML 파싱
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, 'text/html');
  const textContent = doc.body.textContent || '';

  // 100자 제한 후 HTML 유지
  const truncatedText = textContent.length > 100 ? textContent.substring(0, 100) + '...' : textContent;
  return truncatedText;
};
</script>

<style scoped>
.review-card2 {
  padding: 16px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s;
  cursor: pointer;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.review-card2:hover {
  transform: translateY(-5px);
  box-shadow: 0px 6px 15px rgba(0, 118, 182, 0.3);
  transition: box-shadow 0.3s ease-in-out;
}

.card-title {
  font-weight: bold;
  padding-bottom: 3px;
}

.card-body {
  color: #666;
}

.card-footer {
  text-align: right;
  font-size: 0.6rem;
  color: #999;
}
</style>
