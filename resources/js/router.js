import Vue from 'vue';
import VueRouter from 'vue-router'


Vue.use(VueRouter)
const route = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/login', component: () => import('./components/Login.vue'),
            name: 'login'
        },
        {
            path: '/get', component: () => import('./components/Get.vue'),
            name: 'get'
        },
        {
            path: '/registration', component: () => import('./components/Registration.vue'),
            name: 'registration'
        },
        {
            path: '/personal', component: () => import('./components/Personal.vue'),
            name: 'personal'
        },
    ]
})

route.beforeEach((to, from, next) => {
    const token = localStorage.getItem('x_xsrf_token')


    if (!token) {
        if (to.name === 'login' || to.name === 'registration') {
            return next()
        }
        else {
            return next({ name: 'login' })
        }
    }

    if (to.name === 'login' || to.name === 'registration' && token) {
        return next({ name: 'personal' })
    }

    next();
})

export default route