<template>
    <div class="slider-container">

        <!-- 현재 슬라이드 -->
        <div class="slider" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
            <div class="slide" v-for="(image, index) in images" :key="index">
                <img :src="image" :alt="`slide-${index + 1}`" />
            </div>
        </div>

        <!-- 인디케이터 -->
        <div class="indicators">
            <span v-for="(image, index) in images" :key="index" :class="{ active: currentIndex === index }"
                @click="goToSlide(index)"></span>
        </div>
    </div>
</template>

<script>
import { ref, watch, computed, onMounted, onUnmounted } from 'vue';

export default {
    props: {
        images: {
            type: Array,
            required: true,
            validator: (value) => value.length > 0,
        },
        interval: {
            type: Number,
            default: 5000, // 기본 간격 5초
        },
    },
    setup(props) {
        const currentIndex = ref(0);
        let timer = null;

        const nextSlide = () => {
            currentIndex.value = (currentIndex.value + 1) % props.images.length;
        };

        const prevImage = computed(() => {
            const prevIndex = currentIndex.value === 0 ? props.images.length - 1 : currentIndex.value - 1;
            return props.images[prevIndex];
        });

        const nextImage = computed(() => {
            const nextIndex = (currentIndex.value + 1) % props.images.length;
            return props.images[nextIndex];
        });

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
            stopSlider(); // 클릭 시 자동 슬라이드 멈춤
            startSlider(); // 클릭 후 다시 슬라이더 시작
        };

        onMounted(startSlider);
        onUnmounted(stopSlider);

        // props의 interval 값이 변경될 때마다 슬라이더를 재시작
        watch(() => props.interval, (newInterval) => {
            stopSlider();
            startSlider();
        });

        return { currentIndex, goToSlide, prevImage, nextImage };
    },
};
</script>

<style scoped>
.slider-container {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    max-width: 1100px !important;
    margin: auto;
    overflow: visible;
    gap: 20px;
    padding: 0 !important;
    box-sizing: border-box;

}

.slider {
    display: flex;
    transition: transform 0.5s ease;
    width: 60%; /* 중앙 슬라이드 넓이 */
}

.slide {
    min-width: 100%;
    opacity: 1;
    transition: opacity 0.5s ease;
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
</style>
