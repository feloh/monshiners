<template>
  <kinesis-container event="scroll">
  <v-container fluid class="pa-5">
    <v-row justify-md="space-around">
      <v-col
          md="6"
          order="2"
          order-md="1"
          align-self="center"
      >
        <kinesis-element :strength=30 type="translate" axis="x" :max-x="10"	 :active="!this.$vuetify.breakpoint.mobile">
        <v-img
            :src="logo"
            :height="$vuetify.breakpoint.mdAndUp ? 500 : 200"
            contain
            class="mx-auto"
        />
        </kinesis-element>
      </v-col>
      <v-col
          md="6"
          order="1"
          order-md="2"
          align-self="center"
      >
        <kinesis-element :strength=-30 type="translate" axis="x" :max-x="10"	 :active="!this.$vuetify.breakpoint.mobile">
            <v-card
                max-width="750px"
                class="mx-auto"
            >
              <v-img
                  :src="black"
                  min-width="100px"
                  max-width="400px"
                  class="mx-auto"
              />
              <v-card-subtitle
                  v-if="titel"
                  class="text-md-h6 text-uppercase font-weight-medium mx-auto text-center"
              >
                {{titel}}
              </v-card-subtitle>
              <v-card-text
                  v-if="inhalt"
                  class="font-weight-medium text-md-subtitle-1"
              >
                {{inhalt[0].content[0].value}}
              </v-card-text>
            </v-card>
        </kinesis-element>
      </v-col>
    </v-row>
  </v-container>
  </kinesis-container>
</template>

<script>
import{KinesisElement, KinesisContainer} from 'vue-kinesis'
import i18n from "@/plugins/i18n"
import {mapActions, mapState} from "vuex"
import {GET_TEXTBLOCK} from "@/store/action-types"
import TextBlock from "@/store/modules/textblock"

const STORE_TEXTBLOCK_NAMESPACE = 'textBlock'

export default {
  name: "Collage",
  components: {
    KinesisContainer,
    KinesisElement
  },
  props: {
    src: {
      type: Array,
      default: (() => [])
    },
    about: {
      type: Object,
      default: (() => {})
    },
  },
  data: () => ({
    black: require('@/assets/geometry/monshiners_schriftzug_schwarz.png'),
    logo: require('@/assets/img/monshiners_logo.jpg')
  }),
  methods:{
    ...mapActions(STORE_TEXTBLOCK_NAMESPACE, {
      getTextBlock: GET_TEXTBLOCK,
    }),
  },
  computed:{
    ...mapState(STORE_TEXTBLOCK_NAMESPACE, [
        'titel',
        'inhalt'
    ]),
  },
  created() {
    const id = '31t7T9CD9kHv3kzSbldhOm'
    this.$store.registerModule(STORE_TEXTBLOCK_NAMESPACE, TextBlock)
    if (this.$store.state[STORE_TEXTBLOCK_NAMESPACE].id) return
    this.getTextBlock({locale: i18n.locale, id: id})
    this.$eventHub.$on('locale-changed', () => {
      this.getTextBlock({locale: i18n.locale , id: id})
    })
  }
}
</script>

<style scoped>
</style>
