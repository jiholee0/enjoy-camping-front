<template>
  <div class="review-list">
    <ul>
      <li v-for="review in reviews" :key="review.id" class="review-item">
        <ReviewCard
          :name="review.name"
          :rating="review.rating"
          :content="review.content"
          :image="review.image"
          :id="review.id"
        />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import ReviewCard from '@/components/ReviewCard.vue';

defineProps({
  reviews: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
.review-list {
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 16px;
}

li {
  width: calc(33.333% - 16px); /* 3개 카드가 한 줄에 들어가도록 설정 */
}
</style>
