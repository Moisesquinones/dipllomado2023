import { createApp } from 'vue'
import './style.css'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Home from "./pages/Home.vue"
import Hotel from "./pages/Hotel.vue"
import NotFound from './pages/NotFound.vue'

const routes = [
    { path: "/", component: Home },
    { path: "/hotel", component: Hotel },
    { path: "/:pathMatch(.*)*", component: NotFound }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})


createApp(App).use(router).mount('#app')
