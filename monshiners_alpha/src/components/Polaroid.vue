<template>
    <kinesis-container>
      <kinesis-element :strength="8" type="depth">
  <v-card
      width="100%"
      class="mx-auto pa-4 pa-md-7"
      elevation="8"
  >
    <v-img
        :src="src"
        aspect-ratio="1"
    >
      <v-img
          v-if="overlay"
          :src="require('@/assets/overlays/scratches.jpg')"
          aspect-ratio="1"
          style="mix-blend-mode: screen"
      ></v-img>
    </v-img>
    <v-card-title
       style="height: 80px"
    >
    </v-card-title>
  </v-card>
      </kinesis-element>
    </kinesis-container>
</template>

<script>
import Vue from 'vue'
import { KinesisContainer, KinesisElement} from 'vue-kinesis'

Vue.component('kinesis-container', KinesisContainer)
Vue.component('kinesis-element', KinesisElement)

export default {
  name: "Polaroid",
  props: {
    src: {
      type: String,
      default: 'overlays/scratches.jpg'
    },
    components: {
      KinesisContainer,
      KinesisElement
    },
    overlay: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>

</style>
