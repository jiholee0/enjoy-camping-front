<template>
  <div class="my-page">
    <h1>{{ userName }}</h1>
    <p>{{ userEmail }}</p>
    <TabMenu class="tab-menu" :tabs="tabs" />
  </div>
</template>

<script setup>
import { ref, markRaw, onMounted } from 'vue';
import TabMenu from '@/components/tab/TabMenu.vue';
import PasswordChange from '@/views/user/PasswordChange.vue';
import ReviewList2 from '@/layout/list/ReviewCard2List.vue';
import Withdrawal from '@/views/user/Withdrawal.vue';
import { getReviewByWriter } from '@/api/reviewApi';
import { getMyDetail } from '@/api/userApi';

const userName = ref("");
const userEmail = ref("");

const reviewData = ref([]);

const tabs = ref([
  { name: 'passwordChange', label: '비밀번호 수정', component: markRaw(PasswordChange) },
  {
    name: 'reviewList2',
    label: '작성한 리뷰 보기',
    component: markRaw(ReviewList2),
    props: () => ({
      reviews: reviewData.value,
    }),
   },
  { name: 'withdraw', label: '회원 탈퇴하기', component: markRaw(Withdrawal) },
]);

const viewMyReviews = async () => {
  try {
    const response = await getReviewByWriter();
    reviewData.value = response.data.result;
  } catch (error) {
    console.error("리뷰 데이터를 불러오지 못했습니다:", error);
  }
};

const viewMyDetail = async () => {
  try {
    const response = await getMyDetail();
    userName.value = response.data.result.name;
    userEmail.value = response.data.result.email;
  } catch (error) {
    console.error("리뷰 데이터를 불러오지 못했습니다:", error);
  }
}

onMounted(async () => {
  await viewMyReviews(); // 리뷰 데이터 로드
  await viewMyDetail(); // 내 정보 로드
});
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
