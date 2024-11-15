<script setup>
import Header from "@/layout/structure/AppHeader.vue";
import Footer from "@/layout/structure/AppFooter.vue";
</script>

<template>
  <div class="app">
    <Header />
    <main class="main-content">
      <router-view />
    </main>
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

.main-content {
  margin: 0 auto;
  padding: 70px !important;
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
