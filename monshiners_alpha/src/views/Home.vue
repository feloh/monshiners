<template>
  <v-app>
    <v-app-bar
        app
        fixed
        color="transparent"
        elevation="0"
        inverted-scroll
        ref="appBar"
    >
      <v-row no-gutters class="pl-3">
        <Language/>
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
    <v-main id="root">
      <v-container fluid class="pa-0">
        <!--First Section-->
        <kinesis-container>
          <kinesis-element :strength="0.2" type="scale">
            <v-img
                :src="`${saisonphasen.assets.jumbotron.url}?h=1000&&fm=jpg&fl=progressive&q=100`"
                :lazy-src="`${saisonphasen.assets.jumbotron.url}?w=400&h=500&fit=thumb&fm=jpg&fl=progressive&q=90`"
                gradient="to top, rgba(0,0,0,0), rgba(0,0,0,0.40)"
                style="padding-bottom: 50px"
                max-height="1000px"
            >
              <kinesis-element :strength="0.6" type="scale" name="title" class="ma-8">
                <v-img
                    :src="white"
                    min-width="100px"
                    max-width="300px"
                    class="mx-auto"
                />
              </kinesis-element>
              <bottle :src="produktbild.url"/>
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
              </div>
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
            height="1000"
            :src="`${saisonphasen.assets.hintergrund.url}?h=1200&fm=jpg&fl=progressive&q=100`"
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
        <collage :src="saisonphasen.assets.collage"/>
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
            :src="`${saisonphasen.assets.videoParallaxStandbild.url}?h=1000&&fm=jpg&fl=progressive&q=100`"
            :lazy-src="`${saisonphasen.assets.videoParallaxStandbild.url}?w=400&h=500&fit=thumb&fm=jpg&fl=progressive&q=90`"
            gradient="to bottom, rgba(0,0,0,0), rgba(0,0,0,0.40)"
            style="padding-bottom: 50px"
            max-height="1000px"
        >
          <season :jahreszeit="jahreszeit" :saisonphasen="saisonphasen"/>
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
        <gallery :src="saisonphasen.assets.detail"/>
        <custom-footer/>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Gallery from "@/components/gallery"
import Bottle from '@/components/Bottle'
import BaseCard from '@/components/base/Card'
import CustomFooter from '@/components/core/Footer'
import Language from '@/components/core/Language'
import Social from "@/components/Social"
import Fruits from "@/components/Fruits"
import Season from "@/components/season"
import Collage from "@/components/Collage"
import {KinesisElement, KinesisContainer} from 'vue-kinesis'
// import VideoParallax from 'vuetify-video-parallax'

import {mapActions, mapState, mapMutations} from 'vuex'
import {GET_PRODUCT, GET_SEASON} from "@/store/action-types"
import Product from "@/store/modules/product"
import SeasonModule from "@/store/modules/season"

import i18n from '@//plugins/i18n'
import utils from "@/utils/season"


const STORE_SEASON_NAMESPACE = 'season'
const STORE_PRODUCT_NAMESPACE = 'product'

export default {
  name: 'Home',
  components: {
    Collage,
    Season,
    Fruits,
    Social,
    Language,
    CustomFooter,
    Bottle,
    //Polaroid,
    Gallery,
    BaseCard,
    KinesisContainer,
    KinesisElement,
    // VideoParallax
  },
  data: () => ({
    white: require('@/assets/geometry/schirftzug_white.png'),
    black: require('@/assets/geometry/schirftzug_black.png'),
  }),
  methods: {
    ...mapActions(STORE_PRODUCT_NAMESPACE, {
      getProduct: GET_PRODUCT,
    }),
    ...mapActions(STORE_SEASON_NAMESPACE, {
      getSeason: GET_SEASON,
    }),
    ...mapMutations(['setIntersection']),
    activeSeasonContent(season) {
      if (this.currentSeason === season) return this.saisonphasen
    },
    activeSeason(season) {
      return this.currentSeason === season
    },
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
    ...mapState(STORE_SEASON_NAMESPACE, [
      'jahreszeit',
      'saisonphasen'
    ]),
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
    const season = utils.setSeason()
    this.$store.registerModule(STORE_PRODUCT_NAMESPACE, Product)
    if (this.$store.state[STORE_PRODUCT_NAMESPACE].id) return
    this.getProduct(i18n.locale)

    this.$eventHub.$on('locale-changed', () => {
      this.getProduct(i18n.locale)
    })

    this.$store.registerModule(STORE_SEASON_NAMESPACE, SeasonModule)
    if (this.$store.state[STORE_SEASON_NAMESPACE].id) return
    this.getSeason({season: season, locale: i18n.locale})

    this.$eventHub.$on('locale-changed', () => {
      this.getSeason({season: season, locale: i18n.locale})
    })
  },
  mounted() {
    this.currentSeason = utils.setSeason()
  }
}
</script>

<style lang="sass">
@import '~vuetify/src/styles/styles.sass'
body
  overflow-x: hidden

.parallax-container

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
