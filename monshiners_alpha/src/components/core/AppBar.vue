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
        aria-label="Menu"
        v-if="$vuetify.breakpoint.smAndDown"
        color="darkgreen"
        elevation="0"
        dark
        @click="drawerState = !drawerState"
    >
      <v-icon>mdi-menu</v-icon>
    </v-btn>
    <v-row no-gutters>
      <Language v-if="$vuetify.display.mdAndUp"/>
      <v-spacer></v-spacer>
      <switcher v-if="$vuetify.display.mdAndUp"></switcher>
<!--      <v-col cols="auto" align-self="center">
          <v-btn
              href="https://monshiners.odoo.com/shop"
              target="_blank"
              rel="noopener"
              dark
              rounded
          >
            <v-icon
                :color="isIntersecting ? 'black' : 'white'"
            >
              mdi-cart
            </v-icon>
          </v-btn>
        </v-col>-->
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
import Social from "@/components/appbar/Social"
import Switcher from "@/components/appbar/Switcher"
import Language from '@/components/appbar/Language'
import {mapState} from "vuex"

export default {
  name: "Appbar",
  components:{
    Switcher,
    Social,
    Language
  },
  computed: {
    ...mapState(['socials']),
    isIntersecting: {
      get () { return this.$store.state.intersection },
      set (val) { this.setIntersection(val) }
    },
    drawerState: {
      get () { return this.$store.getters.drawerState },
      set (v) { return this.$store.commit('toggleDrawerState', v) }
    },
    cartProductsQuantity: {
      get () { return this.$store.state.cartProductsQuantity },
      set (v) { return this.$store.commit('setCartProductsQuantity', v ) }
    }
  }
}
</script>

<style scoped>

</style>
