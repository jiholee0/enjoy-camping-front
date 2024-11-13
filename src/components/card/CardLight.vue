<!-- Card.vue -->
<template>
  <div class="card" @click="goToDetail">
    <div class="image-wrapper">
      <img :src="imageUrl ? imageUrl : NoImage" alt="이미지" class="card-image" />
    </div>
    <div class="card-content">
      <h3>{{ name }}</h3>
      <p>{{ detailAddress }}</p>
      <p v-if="introduction">{{ introduction }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';
import NoImage from '/images/NoImage.png';

const props = defineProps({
  name: String,
  detailAddress: String,
  introduction: String,
  imageUrl: String,
  id: Number,
  type: String
});

const router = useRouter();

function goToDetail() {
  const routeName = props.type === 'attractions' ? 'AttractionDetailPage' : 'CampsiteDetailPage';

  router.push({
    name: routeName,
    params: {
      id: props.id.toString()
    },

    query: {
      name: props.name,
      detailAddress: props.detailAddress,
      introduction: props.introduction,
      imageUrl: props.imageUrl
    }
  });
}
</script>

<style scoped>
.card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 6px 15px #0076b630 !important;
  transition: box-shadow 0.3s ease-in-out !important;
}

.image-wrapper {
  height: 50%;
  overflow: hidden;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  align-self: center;
}

.card-content {
  padding: 20px;
}

.card-content h3 {
  font-weight: lighter;
  margin: 0;
  font-size: 0.9rem;
}

.card-content p {
  font-size: 0.6rem;
  margin: 5px 0;
  color: #666;
}
</style>
