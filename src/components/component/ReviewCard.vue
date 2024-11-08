<template>
  <div class="review-card" @click="goToDetail">
    <div class="card-content">
      <h3>{{ name }}</h3>
      <p class="review-rating">⭐ {{ rating }}</p>
      <p class="review-content">{{ content }}</p>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'ReviewCard',
  props: {
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();

    const goToDetail = () => {
      router.push({ name: 'DetailPage', params: { id: props.id } });
    };

    return {
      goToDetail,
    };
  },
});
</script>

<style scoped>
.review-card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s;
  cursor: pointer;
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 200px;
}

.review-card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 6px 15px rgba(0, 118, 182, 0.3);
  transition: box-shadow 0.3s ease-in-out;
}

.card-content {
  padding: 16px;
}

.card-content h3 {
  margin: 0;
  font-size: 1rem;
  color: #333;
}

.review-rating {
  font-size: 0.9rem;
  color: #f39c12;
}

.review-content {
  font-size: 0.8rem;
  color: #666;
}
</style>
