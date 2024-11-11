<template>
  <div class="review-list2">
    <div class="pagination">
      <ButtonLight class="button" @click="prevPage" :disabled="currentPage === 1" label="Previous"/>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <ButtonLight class="button" @click="nextPage" :disabled="currentPage === totalPages" label="Next"/>
    </div>
    <ReviewCard2
      v-for="review in paginatedReviews"
      :key="review.id"
      :title="review.title"
      :content="review.content"
      :date="review.date"
    />

  </div>
</template>

<script>
import ReviewCard2 from '@/components/component/ReviewCard2.vue';
import ButtonLight from '../component/ButtonLight.vue';

export default {
  name: 'ReviewList2',
  components: {
    ReviewCard2,
    ButtonLight
  },
  props: {
    reviews: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 5
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.reviews.length / this.itemsPerPage);
    },
    paginatedReviews() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.reviews.slice(start, end);
    }
  },
  methods: {
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    }
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
  align-self: flex-start;
}

.button {
  margin-right : 0px !important;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
