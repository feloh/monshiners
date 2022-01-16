<template>
  <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-top-transition"
  >
    <v-img
        class="white"
        :src="require(`@/assets/${src}`)"
        aspect-ratio="1"

    >
    </v-img>
  </v-dialog>
</template>

<script>
export default {
name: "FullScreenImage",
  props: {
    src: {
      type: String,
      default: 'overlays/scratches.jpg'
    },
    dialog: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>

</style>
