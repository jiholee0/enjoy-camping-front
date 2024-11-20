<template>
  <div class="slider-container">
    <div
      class="slider"
      :style="{
        transform: `translateX(-${(currentIndex + 1) * 100}%)`,
        transition: isLooping ? 'none' : 'transform 0.5s ease',
      }"
      @transitionend="handleTransitionEnd"
    >
      <div class="slide" :class="getSlideClass(images.length - 1)">
        <img :src="images[images.length - 1]" alt="last-image" />
      </div>
      <div
        v-for="(image, index) in images"
        :key="index"
        class="slide"
        :class="getSlideClass(index)"
      >
        <img :src="image" :alt="`slide-${index + 1}`" />
      </div>
      <div class="slide" :class="getSlideClass(0)">
        <img :src="images[0]" alt="first-image" />
      </div>
    </div>

    <div class="indicators">
      <span
        v-for="(image, index) in images"
        :key="index"
        :class="{ active: currentIndex === index }"
        @click="goToSlide(index)"
      ></span>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  images: {
    type: Array,
    required: true,
    validator: (value) => value.length > 0,
  },
  interval: {
    type: Number,
    default: 5000,
  },
});

const currentIndex = ref(0);
const isLooping = ref(false);
let timer = null;

const prevSlideIndex = computed(() =>
  currentIndex.value === 0 ? props.images.length - 1 : currentIndex.value - 1
);
const nextSlideIndex = computed(() =>
  currentIndex.value === props.images.length - 1 ? 0 : currentIndex.value + 1
);

const getSlideClass = (index) => ({
  'current-slide': currentIndex.value === index,
  'prev-slide': prevSlideIndex.value === index,
  'next-slide': nextSlideIndex.value === index,
});

const nextSlide = () => {
  if (currentIndex.value === props.images.length - 1) {
    isLooping.value = true;
    currentIndex.value = -1;
    setTimeout(() => {
      isLooping.value = false;
      currentIndex.value = 0;
    }, 1);
  } else {
    currentIndex.value += 1;
  }
};

const startSlider = () => {
  timer = setInterval(nextSlide, props.interval);
};

const stopSlider = () => {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
};

const goToSlide = (index) => {
  currentIndex.value = index;
  stopSlider();
  startSlider();
};

const handleTransitionEnd = () => {
  if (isLooping.value) {
    isLooping.value = false;
  }
};

const preloadImages = () => {
  props.images.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
};

onMounted(() => {
  preloadImages();
  startSlider();
});

onUnmounted(stopSlider);

watch(() => props.interval, () => {
  stopSlider();
  startSlider();
});
</script>

<style scoped>
.slider-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 30px 0px !important;
  overflow: hidden;
  gap: 20px;
  padding: 0 !important;
  box-sizing: border-box;
}

.slider {
  display: flex;
  width: 60%;
}

.slide {
  min-width: 100%;
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.slide img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
}

.indicators {
  position: absolute;
  bottom: 10px;
  display: flex;
  justify-content: center;
  gap: 8px;
}

.indicators span {
  width: 10px;
  height: 10px;
  background-color: #ddd;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s;
}

.indicators span.active {
  background-color: #333;
}

.current-slide {
  transform: scale(1);
  opacity: 1;
}

.prev-slide,
.next-slide {
  transform: scale(0.9);
  opacity: 0.5;
}
</style>
