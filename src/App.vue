<script setup>
import Header from './components/layout/AppHeader.vue'
import Footer from './components/layout/AppFooter.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Header />
    <main class="flex-grow main-content">
      <router-view></router-view>
    </main>
    <Footer />
  </div>
</template>


<style>
.app-container {
  min-width: 800px; /* 최소 너비 설정 */
  min-height: 600px; /* 최소 높이 설정 */
  overflow: auto; /* 최소 크기보다 작아지면 스크롤 허용 */
}

.main-content {
  margin: 0 auto;
  padding: 70px !important;
}


</style>
