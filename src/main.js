import { createApp } from 'vue'
import './style.css'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Home from "./pages/Home.vue"
import Hotel from "./pages/Hotel.vue"
import Resumen from "./pages/Resumen.vue"
import Detalles from "./pages/Detalles.vue"
import NotFound from './pages/NotFound.vue'
import Habitantions from './pages/Habitations.vue'

const routes = [
    { path: "/", component: Home },
    { path: "/hotel", component: Hotel },
    { path: "/resumen", component: Resumen },
    { path: "/Habitaciones", component: Habitantions },
    { path: "/hotel/detalles/:id", component: Detalles },
    { path: "/:pathMatch(.*)*", component: NotFound }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})


createApp(App).use(router).mount('#app')
