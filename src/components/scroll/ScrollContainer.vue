<!-- ScrollContainer.vue -->
<template>
  <div
    ref="container"
    class="scroll-container"
    :class="{ 'scrolling': isScrolling }"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <slot></slot>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const container = ref(null);
const isScrolling = ref(false);
let scrollTimer = null;
let mouseTimer = null;

const startScrolling = () => {
isScrolling.value = true;

if (scrollTimer) {
  clearTimeout(scrollTimer);
}

scrollTimer = setTimeout(() => {
  isScrolling.value = false;
}, 1000);
};

const handleScroll = () => {
startScrolling();
};

const handleMouseMove = () => {
startScrolling();
};

const handleMouseLeave = () => {
isScrolling.value = false;
};

onMounted(() => {
if (container.value) {
  container.value.addEventListener('scroll', handleScroll);
}
});

onBeforeUnmount(() => {
if (container.value) {
  container.value.removeEventListener('scroll', handleScroll);
}
if (scrollTimer) {
  clearTimeout(scrollTimer);
}
if (mouseTimer) {
  clearTimeout(mouseTimer);
}
});
</script>

<style scoped>
.scroll-container {
position: relative;
flex: 1;
overflow-y: auto;
overflow-x: hidden;
padding-top: 70px; /* padding을 사용해 헤더 아래로 위치 */
-ms-overflow-style: none;
scrollbar-width: none;
}

.scroll-container::-webkit-scrollbar {
display: none;
width: 8px;
}

/* 스크롤 중일 때만 스크롤바 보이기 */
.scroll-container.scrolling::-webkit-scrollbar {
display: block;
}

.scroll-container.scrolling::-webkit-scrollbar-thumb {
background-color: #81c3d7;
border-radius: 4px;
}

.scroll-container.scrolling::-webkit-scrollbar-thumb:hover {
background-color: #2f6690;
}

.scroll-container.scrolling::-webkit-scrollbar-track {
background-color: #f4f4f4;
border-radius: 4px;
}

.scroll-container.scrolling::-webkit-scrollbar-track:hover {
background-color: #e0e0e0;
}

:deep(.main-content) {
padding-top: 0 !important; /* 기존 패딩 제거 */
min-height: calc(100vh - 70px); /* 헤더 높이를 뺀 높이 설정 */
}
</style>
