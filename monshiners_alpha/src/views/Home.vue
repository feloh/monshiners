<template>
  <v-app>
    <v-main id="root">
      <v-container class="pa-0" fluid>
        <!--First Section-->
        <kinesis-container>
          <kinesis-element :strength="0.2" type="scale">
            <v-img
                v-if="currentTheme"
                :height="$vuetify.breakpoint.mdAndUp ? 750 : 400"
                :lazy-src="`${lazy}?h=200&fit=thumb&fm=jpg&fl=progressive&q=50`"
                :src="`${currentTheme.jumbotron.url}?h=1000&&fm=jpg&fl=progressive&q=100`"
                class="d-flex align-center"
                gradient="to top, rgba(0,0,0,0), rgba(0,0,0,0.40)"
                style="padding-bottom: 50px"
            >
              <kinesis-element :strength="0.6" name="title" type="scale">
                <!--                <v-img
                                    :src="white"
                                    min-width="100px"
                                    max-width="300px"
                                    class="mx-auto"
                                />-->
                <v-img
                    :src="black"
                    :width="$vuetify.breakpoint.mdAndUp ? 360 :210"
                    class="mx-auto"
                    style="filter:invert(1)"
                />
              </kinesis-element>
            </v-img>
          </kinesis-element>
        </kinesis-container>
        <!--Second Section-->
        <intersection :on-intersect="onIntersect" :threshold="threshold">
          <base-card
              m-width="750px"
              style="margin-bottom: 50px"
          >
            <template v-slot:text>
              {{  }}
            </template>
          </base-card>
          <fruits/>
        </intersection>
        <!--Third Section-->
        <v-parallax
            :height="$vuetify.breakpoint.mdAndUp ? 800 : 500"
            :lazy-src="`${currentTheme.hintergrund.url}?h=500&fm=jpg&fl=progressive&q=50`"
            :src="`${currentTheme.hintergrund.url}?h=1200&fm=jpg&fl=progressive&q=100`"
        >
          <v-container fluid>
            <v-row justify="center">
              <v-col
                  class="text-h4 white--text  font-weight-medium text-center"
                  md="6"
              >
                {{ $t("home.quote") }}
              </v-col>
            </v-row>
          </v-container>
        </v-parallax>
        <!--Fourth Section-->
        <intersection :on-intersect="onIntersect" :threshold="threshold">
          <about/>
        </intersection>
        <!--Fifth Section-->
        <v-img
            :height="$vuetify.breakpoint.mdAndUp ? 800 : 500"
            :lazy-src="`${currentTheme.videoParallaxStandbild.url}?w=400&h=500&fit=thumb&fm=jpg&fl=progressive&q=90`"
            :src="`${currentTheme.videoParallaxStandbild.url}?h=1000&&fm=jpg&fl=progressive&q=100`"
            class="d-flex justify-center align-center"
            gradient="to bottom, rgba(0,0,0,0), rgba(0,0,0,0.40)"
            style="padding-bottom: 50px"
        >
          <bottle :src="produktbild.url"/>
        </v-img>
        <intersection :on-intersect="onIntersect" :threshold="threshold">
          <gallery :src="currentTheme.detail"/>
        </intersection>>
        <!--Fullscreen Image-->
        <full-screen-image></full-screen-image>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import {Bottle,Fruits, Gallery, FullScreenImage} from '@/components/home'
import {Card as BaseCard, Intersection} from '@/components/base'
import About from "@/components/About"
import {KinesisElement, KinesisContainer} from 'vue-kinesis'
import {mapActions, mapState, mapMutations} from 'vuex'
import {GET_PRODUCT} from "@/store/action-types"
import Product from "@/store/modules/product"

import i18n from '@//plugins/i18n'

const STORE_THEME_NAMESPACE = 'theme'
const STORE_PRODUCT_NAMESPACE = 'product'

export default {
  name: 'Home',
  components: {
    About,
    Fruits,
    Bottle,
    Gallery,
    BaseCard,
    KinesisContainer,
    KinesisElement,
    Intersection,
    FullScreenImage
  },
  data: () => ({
    // gif_logo: require('@/assets/geometry/monshiners_logo_animated.png'),
    white: require('@/assets/geometry/monshiners_schriftzug_weiss.png'),
    black: require('@/assets/geometry/monshiners_schriftzug_schwarz.png'),
    lazy: require('@/assets/img/monshiners_obstbrand_logo.jpg'),
    t: null
  }),
  methods: {
    ...mapActions(STORE_PRODUCT_NAMESPACE, {
      getProduct: GET_PRODUCT,
    }),
    ...mapMutations(['setIntersection', 'setIndex']),
    // eslint-disable-next-line
    onIntersect(entries, observer) {
      const ratio = entries[0].intersectionRatio
      const boundingRect = entries[0].boundingClientRect
      const intersectionRect = entries[0].intersectionRect

      if (ratio === 0) this.isIntersecting = false
      else if (ratio < 1) {
        if (boundingRect.top < intersectionRect.top) this.isIntersecting = true
        else this.isIntersecting = false
      } else this.isIntersecting = true
    }
  },
  computed: {
    ...mapState(['socials']),
    ...mapState(STORE_THEME_NAMESPACE, ['currentTheme']),
    ...mapState(STORE_PRODUCT_NAMESPACE, [
      'produktbild',
      'beschreibung'
    ]),
    isIntersecting: {
      get() {
        return this.$store.state.intersection
      },
      set(val) {
        this.setIntersection(val)
      }
    },
    threshold() {
      return [...Array(100).keys()].map(x => x / 100)
    }
  },
  created() {
    this.$store.registerModule(STORE_PRODUCT_NAMESPACE, Product)
    if (this.$store.state[STORE_PRODUCT_NAMESPACE].id) return
    this.getProduct(i18n.locale)
    this.$eventHub.$on('locale-changed', () => {
      this.getProduct(i18n.locale)
    })
  }
}
</script>

<style lang="sass">
@import '~vuetify/src/styles/styles.sass'
body
  overflow-x: hidden

.v-speed-dial
  position: absolute

.v-btn--floating
  position: relative

</style>
