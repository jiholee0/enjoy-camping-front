// router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// 컴포넌트 가져오기
import Home from '../views/HomePage.vue'
import ViewCampsites from '../views/ViewCampsites.vue'
import ViewAttractions from '../views/ViewAttractions.vue'

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/viewCampsites', name: 'ViewCampsites', component: ViewCampsites },
    { path: '/viewAttractions', name: 'ViewAttractions', component: ViewAttractions },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
