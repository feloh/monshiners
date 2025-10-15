<template>
  <v-app-bar
      app
      fixed
      color="transparent"
      elevation="0"
      ref="appBar"
  >
    <v-btn
        aria-label="Menu"
        v-if="$vuetify.breakpoint.smAndDown"
        color="accent1"
        elevation="0"
        variant="flat"
        class="text-white"
        @click="drawerState = !drawerState"
    >
      <v-icon>mdi-menu</v-icon>
    </v-btn>
    <v-row class="ma-0 pa-0" align="center">
      <Language v-if="$vuetify.breakpoint.mdAndUp"/>
      <v-spacer></v-spacer>
      <switcher v-if="$vuetify.breakpoint.mdAndUp"></switcher>
      <v-spacer></v-spacer>
      <v-col cols="auto" align-self="center">
        <div className = "ec-cart-widget"/>
        <div>
        </div>
      </v-col>
      <v-col cols="auto" align-self="center">
          <v-btn
              @click="goToCheckout()"
              rounded
              variant="tonal"
          >
            <v-badge
                :color="cartProductsQuantity > 0 ? 'accent1' : 'transparent'"
                :content="cartProductsQuantity"
                overlap
            >
            <v-icon
                size="large"
                :color="isIntersecting ? 'black' : 'white'"
            >
              mdi-cart
            </v-icon>
            </v-badge>
          </v-btn>
        </v-col>
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
import Ecommerce from '@/utils/ecwid'

const ecommerce = new Ecommerce({
  storeId: 74850001,
  storeLocationPath: "/store/",
})

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
  },
  mounted() {
    this.getCart()
  },
  beforeUpdate() {
    this.getCart()
  },
  methods: {
    goToCheckout() {
      ecommerce.cart.goToCheckout()
    },
    getCart() {
      ecommerce.cart.get().then((result) => {
        if (result === undefined) {
          return
        }
        this.cartProductsQuantity = result.productsQuantity
      })
    }
  }
}
</script>

<style scoped>

</style>
