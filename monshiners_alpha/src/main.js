import { createApp, reactive } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import i18n from './plugins/i18n'
import Cookies from 'js-cookie'
import mitt from 'mitt'

const eventHub = mitt()
eventHub.$on = eventHub.on
eventHub.$off = eventHub.off
eventHub.$emit = eventHub.emit

const breakpoint = reactive({
  width: typeof window !== 'undefined' ? window.innerWidth : 1280,
  get mobile() { return this.width < 960 },
  get smAndDown() { return this.width < 960 },
  get mdAndUp() { return this.width >= 960 },
  get name() {
    if (this.width < 600) return 'xs'
    if (this.width < 960) return 'sm'
    if (this.width < 1280) return 'md'
    if (this.width < 1920) return 'lg'
    return 'xl'
  },
})

if (typeof window !== 'undefined') {
  window.addEventListener('resize', () => {
    breakpoint.width = window.innerWidth
  })
}

const app = createApp(App)

app.config.globalProperties.$eventHub = eventHub
app.config.globalProperties.$cookies = Cookies
app.config.globalProperties.$vuetify = { breakpoint }

app.use(vuetify)
app.use(router)
app.use(store)
app.component('KinesisContainer', { template: '<div><slot /></div>' })
app.component('KinesisElement', { template: '<div><slot /></div>' })
app.use(i18n)

app.mount('#app')
