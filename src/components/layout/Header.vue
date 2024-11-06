<template>
    <header class="header">
        <div class="logo">
            <img src="/images/Logo.png" alt="logo" />
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
            <ButtonLight
                v-if="!isLoggedIn"
                label="로그인"
                @click="login"
            />
            <ButtonDark
                v-if="!isLoggedIn"
                label="회원가입"
                @click="signup"
            />
            <ButtonLight
                v-else
                label="로그아웃"
                @click="logout"
            />
            <ButtonDark
                v-else
                label="마이페이지"
                @click="goToMyPage"
            />
        </div>
    </header>

    <LoginModal :showModal="isLoginModalOpen" @close="isLoginModalOpen = false" />
    <SignupModal :showModal="isSignupModalOpen" @close="isSignupModalOpen = false" />
</template>

<script>
import LoginModal from '../../views/Login.vue';
import SignupModal from '../../views/Signup.vue';
import ButtonDark from '../component/ButtonDark.vue';
import ButtonLight from '../component/ButtonLight.vue';

export default {
    components: {
        LoginModal,
        SignupModal,
        ButtonDark,
        ButtonLight
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
</style>