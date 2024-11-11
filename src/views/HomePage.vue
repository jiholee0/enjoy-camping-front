<template>
  <div class="home">
    <ImageSlider
      class="imageSlider"
      :images="['/images/main(1).png', '/images/main(2).png', '/images/main(3).png']"
      :interval="5000"
    />

    <ButtonDark class="view-all-campsites" label="View All Campsites" @click="viewAll" />
    <div>
      <CampsiteCardGrid />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import CampsiteCardGrid from '@/layout/CampsiteCardGrid.vue';
import ButtonDark from '@/components/ButtonDark.vue';
import ImageSlider from '@/layout/ImageSlider.vue';

const router = useRouter();

const viewAll = () => {
  router.push('/viewCampsites');
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.view-all-campsites {
  margin: 25px;
}

.imageSlider {
  margin: 25px;
}
</style>
