<template>
  <div class="my-page">
    <h1>{{ userName }}</h1>
    <p>{{ userEmail }}</p>
    <TabMenu class="tab-menu" :tabs="tabs" :reviewData="reviewData" />
  </div>
</template>

<script>
import TabMenu from '@/components/component/TabMenu.vue';
import PasswordChange from '@/components/layout/PasswordChange.vue';
import ReviewList2 from '@/components/layout/ReviewCard2List.vue';
// import AttractionCardGrid from '@/components/layout/AttractionCardGrid.vue';
// import CampsiteCardGrid from '@/components/layout/CampsiteCardGrid.vue';
import Withdraw from '@/components/layout/Withdraw.vue';

export default {
  name: 'MyPage',
  components: {
    TabMenu,
  },
  data() {
    return {
      userName: "홍승찬",
      userEmail: "hsch19@gmail.com",
      reviewData: [
        { id: 1, title: '제목1', content: '훌륭한 캠핑장이었습니다!', date: '2024-11-05 17:22' },
        { id: 2, title: '제목2', content: '깨끗하고 편안한 캠핑장이었어요.', date: '2024-11-05 17:22' },
        { id: 3, title: '제목3', content: '괜찮지만 약간 시끄러웠어요.', date: '2024-11-05 17:22' },
        { id: 4, title: '제목4', content: '훌륭한 캠핑장이었습니다!', date: '2024-11-05 17:22' },
        { id: 5, title: '제목5', content: '깨끗하고 편안한 캠핑장이었어요.', date: '2024-11-05 17:22' },
        { id: 6, title: '제목6', content: '괜찮지만 약간 시끄러웠어요.', date: '2024-11-05 17:22' },
        { id: 7, title: '제목7', content: '훌륭한 캠핑장이었습니다!', date: '2024-11-05 17:22' },
        { id: 8, title: '제목8', content: '깨끗하고 편안한 캠핑장이었어요.', date: '2024-11-05 17:22' },
        { id: 9, title: '제목9', content: '괜찮지만 약간 시끄러웠어요.', date: '2024-11-05 17:22' },
      ], // 리뷰 데이터를 여기에 설정하거나 필요 시 API 호출로 가져올 수 있습니다.
      tabs: [
        { name: 'passwordChange', label: '비밀번호 수정', component: PasswordChange },
        { name: 'reviewList2', label: '작성한 리뷰 보기', component: ReviewList2 },
        // { name: 'favoriteCamping', label: '찜한 캠핑장 보기', component: CampsiteCardGrid },
        // { name: 'favoriteTourist', label: '찜한 관광지 보기', component: AttractionCardGrid },
        { name: 'withdraw', label: '탈퇴하기', component: Withdraw },
      ],
    };
  },
};
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
