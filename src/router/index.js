// router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// 컴포넌트 가져오기
import Home from '../views/HomePage.vue'
import About from '../views/About.vue'

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/about', name: 'About', component: About }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
