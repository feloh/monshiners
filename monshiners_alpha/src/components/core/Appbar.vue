<template>
  <v-app-bar
      app
      fixed
      color="transparent"
      elevation="0"
      inverted-scroll
      ref="appBar"
  >
    <v-btn
        v-if="$vuetify.breakpoint.smAndDown"
        color="darkgreen"
        elevation="0"
        dark
        @click="drawerState = !drawerState"
    >
      <v-icon>mdi-menu</v-icon>
    </v-btn>
    <v-row no-gutters>
      <Language v-if="$vuetify.breakpoint.mdAndUp"/>
      <v-spacer></v-spacer>
      <switcher v-if="$vuetify.breakpoint.mdAndUp"></switcher>
      <v-spacer></v-spacer>
      <social
          v-for="s in socials"
          :key="socials.indexOf(s)"
          :color="isIntersecting ? 'black' : 'white'"
          :src="s.href"
          :icon="s.icon"
      >
      </social>
    </v-row>
  </v-app-bar>
</template>

<script>
import Social from "@/components/Social"
import Switcher from "@/components/Switcher"
import Language from '@/components/core/Language'
import {mapState} from "vuex"

export default {
  name: "Appbar",
  props: {
    color:{
      type:String,
      default:'primary'
    }},
  components:{
    Switcher,
    Social,
    Language
  },
  computed: {
    ...mapState(['socials']),
    isIntersecting: {
      get () {
        return this.$store.state.intersection
      },
      set (val) {
        this.setIntersection(val)
      }
    },
    drawerState: {
      get () { return this.$store.getters.drawerState },
      set (v) { return this.$store.commit('toggleDrawerState', v) }
    }
  }
}
</script>

<style scoped>

</style>
