<template>
  <div class="review-list2">
    <div class="pagination">
      <ButtonLight class="button" @click.capture="prevPage" :disabled="currentPage === 1" label="이전" />
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <ButtonLight class="button" @click.capture="nextPage" :disabled="currentPage === totalPages" label="다음" />
    </div>
    <div v-if="reviews.length > 0" class="review-card-list">
    <ReviewCard2
      v-for="review in paginatedReviews"
      :key="review.id"
      :title="review.title"
      :content="review.displayContent"
      :date="review.createdAt"
      :campsiteId="review.campingId"
      :reviewId="review.id"
    />
    </div>
    <p v-else class="no-results">작성한 리뷰가 없습니다.</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import ReviewCard2 from '@/components/card/ReviewCard2.vue';
import ButtonLight from '@/components/button/ButtonLight.vue';

const props = defineProps({
  reviews: {
    type: Array,
    required: true,
    default: () => [],
  },
});
const currentPage = ref(1);
const itemsPerPage = ref(5);

const totalPages = computed(() => Math.ceil(props.reviews.length / itemsPerPage.value));

const paginatedReviews = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;

  return props.reviews.slice(start, end).map((review) => ({
    ...review,
    displayContent: review.content.length > 100
      ? review.content.slice(0, 100) + '...'
      : review.content,
  }));
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};
</script>

<style scoped>
.review-card-list,
.review-list2 {
  gap: 16px;
  width: 700px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-self: flex-start !important;
  font-size: 0.8rem;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
}

.button {
  margin-right: 0px !important;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
.no-results {
  text-align: center;
  font-size: 0.9rem;
  color: #777;
}
</style>
