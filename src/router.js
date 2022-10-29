import { createRouter , createWebHashHistory} from 'vue-router'

const routes = [
    { 
        name: 'moisture',
        path: '/moisture', 
        component: () => import('./pages/MoistureChart.vue') 
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes, 
})

export default router