import Vue from 'vue'
import Vuex from 'vuex'
import { set } from '@/utils/vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fullScreenImage: {
      state: false,
      src: '',
    },
    socials: [
      {
        name: 'Facebook',
        href: 'https://www.facebook.com/monshinersObstbrand',
        color: 'black',
        icon: 'mdi-facebook'
      },
      {
        name: 'Instagram',
        href: 'https://www.instagram.com/monshiners_obstbrand/',
        color: 'black',
        icon: 'mdi-instagram'
      }
    ],
    links: [
      'aboutUs',
      'products',
      'shop'
    ],
    themes: [],
    intersection: false,
    drawerState: false,
  },
  mutations: {
    setSrcFullScreenImage(state, src){
      state.fullScreenImage.src = src
    },
    toggleFullScreenImage(state){
      state.fullScreenImage.state = !state.fullScreenImage.state
    },
    Confirmation() {
    },
    toggleDrawerState (state, data) {
      state.drawerState = data
    },
    setIntersection: set('intersection'),

  },
  getters: {
    drawerState: (state) => state.drawerState
  },
  actions: {
    openFullScreenImage({commit}, src){
      commit('setSrcFullScreenImage', src)
      commit('toggleFullScreenImage')
    },
    closeFullScreenImage({commit}) {
      commit('toggleFullScreenImage')
    },
    Confirmation() {
    }
  },
  modules: {
  }
})
