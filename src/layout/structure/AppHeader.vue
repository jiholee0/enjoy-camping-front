<template>
  <header class="header">
    <div class="logo">
      <router-link to="/">
        <img src="/images/Logo.png" alt="logo" />
      </router-link>
    </div>
    <nav>
      <ul>
        <li :class="{ active: isActive('/') }">
          <router-link to="/">HOME</router-link>
        </li>
        <li :class="{ active: isActive('/viewCampsites') }">
          <router-link to="/viewCampsites">캠핑장 둘러보기</router-link>
        </li>
        <li :class="{ active: isActive('/viewAttractions') }">
          <router-link to="/viewAttractions">관광지 둘러보기</router-link>
        </li>
        <li :class="{ active: isActive('/writeReview') }">
          <router-link to="/writeReview">리뷰 쓰기</router-link>
        </li>
      </ul>
    </nav>
    <div class="auth-buttons">
      <ButtonLight v-if="!isLoggedIn" label="로그인" @click.capture="login" />
      <ButtonLight v-else label="로그아웃" @click.capture="logout" />
      <ButtonDark v-if="!isLoggedIn" label="회원가입" @click.capture="signup" />
      <ButtonDark v-else label="마이페이지" @click.capture="goToMyPage" />
    </div>
  </header>

  <LoginModal :showModal="isLoginModalOpen" @close="isLoginModalOpen = false" />
  <SignupModal :showModal="isSignupModalOpen" @close="isSignupModalOpen = false" />
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import LoginModal from '@/views/user/LoginPage.vue';
import SignupModal from '@/views/user/SignupPage.vue';
import ButtonDark from '@/components/button/ButtonDark.vue';
import ButtonLight from '@/components/button/ButtonLight.vue';

const isLoggedIn = ref(true);
const isLoginModalOpen = ref(false);
const isSignupModalOpen = ref(false);

const router = useRouter();
const route = useRoute();

const login = () => {
  isLoginModalOpen.value = true;
};

const signup = () => {
  isSignupModalOpen.value = true;
};

const logout = () => {
  isLoggedIn.value = false;
};

const goToMyPage = () => {
  router.push('/myPage'); // 마이페이지로 이동
};

const isActive = (path) => {
  return route.path === path;
};
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-width: 800px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #fff;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-family: 'Noto Sans KR', sans-serif;
}

.logo {
  display: flex;
  align-items: center;
}

.logo img {
  height: 30px;
  margin-right: 0.5rem;
}

nav ul {
  display: flex;
  list-style: none;
  gap: 1.5rem;
  font-size: 0.8rem;
}

nav ul li {
  position: relative;
}

nav ul li a {
  text-decoration: none;
  color: #555;
  white-space: nowrap;
}

nav ul li.active a {
  color: #0077b6;
  font-weight: bold;
  border-bottom: 2px solid #0077b6;
}

.auth-buttons {
  display: flex;
}
</style>
