import Vue from 'vue'
import VueRouter from 'vue-router'
import goTo from 'vuetify/es5/services/goto'
import Cookies from 'js-cookie'
import Home from '../views/Home.vue'
import Catch from '../views/Catch.vue'
import AgeConfirmation from '../views/AgeConfirmation.vue'


Vue.use(VueRouter)

const router = new VueRouter({
    scrollBehavior: (to, from, savedPosition) => {
        let scrollTo = 0

        if (to.hash) {
            scrollTo = to.hash
        } else if (savedPosition) {
            scrollTo = savedPosition.y
        }

        return goTo(scrollTo)
    },
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
            meta: {
                requiresAge: true
            }
        },
        {
            path: '/wersdas',
            name: 'About',
            component: Home,
            meta: {
                requiresAge: true
            }
        },
        {
            path: '/wasmachndie',
            name: 'Products',
            component: Home,
            meta: {
                requiresAge: true
            }
        },
        {
            path: '/hierkannstekaufen',
            name: 'Shop',
            component: Home,
            meta: {
                requiresAge: true
            }
        },
        {
            path: '/impressum',
            name: 'Imprint',
            component: () => import('../views/Imprint.vue')
        },
        {
            path: '/age-confirmation',
            name: 'AgeConfirmation',
            component: AgeConfirmation
        },
        {
            path: '/too-young',
            name: 'TooYoung',
            component: () => import('../views/TooYoung.vue')
        },
        {
            path: '/*',
            name: '404_error',
            component: Catch
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.name !== 'AgeConfirmation' && Cookies.get('age') === undefined) {
        next({name: 'AgeConfirmation'})
    } else {
        if (to.matched.some(route => route.meta.requiresAge)){
            if (Cookies.get('age') > 0) {
                next()
            } else {
                next({name: 'TooYoung'})
            }
        } else {
            next()
        }
    }
})

export default router

