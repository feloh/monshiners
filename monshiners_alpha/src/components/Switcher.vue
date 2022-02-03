<template>
  <div>
    <v-btn
        class="d-inline"
        color="transparent"
        elevation="0"
        :dark="!isIntersecting"
    >
      <v-icon>mdi-menu-left-outline</v-icon>
    </v-btn>
    <p
        class="d-inline-block"
        :class="isIntersecting ? 'black--text' : 'white--text'"
    >
      {{ name }}
    </p>
    <v-btn
        class="d-inline"
        color="transparent"
        elevation="0"
        :dark="!isIntersecting"
    >
      <v-icon>mdi-menu-right-outline</v-icon>
    </v-btn>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "Switcher",
  props: ['color'],
  computed:{
    ...mapState('theme', [
      'name'
    ]),
    isIntersecting: {
      get () {
        return this.$store.state.intersection
      },
      set (val) {
        this.setIntersection(val)
      }
    }
  }
}
</script>

<style scoped>

</style>
