// router/index.js
import { createRouter, createWebHistory } from "vue-router";

// 컴포넌트 가져오기
import Home from "@/views/main/HomePage.vue";
import ViewCampsites from "@/views/campsite/ViewCampsites.vue";
import ViewAttractions from "@/views/attraction/ViewAttractions.vue";
import AttractionDetailPage from "@/views/attraction/AttractionDetailPage.vue";
import CampsiteDetailPage from "@/views/campsite/CampsiteDetailPage.vue";
import WriteReviewPage from "@/views/review/WriteReviewPage.vue";
import MyPage from "@/views/user/MyPage.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/viewCampsites", name: "ViewCampsites", component: ViewCampsites },
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
    path: "/detail/campings/:id",
    name: "CampsiteDetailPage",
    component: CampsiteDetailPage,
    props: true,
  },
  {
    path: "/writeReview",
    name: "WriteReviewPage",
    component: WriteReviewPage,
  },
  { path: "/myPage", name: "MyPage", component: MyPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
