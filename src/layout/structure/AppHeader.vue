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
        <li :class="{ active: isActive('/viewReviews') }">
          <router-link to="/viewReviews">리뷰 보기</router-link>
        </li>
        <li v-if="isLoggedIn" :class="{ active: isActive('/writeReview') }">
          <router-link to="/writeReview">리뷰 쓰기</router-link>
        </li>
      </ul>
    </nav>
    <div class="auth-buttons">
      <template v-if="isLoggedIn">
        <ButtonLight label="로그아웃" @click.stop="handleLogout" />
        <ButtonDark label="마이페이지" @click.capture="goToMyPage" />
      </template>
      <template v-else>
        <ButtonLight label="로그인" @click.stop="login" />
        <ButtonDark label="회원가입" @click.capture="signup" />
      </template>
    </div>
  </header>

  <LoginModal :showModal="isLoginModalOpen" @close="isLoginModalOpen = false" />
  <SignupModal :showModal="isSignupModalOpen" @close="isSignupModalOpen = false" />
</template>

<script setup>
import { inject } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import LoginModal from '@/views/user/LoginPage.vue';
import SignupModal from '@/views/user/SignupPage.vue';
import ButtonDark from '@/components/button/ButtonDark.vue';
import ButtonLight from '@/components/button/ButtonLight.vue';
import Swal from 'sweetalert2';
import { logout } from '@/api/userApi';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function deleteCookies() {
    cookies.remove('accessToken', { path: '/' });
    cookies.remove('refreshToken', { path: '/' });
}

const isLoggedIn = inject('isLoggedIn');
const isLoginModalOpen = inject('isLoginModalOpen');
const isSignupModalOpen = inject('isSignupModalOpen');

const router = useRouter();
const route = useRoute();

const login = () => {
  isLoginModalOpen.value = true;
};

const signup = () => {
  isSignupModalOpen.value = true;
};

const handleLogout = () => {
  Swal.fire({
    title: '로그아웃하시겠습니까?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: '로그아웃',
    cancelButtonText: '취소',
    confirmButtonColor: '#b32020',
    cancelButtonColor: '#c1c1c1',
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const loadingSwal = Swal.fire({
          title: '로그아웃 중...',
          text: '로그아웃하고 있습니다. 잠시만 기다려주세요.',
          icon: 'info',
          allowOutsideClick: false,
          showConfirmButton: false,
          didOpen: () => {
            Swal.showLoading(); // 로딩 애니메이션 활성화
          },
        });

        await logout();
        deleteCookies();
        isLoggedIn.value = false;

        await loadingSwal.close();

        Swal.fire({
          title: '로그아웃 완료',
          icon: 'success',
          confirmButtonText: '확인',
          confirmButtonColor: '#0077b6',
        }).then(() => {
          router.push('');
          window.scrollTo({ top: 0, behavior: 'smooth' }); // 스크롤 맨 위로 이동
        });

      } catch (error) {
        Swal.fire({
          title: '로그아웃 실패',
          text: error.response.data.message,
          icon: 'error',
          confirmButtonText: '확인',
          confirmButtonColor: '#0077b6',
        }).then(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' }); // 스크롤 맨 위로 이동
        });
        console.error('로그아웃 과정에서 오류가 발생했습니다:', error);
      }
    }
  });
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
