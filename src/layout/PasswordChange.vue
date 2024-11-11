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
        <div class="label">
            <label for="newPassword">새 비밀번호</label>
            <span v-if="passwordError" class="error-message">{{ passwordError }}</span>
          </div>
        <div class="input-wrapper">
          <input :type="showNewPassword ? 'text' : 'password'" id="newPassword" v-model="newPassword" @input="validatePassword" />
          <button type="button" class="eye-button" @click="toggleShowNewPassword">
            <img :src="showNewPassword ? '/images/eye.png' : '/images/closed-eye.png'" alt="Toggle visibility"
              class="eye-icon" />
          </button>
        </div>
      </div>

      <div class="form-group">
        <div class="label">
            <label for="confirmPassword">비밀번호 확인 </label>
            <span v-if="confirmPasswordError" class="error-message">{{ confirmPasswordError }}</span>
          </div>
        <div class="input-wrapper">
          <input
            :type="showConfirmPassword ? 'text' : 'password'"
            id="confirmPassword"
            v-model="confirmPassword"
            @input="validateConfirmPassword"
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
const passwordError = ref('');
const confirmPasswordError = ref('');

const toggleShowCurrentPassword = () => {
  showCurrentPassword.value = !showCurrentPassword.value;
};

const toggleShowNewPassword = () => {
  showNewPassword.value = !showNewPassword.value;
};

const toggleShowConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};

const validatePassword = () => {
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+~`|}{[\]:;?><,./-=])[A-Za-z\d!@#$%^&*()_+~`|}{[\]:;?><,./-=]{6,}$/;
  passwordError.value = passwordPattern.test(newPassword.value)
    ? ''
    : '비밀번호는 6자 이상이어야 하며, 특수문자, 영어, 숫자를 포함해야 합니다.';
  validateConfirmPassword();
};

const validateConfirmPassword = () => {
  confirmPasswordError.value =
    confirmPassword.value === newPassword.value
      ? ''
      : '비밀번호가 일치하지 않습니다.';
};

const handlePasswordChange = () => {
  validatePassword();
  validateConfirmPassword();

  alert('비밀번호가 성공적으로 변경되었습니다.');
};
</script>

<style scoped>
.password-change {
  padding: 20px;
}

.form-group {
  width: 100%;
  margin-bottom: 15px;
}

.input-wrapper {
  position: relative;
}

.label {
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  color: #333;
  margin-bottom: 5px;
}

label {
  font-size: 0.8rem;
  color: #333;
}

.error-message {
  color: red;
  font-size: 0.8em;
  margin-left: 8px;
}

input {
  width: 400px;
  padding: 10px;
  font-size: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
}

.eye-button {
  position: absolute;
  right: 10px;
  top: 50%;
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
