<template>
  <div v-if="isSignupModalOpen" class="modal-overlay" @click.self="startCloseModal">
    <div
      class="modal-container"
      :class="{ 'modal-out': isClosing }"
      @animationend="onAnimationEnd"
    >
      <h2 class="modal-title">회원가입</h2>
      <form @submit.prevent="handleSignup">
        <div class="form-group">
          <div class="label">
            <label for="name">이름</label>
            <span v-if="nameError" class="error-message">{{ nameError }}</span>
          </div>
          <input
            type="text"
            id="name"
            v-model="name"
            placeholder="이름 입력"
            @input="validateName"
          />
        </div>
        <div class="form-group">
          <div class="label">
            <label for="email">이메일</label>
            <span v-if="emailError" class="error-message">{{ emailError }}</span>
          </div>
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="이메일 입력"
            @input="validateEmail"
          />
        </div>
        <div class="form-group">
          <div class="label">
            <label for="password">비밀번호</label>
            <span v-if="passwordError" class="error-message">{{ passwordError }}</span>
          </div>
          <input
            :type="showPassword ? 'text' : 'password'"
            id="password"
            v-model="password"
            placeholder="비밀번호 입력"
            @input="validatePassword"
          />
          <button type="button" class="eye-button" @click="toggleShowPassword">
            <img
              :src="showPassword ? '/images/eye.png' : '/images/closed-eye.png'"
              alt="Toggle visibility"
              class="eye-icon"
            />
          </button>
        </div>
        <div class="form-group">
          <div class="label">
            <label for="confirmPassword">비밀번호 확인</label>
            <span v-if="confirmPasswordError" class="error-message">{{ confirmPasswordError }}</span>
          </div>
          <input
            :type="showConfirmPassword ? 'text' : 'password'"
            id="confirmPassword"
            v-model="confirmPassword"
            placeholder="비밀번호 확인"
            @input="validateConfirmPassword"
          />
          <button type="button" class="eye-button" @click="toggleShowConfirmPassword">
            <img
              :src="showConfirmPassword ? '/images/eye.png' : '/images/closed-eye.png'"
              alt="Toggle visibility"
              class="eye-icon"
            />
          </button>
        </div>
        <div class="form-actions">
          <ButtonDark
            class="join-button"
            :label="'회원가입'"
            :disabled="!isValidForm"
            @buttonClick.stop="handleSignup"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, inject } from 'vue';
import { useRouter } from 'vue-router';
import ButtonDark from '@/components/button/ButtonDark.vue';
import Swal from 'sweetalert2';
import { join } from '@/api/userApi';

// 공유 상태 주입
const isSignupModalOpen = inject('isSignupModalOpen');

const router = useRouter();

const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const nameError = ref('');
const emailError = ref('');
const passwordError = ref('');
const confirmPasswordError = ref('');
const isClosing = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);

// 모든 필드 유효성 검사
const isValidForm = computed(() => {
  return (
    name.value &&
    email.value &&
    password.value &&
    confirmPassword.value &&
    !nameError.value &&
    !emailError.value &&
    !passwordError.value &&
    !confirmPasswordError.value
  );
});

const startCloseModal = () => {
  isClosing.value = true;
};

const onAnimationEnd = () => {
  if (isClosing.value) {
    isClosing.value = false;
    isSignupModalOpen.value = false; // 모달 닫기
  }
};

const toggleShowPassword = () => {
  showPassword.value = !showPassword.value;
};

const toggleShowConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};

const validateName = () => {
  nameError.value = name.value ? '' : '이름을 입력해주세요.';
};

const validateEmail = () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  emailError.value = emailPattern.test(email.value)
    ? ''
    : '유효한 이메일 주소를 입력해주세요.';
};

const validatePassword = () => {
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+~`|}{[\]:;?><,./\-=\]])[A-Za-z\d!@#$%^&*()_+~`|}{[\]:;?><,./\-=\]]{6,}$/;
  passwordError.value = passwordPattern.test(password.value)
    ? ''
    : '비밀번호는 6자 이상이어야 하며, 특수문자, 영어, 숫자를 포함해야 합니다.';
  validateConfirmPassword();
};

const validateConfirmPassword = () => {
  confirmPasswordError.value =
    confirmPassword.value === password.value
      ? ''
      : '비밀번호가 일치하지 않습니다.';
};

const handleSignup = () => {
  validateName();
  validateEmail();
  validatePassword();
  validateConfirmPassword();

  if (isValidForm.value) {
    // 회원가입 API 호출
    join({
      name : name.value,
      email : email.value,
      password : password.value
  })
      .then(() => {
        Swal.fire({
          title: '회원가입 완료',
          text: '회원가입이 성공적으로 완료되었습니다.',
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
  } else {
    Swal.fire({
      title: 'ERROR!',
      text: '회원가입에 실패하였습니다.',
      icon: 'error',
      confirmButtonText: '확인',
    });
  }
};
</script>

<style scoped>
/* 기존 스타일 유지 */
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
  position: relative;
  margin-bottom: 1em;
}

.form-group label {
  display: block;
  margin-bottom: 0.5em;
}

.form-group input {
  width: 100%;
  padding: 0.5em;
  padding-right: 2.5em;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-actions {
  text-align: center;
}

.label {
  display: flex;
  flex-direction: row;
  gap: 5px;
}

.eye-button {
  position: absolute;
  top: 75%;
  right: 10px;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.7rem;
}

.eye-icon {
  width: 15px;
  height: 15px;
}

.error-message {
  color: red;
  font-size: 0.7em;
  align-self: center;
  left: 0;
  margin-bottom: 0.5em;
}

.join-button:disabled {
  background-color: #81c3d7;
  cursor: not-allowed;
}
</style>
