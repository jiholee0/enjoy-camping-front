import { createRouter, createWebHistory } from "vue-router";
import Swal from "sweetalert2";

// 컴포넌트 가져오기
import Home from "@/views/main/HomePage.vue";
import ViewCampsites from "@/views/campsite/ViewCampsites.vue";
import ViewAttractions from "@/views/attraction/ViewAttractions.vue";
import AttractionDetailPage from "@/views/attraction/AttractionDetailPage.vue";
import CampsiteDetailPage from "@/views/campsite/CampsiteDetailPage.vue";
import WriteReviewPage from "@/views/review/WriteReviewPage.vue";
import ViewReviewPage from "@/views/review/ViewReviewPage.vue";
import MyPage from "@/views/user/MyPage.vue";

// 쿠키 읽기 함수
function getCookie(name) {
  const cookieString = document.cookie;
  const cookies = cookieString.split("; ");
  for (let cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) {
      return value;
    }
  }
  return null;
}

const routes = [
  { path: "/", name: "Home", component: Home },
  {
    path: "/viewCampsites",
    name: "ViewCampsites",
    component: ViewCampsites,
  },
  {
    path: "/detail/campings/:id",
    name: "CampsiteDetailPage",
    component: CampsiteDetailPage,
    props: true,
  },
  {
    path: "/viewAttractions",
    name: "ViewAttractions",
    component: ViewAttractions,
  },
  {
    path: "/detail/attractions/:id",
    name: "AttractionDetailPage",
    component: AttractionDetailPage,
    props: true,
  },
  {
    path: "/writeReview",
    name: "WriteReviewPage",
    component: WriteReviewPage,
    meta: { requiresAuth: true }, // 인증이 필요한 경로로 설정
  },
  {
    path: "/viewReviews",
    name: "ViewReviewPage",
    component: ViewReviewPage,
  },
  {
    path: "/myPage",
    name: "MyPage",
    component: MyPage,
    meta: { requiresAuth: true }, // 인증이 필요한 경로로 설정
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

// 네비게이션 가드 추가
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const accessToken = getCookie("accessToken");
    if (!accessToken) {
      // 경고 메시지 표시
      Swal.fire({
        icon: "warning",
        title: "로그인이 필요합니다!",
        text: "해당 페이지에 접근하려면 로그인해주세요.",
        confirmButtonText: "확인",
      }).then(() => {
        next("/"); // 홈 또는 로그인 페이지로 리다이렉트
      });
    } else {
      next(); // 인증된 경우 통과
    }
  } else {
    next(); // 인증 필요 없는 경우 통과
  }
});

export default router;
