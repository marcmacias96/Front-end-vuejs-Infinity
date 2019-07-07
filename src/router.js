import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/login',
            name: 'login',
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/Login.vue')
        },
        {
            path: '/index',
            name: 'index',
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/Index.vue')
        },
        {
            path: '/viewImage:/id',
            name: 'viewImage',
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/ViewImage.vue')
        },
        {
            path: '/signUp',
            name: 'signUp',
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/SignUp.vue')
        }
    ]
})