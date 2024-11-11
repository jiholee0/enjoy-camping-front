// router/index.js
import { createRouter, createWebHistory } from "vue-router";

// 컴포넌트 가져오기
import Home from "@/views/HomePage.vue";
import ViewCampsites from "@/views/ViewCampsites.vue";
import ViewAttractions from "@/views/ViewAttractions.vue";
import AttractionDetailPage from "@/views/AttractionDetailPage.vue";
import CampsiteDetailPage from "@/views/CampsiteDetailPage.vue";
import MyPage from "@/views/MyPage.vue";

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
