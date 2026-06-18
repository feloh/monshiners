import { createApp } from 'vue'
import mitt from 'mitt'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import i18n from './plugins/i18n'
import VueKinesis from './plugins/kinesis'
import { createMetaManager } from './plugins/meta'
import 'vuetify/styles'

const app = createApp(App)
const eventHub = mitt()

app.config.globalProperties.$eventHub = {
  $on: eventHub.on,
  $off: eventHub.off,
  $emit: eventHub.emit,
}

app
  .use(vuetify)
  .use(router)
  .use(store)
  .use(i18n)
  .use(VueKinesis)
  .use(createMetaManager())
  .mount('#app')
