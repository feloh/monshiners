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
        v-if="currentTheme"
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
import {GET_THEME, SWITCH_THEME} from "@/store/action-types"
import ThemeModule from "@/store/modules/theme"
import i18n from "@/plugins/i18n";

const STORE_THEME_NAMESPACE = 'theme'

export default {
  name: "Switcher",
  props: ['color'],
  methods: {
    ...mapActions(STORE_THEME_NAMESPACE, {
      getTheme: GET_THEME,
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
  },
  created() {
    this.$store.registerModule(STORE_THEME_NAMESPACE, ThemeModule)
    if (this.$store.state[STORE_THEME_NAMESPACE].id) return
    this.getTheme({locale: i18n.locale})
    this.$eventHub.$on('locale-changed', () => {
      this.getTheme({locale: i18n.locale})
    })
  }
}
</script>

<style scoped>

</style>
