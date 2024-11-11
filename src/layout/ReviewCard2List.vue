<template>
  <div class="review-list2">
    <div class="pagination">
      <ButtonLight class="button" @click="prevPage" :disabled="currentPage === 1" label="이전" />
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <ButtonLight class="button" @click="nextPage" :disabled="currentPage === totalPages" label="다음" />
    </div>
    <ReviewCard2
      v-for="review in paginatedReviews"
      :key="review.id"
      :title="review.title"
      :content="review.displayContent"
      :date="review.date"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import ReviewCard2 from '@/components/ReviewCard2.vue';
import ButtonLight from '@/components/ButtonLight.vue';

const props = defineProps({
  reviews: {
    type: Array,
    required: true,
  },
});

const currentPage = ref(1);
const itemsPerPage = ref(5);

const totalPages = computed(() => Math.ceil(props.reviews.length / itemsPerPage.value));

// Compute paginated reviews with truncated content if longer than 300 characters
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
</style>
