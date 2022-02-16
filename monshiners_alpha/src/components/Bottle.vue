<template>
  <kinesis-container>
    <kinesis-element :strength="20" type="translate">
      <v-img
          :src="`${src}?w=450&fl=progressive&q=100`"
          :width="$vuetify.breakpoint.mdAndUp ? 350 : 200"
          class="mx-auto"
          style="mix-blend-mode: screen"
      />
    </kinesis-element>
  </kinesis-container>
</template>

<script>
import { KinesisContainer, KinesisElement} from 'vue-kinesis'

export default {
name: "Bottle",
  components: {
  KinesisContainer,
    KinesisElement
  },
  props: {
    src: {
      type: String,
      default: 'overlays/scratches.jpg'
    }
  }
}
</script>

<style scoped>
</style>
