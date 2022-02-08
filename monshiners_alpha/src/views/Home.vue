<template>
  <v-app>
    <custom-app-bar/>
    <v-main id="root">
      <v-container fluid class="pa-0">
        <!--First Section-->
        <kinesis-container>
          <kinesis-element :strength="0.2" type="scale">
            <v-img
                :src="`${currentTheme.jumbotron.url}?h=1000&&fm=jpg&fl=progressive&q=100`"
                :lazy-src="`${currentTheme.jumbotron.url}?w=400&h=500&fit=thumb&fm=jpg&fl=progressive&q=50`"
                gradient="to top, rgba(0,0,0,0), rgba(0,0,0,0.40)"
                style="padding-bottom: 50px"
                max-height="1000"
                class="d-flex align-center"
            >
              <kinesis-element :strength="0.6" type="scale" name="title">
<!--                <v-img
                    :src="white"
                    min-width="100px"
                    max-width="300px"
                    class="mx-auto"
                />-->
                <v-img
                    :src="gif_logo"
                    width="210px"
                    max-width="700px"
                    class="mx-auto"
                    style="filter:invert(1)"
                />
              </kinesis-element>
<!--              <bottle :src="produktbild.url"/>
              <div class="my-8 my-md-4">
                <v-row justify="center">
                  <v-btn
                      color="darkgreen"
                      elevation="3"
                      dark
                      tile
                      class="font-weight-bold"
                      href="/"
                      disabled
                  >
                    {{ $t("home.btn") }}
                  </v-btn>
                </v-row>
              </div>-->
            </v-img>
          </kinesis-element>
        </kinesis-container>
        <!--Second Section-->
        <div
            v-intersect="{
          handler: onIntersect,
          options: {
              rootMargin: '0px',
              threshold: threshold
          }
        }"
        >
          <base-card
              m-width="750px"
              style="margin-bottom: 50px"
          >
            <template v-slot:text>
              {{ beschreibung.content[0].content[0].value }}
            </template>
          </base-card>
          <fruits/>
        </div>
        <!--Third Section-->
        <v-parallax
            :height="$vuetify.breakpoint.mdAndUp ? 1000 : 500"
            :src="`${currentTheme.hintergrund.url}?h=1200&fm=jpg&fl=progressive&q=100`"
            :lazy-src="`${currentTheme.hintergrund.url}?h=500&fm=jpg&fl=progressive&q=50`"
        >
          <v-container fluid>
            <v-row justify="center">
              <v-col
                  md="6"
                  class="text-h4 white--text  font-weight-medium text-center"
              >
                {{ $t("home.quote") }}
              </v-col>
            </v-row>
          </v-container>
        </v-parallax>
        <!--Fourth Section-->
        <div
            v-intersect="{
          handler: onIntersect,
          options: {
              rootMargin: '0px',
              threshold: threshold
          }
        }"
        >
          <collage :src="currentTheme.collage"/>
          <!--        <video-parallax
              v-if="videoParallax.url"
              height="400"
              :img="`${videoParallaxStandbild.url}?h=900&fm=jpg&fl=progressive&q=100`"
              :src="videoParallax.url"
          >
          </video-parallax>-->
        </div>
        <!--Fifth Section-->
        <v-img
            :src="`${currentTheme.videoParallaxStandbild.url}?h=1000&&fm=jpg&fl=progressive&q=100`"
            :lazy-src="`${currentTheme.videoParallaxStandbild.url}?w=400&h=500&fit=thumb&fm=jpg&fl=progressive&q=90`"
            gradient="to bottom, rgba(0,0,0,0), rgba(0,0,0,0.40)"
            style="padding-bottom: 50px"
            max-height="1000px"
        >
          <!--season :jahreszeit="jahreszeit" :saisonphasen="saisonphasen"/-->
        </v-img>
        <!--        <div id="videoDiv">
                <video
                    id="video"
                    autoplay
                    muted
                    loop
                    :src="`${saisonphasen.assets.videoParallax.url}?h=1000&fm=mp4&fl=progressive&q=100`"
                >
                </video>
                <v-row justify="center" align="center" style=" width:100%; height: 100%;z-index: 1">
                  <season :jahreszeit="jahreszeit" :saisonphasen="saisonphasen"/>
                </v-row>
                </div>-->
        <!--Sixt Section-->
        <div
            v-intersect="{
          handler: onIntersect,
          options: {
              rootMargin: '0px',
              threshold: threshold
          }
        }"
        >
          <gallery :src="currentTheme.detail"/>
          <custom-footer/>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Gallery from "@/components/gallery"
// import Bottle from '@/components/Bottle'
import BaseCard from '@/components/base/Card'
import CustomAppBar from '@/components/core/Appbar'
import CustomFooter from '@/components/core/Footer'
import Fruits from "@/components/Fruits"
import Collage from "@/components/Collage"
import {KinesisElement, KinesisContainer} from 'vue-kinesis'
// import VideoParallax from 'vuetify-video-parallax'

import {mapActions, mapState, mapMutations} from 'vuex'
import {GET_PRODUCT, GET_THEME} from "@/store/action-types"
import Product from "@/store/modules/product"
import ThemeModule from "@/store/modules/theme"

import i18n from '@//plugins/i18n'

const STORE_THEME_NAMESPACE = 'theme'
const STORE_PRODUCT_NAMESPACE = 'product'

export default {
  name: 'Home',
  components: {
    Collage,
    Fruits,
    CustomAppBar,
    CustomFooter,
    // Bottle,
    //Polaroid,
    Gallery,
    BaseCard,
    KinesisContainer,
    KinesisElement,
    // VideoParallax
  },
  data: () => ({
    gif_logo: require('@/assets/geometry/monshiners_logo_animated.png'),
    white: require('@/assets/geometry/schirftzug_white.png'),
    black: require('@/assets/geometry/schirftzug_black.png'),
    t: null
  }),
  methods: {
    ...mapActions(STORE_PRODUCT_NAMESPACE, {
      getProduct: GET_PRODUCT,
    }),
    ...mapActions(STORE_THEME_NAMESPACE, {
      getTheme: GET_THEME
    }),
    ...mapMutations(['setIntersection','setIndex']),
    // eslint-disable-next-line
    onIntersect (entries, observer) {
      const ratio = entries[0].intersectionRatio
      const boundingRect = entries[0].boundingClientRect
      const intersectionRect = entries[0].intersectionRect

      if (ratio === 0) this.isIntersecting = false
      else if (ratio < 1) {
        if (boundingRect.top < intersectionRect.top) this.isIntersecting = true
        else this.isIntersecting = false
      }
      else this.isIntersecting = true
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
      get () {
        return this.$store.state.intersection
      },
      set (val) {
        this.setIntersection(val)
      }
    },
    threshold (){
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

    this.$store.registerModule(STORE_THEME_NAMESPACE, ThemeModule)
    if (this.$store.state[STORE_THEME_NAMESPACE].id) return
    this.getTheme({locale: i18n.locale})

    this.$eventHub.$on('locale-changed', () => {
      this.getTheme({locale: i18n.locale})
    })
  },
  mounted (){
  }
}
</script>

<style lang="sass">
@import '~vuetify/src/styles/styles.sass'
body
  overflow-x: hidden

#videoDiv
  width: 100%
  height: 1000px
  position: relative
  overflow: hidden

#video
  position: absolute
  z-index: 0
  height: 100%


.v-speed-dial
  position: absolute

.v-btn--floating
  position: relative

.fixed_backround
  min-height: 100%
  position: relative
  overflow: hidden

  &::before
    background-repeat: no-repeat
    background-attachment: fixed
    background-size: cover
    content: ''
    height: 100%
    left: 0
    top: 0
    width: 100%
    position: absolute
    z-index: -0
    @media #{map-get($display-breakpoints, 'md-and-down')}
      background-image: none
</style>
