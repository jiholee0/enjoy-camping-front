<template>
  <div v-if="isLoginModalOpen" class="modal-overlay" @click.self="startCloseModal">
    <div
      class="modal-container"
      :class="{ 'modal-out': isClosing }"
      @animationend="onAnimationEnd"
    >
      <h2 class="modal-title">로그인</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">이메일</label>
          <input type="email" id="email" v-model="email" placeholder="이메일 입력" required />
        </div>
        <div class="form-group">
          <label for="password">비밀번호</label>
          <input type="password" id="password" v-model="password" placeholder="비밀번호 입력" required />
        </div>
        <div class="form-actions">
          <ButtonDark label="로그인" @buttonClick.stop="handleLogin" />
        </div>
      </form>
      <div class="additional-actions">
        <ButtonLight label="비밀번호 찾기" @buttonClick.stop="forgotPassword" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';
import ButtonDark from '@/components/button/ButtonDark.vue';
import ButtonLight from '@/components/button/ButtonLight.vue';
import Swal from 'sweetalert2';
import { login } from '@/api/userApi';

const router = useRouter();

const email = ref('');
const password = ref('');
const isClosing = ref(false);

const isLoggedIn = inject('isLoggedIn');
const isLoginModalOpen = inject('isLoginModalOpen');

const startCloseModal = () => {
  isClosing.value = true;
};

const onAnimationEnd = () => {
  if (isClosing.value) {
    isClosing.value = false;
    isLoginModalOpen.value = false;
  }
};

const handleLogin = () => {
  const loadingSwal = Swal.fire({
    title: '로그인 중...',
    text: '로그인하고 있습니다. 잠시만 기다려주세요.',
    icon: 'info',
    allowOutsideClick: false,
    showConfirmButton: false,
    didOpen: () => {
      Swal.showLoading(); // 로딩 애니메이션 활성화
    },
  });

  login({
      email: email.value,
      password: password.value
    })
      .then(() => {
        isLoggedIn.value = true;
        loadingSwal.close();

        Swal.fire({
          title: '로그인 완료',
          text: '로그인이 성공적으로 완료되었습니다.',
          icon: 'success',
          confirmButtonText: '확인',
          confirmButtonColor: '#0077b6',
        }).then((result) => {
          if (result.isConfirmed) {
            router.push('/');
          }
        });

        startCloseModal();
      })
      .catch((error) => {
        Swal.fire({
          title: 'ERROR!',
          text: error.response.data.message,
          icon: 'error',
          confirmButtonText: '확인',
        });
      });
};

const forgotPassword = () => {
  // alert("비밀번호 찾기 기능을 구현하세요.");
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-container {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  max-width: 600px;
  width: 100%;
  padding: 20px;
  animation: modalIn 0.3s ease forwards;
}

.modal-container.modal-out {
  animation: modalOut 0.3s ease forwards;
}

@keyframes modalIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes modalOut {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.8);
  }
}

.modal-title {
  font-size: 1.5em;
  margin-bottom: 1em;
  text-align: center;
}

.form-group {
  margin-bottom: 1em;
}

.form-group label {
  display: block;
  margin-bottom: 0.5em;
}

.form-group input {
  width: 100%;
  padding: 0.5em;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-actions,
.additional-actions {
  text-align: center;
}
</style>
