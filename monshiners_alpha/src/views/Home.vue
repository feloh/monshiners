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
                :lazy-src="`${currentTheme.jumbotron.url}?h=200&fit=thumb&fm=jpg&fl=progressive&q=50`"
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
          <intro :inhalt="INTRO_INHALT"/>
        </intersection>
        <!--Third Section-->
        <ParallaxSection
            v-if="currentTheme && currentTheme.hintergrund"
            :height="$vuetify.breakpoint.smAndDown ? 500 : 800"
            :src="`${currentTheme.hintergrund.url}?h=1200&fm=jpg&fl=progressive&q=100`"
        >
          <v-container fluid>
            <v-row justify="center">
              <v-col
                  class="text-h4 text-white  font-weight-medium text-center"
                  md="6"
              >
                {{ $t("home.quote") }}
              </v-col>
            </v-row>
          </v-container>
        </ParallaxSection>
        <!--Fourth Section-->
        <intersection :on-intersect="onIntersect" :threshold="threshold">
          <about :titel="ABOUT_TITLE" :inhalt="ABOUT_INHALT"/>
        </intersection>
        <!--Fifth Section-->
        <ParallaxSection
            v-if="currentTheme && currentTheme.videoParallaxStandbild"
            :height="$vuetify.breakpoint.smAndDown ? 500 : 800"
            :gradient="'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.40))'"
            :src="`${currentTheme.videoParallaxStandbild.url}?h=1000&&fm=jpg&fl=progressive&q=100`"
        />
        <intersection :on-intersect="onIntersect" :threshold="threshold">
          <gallery :src="currentTheme.detail"/>
        </intersection>
        <!--Fullscreen Image-->
        <full-screen-image></full-screen-image>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import {Gallery, FullScreenImage, Intro} from '@/components/home'
import {Intersection, ParallaxSection} from '@/components/base'
import About from "@/components/About"
import {KinesisElement, KinesisContainer} from 'vue-kinesis'
import {mapActions, mapState, mapMutations} from 'vuex'
import {GET_REFERENCE} from "@/store/action-types"
import Reference from "@/store/modules/reference"

import i18n from '@/plugins/i18n'
import whiteLogo from '@/assets/geometry/monshiners_schriftzug_weiss.png'
import blackLogo from '@/assets/geometry/monshiners_schriftzug_schwarz.png'
import lazyLogo from '@/assets/img/monshiners_obstbrand_logo.jpg'

const STORE_THEME_NAMESPACE = 'theme'
const STORE_REFERENCE_NAMESPACE = 'reference'

export default {
  name: 'Home',
  components: {
    Intro,
    About,
    Gallery,
    KinesisContainer,
    KinesisElement,
    Intersection,
    ParallaxSection,
    FullScreenImage
  },
  data: () => ({
    // gif_logo: require('@/assets/geometry/monshiners_logo_animated.png'),
    white: whiteLogo,
    black: blackLogo,
    lazy: lazyLogo,
    t: null,
    loading: false,
    INTRO_INHALT: '',
    ABOUT_TITLE: '',
    ABOUT_INHALT: ''
  }),
  methods: {
    ...mapActions(STORE_REFERENCE_NAMESPACE, {
      getReference: GET_REFERENCE,
    }),
    ...mapMutations(['setIntersection', 'setIndex']),
    // eslint-disable-next-line
    onIntersect(entries, observer) {
      const ratio = entries[0].intersectionRatio
      const boundingRect = entries[0].boundingClientRect
      const intersectionRect = entries[0].intersectionRect

      if (ratio === 0) this.isIntersecting = false
      else if (ratio < 1) {
        this.isIntersecting = boundingRect.top < intersectionRect.top;
      } else this.isIntersecting = true
    }
  },
  computed: {
    ...mapState(['socials']),
    ...mapState(STORE_THEME_NAMESPACE, ['currentTheme']),
    ...mapState(STORE_REFERENCE_NAMESPACE, [
      'bestandteile'
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
  async created() {
    this.loading = true

    const id = '2UXMuzteex84qEplFFuCvV'
    this.$store.registerModule(STORE_REFERENCE_NAMESPACE, Reference)
    if (this.$store.state[STORE_REFERENCE_NAMESPACE].id) return
    await this.getReference({locale: i18n.locale, id: id})
    this.INTRO_INHALT = this.bestandteile[0].inhalt[0].content[0].value
    this.ABOUT_TITLE = this.bestandteile[1].titel
    this.ABOUT_INHALT = this.bestandteile[1].inhalt[0].content[0].value

    this.$eventHub.on('locale-changed', async () => {
      await this.getReference({locale: i18n.locale, id: id})
      this.INTRO_INHALT = this.bestandteile[0].inhalt[0].content[0].value
      this.ABOUT_TITLE = this.bestandteile[1].titel
      this.ABOUT_INHALT = this.bestandteile[1].inhalt[0].content[0].value
    })

    this.loading = false
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
