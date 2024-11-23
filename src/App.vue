<script setup>
import { provide, ref } from "vue";
import Header from "@/layout/structure/AppHeader.vue";
import Footer from "@/layout/structure/AppFooter.vue";
import ScrollContainer from "./components/scroll/ScrollContainer.vue";

const isLoggedIn = ref(false); // 초기 로그인 상태
const isLoginModalOpen = ref(false);
const isSignupModalOpen = ref(false);

provide('isLoggedIn', isLoggedIn);
provide('isLoginModalOpen', isLoginModalOpen);
provide('isSignupModalOpen', isSignupModalOpen);

</script>

<template>
  <div class="app">
    <Header />
    <main class="main-content">
      <router-view />
    </main>
    <ScrollContainer />
    <Footer />

  </div>

</template>

<style>
.app-container {
  min-width: 800px;
  /* 최소 너비 설정 */
  min-height: 600px;
  /* 최소 높이 설정 */
  overflow: auto;
  /* 최소 크기보다 작아지면 스크롤 허용 */
}

/* 스크롤바 꾸미기 */
body::-webkit-scrollbar {
  width: 8px;
  /* 스크롤바의 너비 */
  height: 8px;
  /* 스크롤바의 높이 (가로 스크롤의 경우) */
}

body::-webkit-scrollbar-thumb {
  background-color: #81c3d7;
  /* 스크롤바의 색상 */
  border-radius: 4px;
  /* 스크롤바 모서리를 둥글게 */
}

body::-webkit-scrollbar-thumb:hover {
  background-color: #2f6690;
  /* 호버 시 스크롤바 색상 */
}

body::-webkit-scrollbar-track {
  background-color: #f4f4f4;
  /* 스크롤바 트랙의 색상 */
  border-radius: 4px;
  /* 스크롤바 트랙 모서리를 둥글게 */
}

body::-webkit-scrollbar-track:hover {
  background-color: #e0e0e0;
  /* 호버 시 스크롤바 트랙 색상 */
}

.main-content {
  margin: 0 auto;
  padding-top: 70px !important;
  flex: 1;
  min-height: 80vh;
}

#app {
  min-width: 1000px;
  font-weight: normal;
}

body {
  font-family: "Noto Sans KR", sans-serif;
  min-width: 1000px;
  height: 100%;
}

a {
  text-decoration: none;
  color: #2f6690;
  transition: 0.4s;
  padding: 4px;
}

a:hover {
  color: #81c3d7 !important;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  font-weight: normal;
}
</style>
