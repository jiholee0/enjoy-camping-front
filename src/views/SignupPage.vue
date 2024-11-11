<template>
  <div v-if="showModal" class="modal-overlay" @click.self="startCloseModal">
    <div
      class="modal-container"
      :class="{ 'modal-out': isClosing }"
      @animationend="onAnimationEnd"
    >
      <h2 class="modal-title">회원가입</h2>
      <form @submit.prevent="handleSignup">
        <div class="form-group">
          <label for="name">이름</label>
          <input type="text" id="name" v-model="name" placeholder="이름 입력" required />
        </div>
        <div class="form-group">
          <label for="email">이메일</label>
          <input type="email" id="email" v-model="email" placeholder="이메일 입력" required />
        </div>
        <div class="form-group">
          <label for="password">비밀번호</label>
          <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password" placeholder="비밀번호 입력" required />
          <button type="button" class="eye-button" @click="toggleShowPassword">
            <img :src="showPassword ? '/images/eye.png' : '/images/closed-eye.png'" alt="Toggle visibility"
              class="eye-icon" />
          </button>
        </div>
        <div class="form-group">
          <label for="confirmPassword">비밀번호 확인</label>
          <input :type="showConfirmPassword ? 'text' : 'password'" id="confirmPassword" v-model="confirmPassword" placeholder="비밀번호 확인" required />
          <button type="button" class="eye-button" @click="toggleShowConfirmPassword">
            <img :src="showConfirmPassword ? '/images/eye.png' : '/images/closed-eye.png'" alt="Toggle visibility"
              class="eye-icon" />
          </button>
        </div>
        <div class="form-actions">
          <ButtonDark label="회원가입" @submit.prevent="handleSignup" />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { defineProps, defineEmits } from 'vue';
import ButtonDark from '@/components/ButtonDark.vue';

defineProps({
  showModal: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['close']);

const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const isClosing = ref(false);

const showPassword = ref(false);
const showConfirmPassword = ref(false);

const startCloseModal = () => {
  isClosing.value = true;
};

const onAnimationEnd = () => {
  if (isClosing.value) {
    isClosing.value = false;
    emit('close');
  }
};

const toggleShowPassword = () => {
  showPassword.value = !showPassword.value;
};

const toggleShowConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};

const handleSignup = () => {
  if (password.value !== confirmPassword.value) {
    alert('비밀번호를 확인해주세요.');
    return;
  }

  console.log("Name:", name.value);
  console.log("Email:", email.value);
  console.log("Password:", password.value);
  startCloseModal();
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
  position: relative; /* 부모 요소를 기준으로 버튼 위치 설정 */
  margin-bottom: 1em;
}

.form-group label {
  display: block;
  margin-bottom: 0.5em;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 0.5em;
  padding-right: 2.5em; /* 버튼 공간 확보 */
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-actions {
  text-align: center;
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

</style>
