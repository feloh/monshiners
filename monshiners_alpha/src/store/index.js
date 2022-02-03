import Vue from 'vue'
import Vuex from 'vuex'
import { set } from '@/utils/vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fullScreenImage: false,
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
    intersection: false,
    drawerState: false
  },
  mutations: {
    openFullScrennImage(){
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
    openFullScrennImage(){

    },
    Confirmation() {

    }
  },
  modules: {
  }
})
