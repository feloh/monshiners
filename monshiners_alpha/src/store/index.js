import Vue from 'vue'
import Vuex from 'vuex'
import { set } from '@/utils/vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fullScreenImage: false,
    socials: [
      {
        name: 'facebook',
        href: 'https://www.facebook.com/monshinersObstbrand',
        color: 'black',
        icon: 'mdi-facebook'
      },
      {
        name: 'facebook',
        href: 'https://www.instagram.com/monshiners_obstbrand/',
        color: 'black',
        icon: 'mdi-instagram'
      }
    ],
    intersection: false
  },
  mutations: {
    openFullScrennImage(){

    },
    Confirmation() {

    },
    setIntersection: set('intersection'),
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
