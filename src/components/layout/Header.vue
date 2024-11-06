<template>
    <header class="header">
        <div class="logo">
            <img src="../../assets/image/Logo.png" alt="logo" />
        </div>
        <nav>
            <ul>
                <li><a href="/">HOME</a></li>
                <li><a href="/campgrounds">캠핑장 둘러보기</a></li>
                <li><a href="/tourist">관광지 둘러보기</a></li>
                <li><a href="/review">리뷰 쓰기</a></li>
            </ul>
        </nav>
        <div class="auth-buttons">
            <button v-if="!isLoggedIn" class="login-button" @click="login">로그인</button>
            <button v-if="!isLoggedIn" class="signup-button" @click="signup">회원가입</button>
            <button v-else class="logout-button" @click="logout">로그아웃</button>
            <button v-else class="mypage-button" @click="goToMyPage">마이페이지</button>
        </div>
    </header>

    <LoginModal :showModal="isLoginModalOpen" @close="isLoginModalOpen = false" />
    <SignupModal :showModal="isSignupModalOpen" @close="isSignupModalOpen = false" />
</template>

<script>
import LoginModal from '../../views/Login.vue';
import SignupModal from '../../views/Signup.vue';


export default {
    components: {
        LoginModal,
        SignupModal
    },
    data() {
        return {
            isLoggedIn: false,
            isLoginModalOpen: false,
            isSignupModalOpen: false
        };
    },
    methods: {
        login() {
            this.isLoginModalOpen = true;
        },
        signup() {
            this.isSignupModalOpen = true;
        },
        logout() {
            this.isLoggedIn = false;
        },
        goToMyPage() {
            // 마이페이지 이동 로직 추가
        },
    },
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
}

nav ul li a {
    text-decoration: none;
    color: #555;
    white-space: nowrap;
}

.auth-buttons {
    display: flex;
}

.auth-buttons button {
    color: #fff;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    margin-left: 0.5rem;
    white-space: nowrap;
}

.signup-button,
.mypage-button {
    background-color: #0077b6;
    margin-right: 2rem;
}

.login-button,
.logout-button {
    color: #0077b6 !important;
    background-color: white;
}

.signup-button:hover,
.mypage-button:hover {
    color: white !important;
    background-color: #81C3D7;
}

.login-button:hover,
.logout-button:hover {
    color: #81C3D7 !important;
    background-color: white;
}
</style>