<template>
  <div>
    <v-btn
        class="d-inline"
        color="transparent"
        elevation="0"
        :dark="!isIntersecting"
        @click="switchTheme(-1)"
    >
      <v-icon>mdi-menu-left-outline</v-icon>
    </v-btn>
    <p
        class="d-inline my-auto"
        :class="isIntersecting ? 'black--text' : 'white--text'"
    >
      {{ currentTheme.name }}
    </p>
    <v-btn
        class="d-inline"
        color="transparent"
        elevation="0"
        :dark="!isIntersecting"
        @click="switchTheme(+1)"
    >
      <v-icon>mdi-menu-right-outline</v-icon>
    </v-btn>
  </div>
</template>


<script>
import {mapActions, mapState} from "vuex";
import {SWITCH_THEME} from "@/store/action-types"

const STORE_THEME_NAMESPACE = 'theme'

export default {
  name: "Switcher",
  props: ['color'],
  methods: {
    ...mapActions(STORE_THEME_NAMESPACE, {
      switchTheme: SWITCH_THEME
    }),
  },
  computed: {
    ...mapState(STORE_THEME_NAMESPACE, [
      'currentTheme'
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
