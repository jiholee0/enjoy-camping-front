<template>
  <div class="password-change">
    <form @submit.prevent="handlePasswordChange">
      <div class="form-group">
        <label for="currentPassword">이전 비밀번호 입력</label>
        <div class="input-wrapper">
          <input
            :type="showCurrentPassword ? 'text' : 'password'"
            id="currentPassword"
            v-model="currentPassword"
            required
          />
          <button type="button" class="eye-button" @click="toggleShowCurrentPassword">
            <img :src="showCurrentPassword ? '/images/eye.png' : '/images/closed-eye.png'" alt="Toggle visibility"
              class="eye-icon" />
          </button>
        </div>
      </div>

      <div class="form-group">
        <label for="newPassword">변경 비밀번호 입력</label>
        <div class="input-wrapper">
          <input :type="showNewPassword ? 'text' : 'password'" id="newPassword" v-model="newPassword" required />
          <button type="button" class="eye-button" @click="toggleShowNewPassword">
            <img :src="showNewPassword ? '/images/eye.png' : '/images/closed-eye.png'" alt="Toggle visibility"
              class="eye-icon" />
          </button>
        </div>
      </div>

      <div class="form-group">
        <label for="confirmPassword">변경 비밀번호 재입력</label>
        <div class="input-wrapper">
          <input
            :type="showConfirmPassword ? 'text' : 'password'"
            id="confirmPassword"
            v-model="confirmPassword"
            required
          />
          <button type="button" class="eye-button" @click="toggleShowConfirmPassword">
            <img :src="showConfirmPassword ? '/images/eye.png' : '/images/closed-eye.png'" alt="Toggle visibility"
              class="eye-icon" />
          </button>
        </div>
      </div>

      <ButtonDark type="submit" class="submit-button" label="비밀번호 수정" />
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ButtonDark from '@/components/ButtonDark.vue';

const currentPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const showCurrentPassword = ref(false);
const showNewPassword = ref(false);
const showConfirmPassword = ref(false);

const toggleShowCurrentPassword = () => {
  showCurrentPassword.value = !showCurrentPassword.value;
};

const toggleShowNewPassword = () => {
  showNewPassword.value = !showNewPassword.value;
};

const toggleShowConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};

const handlePasswordChange = () => {
  if (newPassword.value !== confirmPassword.value) {
    alert('변경 비밀번호가 일치하지 않습니다.');
    return;
  }

  console.log('비밀번호가 변경되었습니다.');
  alert('비밀번호가 성공적으로 변경되었습니다.');
};
</script>

<style scoped>
.password-change {
  width: 300px;
  padding: 20px;
}

.form-group {
  width: 100%;
  margin-bottom: 15px;
}

.input-wrapper {
  position: relative;
}

label {
  display: block;
  font-size: 0.8rem;
  color: #333;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  font-size: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
}

.eye-button {
  position: absolute;
  right: 10px;
  top: 55%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
}

.submit-button {
  font-size: 0.8rem !important;
}

.eye-icon {
  width: 20px;
  height: 20px;
}
</style>
