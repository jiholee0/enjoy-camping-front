// router/index.js
import { createRouter, createWebHistory } from "vue-router";

// 컴포넌트 가져오기
import Home from "../views/HomePage.vue";
import ViewCampsites from "../views/ViewCampsites.vue";
import ViewAttractions from "../views/ViewAttractions.vue";
import DetailPage from "@/views/DetailPage.vue";
import MyPage from "@/views/MyPage.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/viewCampsites", name: "ViewCampsites", component: ViewCampsites },
  {
    path: "/viewAttractions",
    name: "ViewAttractions",
    component: ViewAttractions,
  },
  { path: "/detail", name: "DetailPage", component: DetailPage },
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
