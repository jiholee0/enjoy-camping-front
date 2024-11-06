<template>
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
        <div class="modal-container">
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
                    <button type="submit" class="login-button">로그인</button>
                </div>
            </form>
            <div class="additional-actions">
                <a href="#" @click="forgotPassword">비밀번호 찾기</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        showModal: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        closeModal() {
            this.$emit('close');
        },
        handleLogin() {
            // 로그인 로직을 여기에 추가하세요
            console.log("Email:", this.email);
            console.log("Password:", this.password);
            this.closeModal();
        },
        forgotPassword() {
            // 비밀번호 찾기 로직을 여기에 추가하세요
            alert("비밀번호 찾기 기능을 구현하세요.");
        }
    }
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
    font-weight: bold;
}

.form-group input {
    width: 100%;
    padding: 0.5em;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.form-actions {
    text-align: center;
}

.login-button {
    background-color: #0077b6;
    color: white;
    padding: 0.75em 1.5em;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.login-button:hover {
    background-color: #005f8d;
}

.additional-actions {
    text-align: center;
    margin-top: 1em;
}

.additional-actions a {
    color: #0077b6;
    text-decoration: none;
}

.additional-actions a:hover {
    text-decoration: underline;
}
</style>
