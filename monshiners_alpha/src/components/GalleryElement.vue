<template>
  <v-col cols="12" md="3" sm="6">
  <v-card
      width="100%"
      elevation="0"
  >
    <v-img
        class="white"
        :src="`${src}?w=500&h=500&fm=jpg&fl=progressive&q=100`"
        :lazy-src="`${src}?w=360&h=250&fit=thumb&fm=jpg&fl=progressive&q=90`"
        aspect-ratio="1"

    />
  </v-card>
  </v-col>
</template>

<script>

export default {
  name: "GalleryElement",
  props: {
    src: {
      type: String,
      default: 'overlays/scratches.jpg'
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
