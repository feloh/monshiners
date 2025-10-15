<template>
  <kinesis-container>
    <kinesis-element :type="$vuetify.breakpoint.smAndDown ? 'translate' : 'scale'" :strength="$vuetify.breakpoint.smAndDown ? 5 : 0.5">
      <v-img
          :src="`${src}?w=450&fl=progressive&q=100`"
          :lazy-src="`${src}?w=450&fl=progressive&q=100`"
          :width="$vuetify.breakpoint.mdAndUp ? 250 : 100"
          class="mx-auto"
      />
      <p class="d-flex flex-column" v-if="description">
        <span class="text-center text-h5 text-black">Name</span>
        <span class="text-center text-h5 text-black">Jahrgang</span>
      </p>
    </kinesis-element>
  </kinesis-container>
</template>

<script>
import {KinesisElement, KinesisContainer} from 'vue-kinesis'
import bottleImage from '@/assets/img/Monshiners_Obstbrand_Quitte_35cl_klein.png'

export default {
name: "Bottle",
  components:{
    KinesisContainer,
    KinesisElement,
  },
  props: {
    src: {
      type: String,
      default: 'overlays/scratches.jpg'
    },
    description: {
      type: Boolean,
      default: false
    }
  },
  data:() => ({
    bottle: bottleImage
})
}
</script>

<style scoped>
</style>
