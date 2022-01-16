<template>
  <v-card class="py-2">
    <v-carousel
        v-model="carousel"
        height="auto"
        hide-delimiters
    >
      <v-carousel-item
          v-for="slide in reactiveGallery.length"
          :key="slide"
      >
        <v-row dense>
          <gallery-element
              v-for="i in reactiveGallery[slide-1]"
              :key="i"
              :src="src[i].url"
              :overlay="false"
          />
        </v-row>
      </v-carousel-item>
    </v-carousel>
  </v-card>
</template>

<script>
import GalleryElement from '@/components/GalleryElement'

export default {
  name: "gallery",
  components: {
    GalleryElement
  },
  data: () => ({
    carousel: 0
  }),
  props: {
    src: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    array(length, picPerSlide) {
      let array = []
      for (let i = 0; i < this.src.length / picPerSlide; i++) {
        let index = []
        for (let x = 0; x < picPerSlide; x++) {
          if((x+(i*picPerSlide)) > (this.src.length-1)) index.push(x)
          else index.push(x+(i*picPerSlide))
        }
        array.push(index)
      }
      console.log(array)
      return array
    }
  },
  computed: {
    reactiveGallery() {
      let rG = []
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          rG = this.array(this.src.length, 1)
              break
        case 'sm':
          rG = this.array(this.src.length, 2)
              break
        case 'md':
          rG = this.array(this.src.length, 4)
              break
        case 'lg':
          rG = this.array(this.src.length, 4)
          break
      }
      console.log(this.$vuetify.breakpoint.name)
      return rG
    }
  }
}
</script>

<style scoped>

</style>
