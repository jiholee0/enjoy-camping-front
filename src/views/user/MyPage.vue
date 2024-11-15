<template>
  <div class="my-page">
    <h1>{{ userName }}</h1>
    <p>{{ userEmail }}</p>
    <TabMenu class="tab-menu" :tabs="tabs" :reviewData="reviewData" />
  </div>
</template>

<script setup>
import { ref, markRaw } from 'vue';
import TabMenu from '@/components/tab/TabMenu.vue';
import PasswordChange from '@/views/user/PasswordChange.vue';
import ReviewList2 from '@/layout/list/ReviewCard2List.vue';
import Withdraw from '@/views/user/Withdraw.vue';

const userName = ref("홍승찬");
const userEmail = ref("hsch19@gmail.com");

const reviewData = ref([
  { id: 1, title: '제목1', content: '훌륭한 캠핑장이었습니다!', date: '2024-11-05 17:22' },
  { id: 2, title: '제목2', content: '깨끗하고 편안한 캠핑장이었어요.', date: '2024-11-05 17:22' },
  { id: 3, title: '제목3', content: '괜찮지만 약간 시끄러웠어요.', date: '2024-11-05 17:22' },
  { id: 4, title: '제목4', content: '훌륭한 캠핑장이었습니다!', date: '2024-11-05 17:22' },
  { id: 5, title: '제목5', content: '깨끗하고 편안한 캠핑장이었어요.', date: '2024-11-05 17:22' },
  { id: 6, title: '제목6', content: '괜찮지만 약간 시끄러웠어요.', date: '2024-11-05 17:22' },
  { id: 7, title: '제목7', content: '훌륭한 캠핑장이었습니다!', date: '2024-11-05 17:22' },
  { id: 8, title: '제목8', content: '깨끗하고 편안한 캠핑장이었어요.', date: '2024-11-05 17:22' },
  { id: 9, title: '제목9', content: '괜찮지만 약간 시끄러웠어요.', date: '2024-11-05 17:22' },
]);

const tabs = ref([
  { name: 'passwordChange', label: '비밀번호 수정', component: markRaw(PasswordChange) },
  { name: 'reviewList2', label: '작성한 리뷰 보기', component: markRaw(ReviewList2) },
  { name: 'withdraw', label: '회원 탈퇴하기', component: markRaw(Withdraw) },
]);
</script>

<style scoped>
.my-page {
  display: flex;
  flex-direction: column;
  align-items: center !important;
  padding: 20px;
  margin: 70px 100px 70px;
}

h1 {
  font-size: 1.7rem;
  font-weight: bold;
}

p {
  font-size: 1.0rem;
  color: #666;
  margin-bottom: 20px;
}
</style>
