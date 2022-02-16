<template>
  <kinesis-container event="scroll">
  <v-container fluid class="pa-5">
<!--    <v-row justify-md="space-around">
      <v-col md="4">
        <v-img

            :src="`${src[0].url}?h=300&fm=jpg&fl=progressive&q=100`"
        />
      </v-col>
      <v-col md="3" align-self="center">
        <v-img
            :src="`${src[1].url}?w=1000&fm=jpg&fl=progressive&q=100`"
        />
      </v-col>
      <v-col md="3">
        <v-img

            :src="`${src[2].url}?w=1000&fm=jpg&fl=progressive&q=100`"
        />
      </v-col>
    </v-row>-->
    <v-row justify-md="space-around">
      <v-col
          md="6"
          order="2"
          order-md="1"
          align-self="center"
      >
        <kinesis-element :strength=30 type="translate" axis="x" maxx="5"	 :active="!this.$vuetify.breakpoint.mobile">
        <v-img
            :src="`${src[0].url}?w=600&fm=jpg&fl=progressive&q=100`"
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
        <kinesis-element :strength=-30 type="translate" axis="x" maxx="5"	 :active="!this.$vuetify.breakpoint.mobile">
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
                  class="text-md-h6 text-uppercase font-weight-medium mx-auto text-center"
              >
                {{about.bestandteile[0].titel}}
              </v-card-subtitle>
              <v-card-text
                  class="font-weight-medium text-md-subtitle-1"
              >
                {{about.bestandteile[0].inhalt[0].content[0].value}}
              </v-card-text>
            </v-card>
        </kinesis-element>
      </v-col>
    </v-row>
<!--    <v-row>
      <v-col cols=12 md="3">
        <polaroid class="pl-md-3" :src="`${src[8].url}?h=300&fm=jpg&fl=progressive&q=100`"/>
      </v-col>
      <v-col cols="12" md="2" align-self="start">
        <v-img

            :src="`${src[9].url}?h=300&fm=jpg&fl=progressive&q=100`"
            aspect-ratio="1"
        />
      </v-col>
      <v-col cols="12" md="2">
        <v-row>
          <v-col cols="12" md="12">
            <v-img
                max-width="400"
                class="mx-auto"
                :src="`${src[10].url}?h=300&fm=jpg&fl=progressive&q=100`"
                aspect-ratio="1.3"
            />
          </v-col>
          <v-col cols="12" md="12">
            <v-img
                max-width="400"
                class="mx-auto"
                :src="`${src[11].url}?h=300&fm=jpg&fl=progressive&q=100`"
                aspect-ratio="1.3"
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="5">
        <div class="video-container">
          <video :src="src[12].url" class="video" autoplay loop muted/>
        </div>
      </v-col>
    </v-row>-->
  </v-container>
  </kinesis-container>
  <!--        <div class="video-container">
          <video :src="src[3].url" class="video" autoplay loop muted/>
        </div>-->
</template>

<script>
// import Polaroid from "@/components/Polaroid"
import{KinesisElement, KinesisContainer} from 'vue-kinesis'

export default {
  name: "Collage",
  components: {
    KinesisContainer,
    KinesisElement,
    // Polaroid
  },
  data: () => ({
    black: require('@/assets/geometry/schirftzug_black.png')
  }),
  props: {
    src: {
      type: Array,
      default: (() => [])
    },
    about: {
      type: Object,
      default: (() => {})
    },
  }
}
</script>

<style scoped>
.video-container {
  /* width is set as 100% here. any width can be specified as per requirement */
  width: 100%;
  padding-top: 0;
  height: 100%;
  position: relative;
}

.video {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  object-fit: fill !important;
}
</style>
