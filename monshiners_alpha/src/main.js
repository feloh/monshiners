import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import i18n from './plugins/i18n'
import JsCookie from 'js-cookie'
import VueKinesis from 'vue-kinesis'
import VueMeta from 'vue-meta'
Vue.prototype.$eventHub = new Vue() // Global event bus

Vue.config.productionTip = false
Vue.use(JsCookie, VueKinesis,VueMeta)

new Vue({
  vuetify,
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
