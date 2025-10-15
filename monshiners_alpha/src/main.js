import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './plugins/i18n'
import vuetify, { installLegacyVuetifyGlobals } from './plugins/vuetify'
import VueKinesis from 'vue-kinesis'
import mitt from 'mitt'
import 'vuetify/styles'

const app = createApp(App)
const eventHub = mitt()

app.config.globalProperties.$eventHub = eventHub

app.use(router)
app.use(store)
app.use(i18n)
app.use(VueKinesis)
app.use(vuetify)
installLegacyVuetifyGlobals(app)

app.mount('#app')
