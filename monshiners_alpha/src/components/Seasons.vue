<template>
  <v-container fluid>
        <v-row class="ma-0" align="stretch" justify-md="space-around">
          <season
              v-for="i in 4"
              :key="i"
              :active="jahreszeit === seasons[i-1]"
              :season="seasons[i-1]"
              :seasonEvent="jahreszeit === seasons[i-1]? saisonphasen.bezeichnung : ''"
              :text="jahreszeit === seasons[i-1]? saisonphasen.beschreibung : defaultText"
          ></season>
        </v-row>
  </v-container>
</template>

<script>
import Season from "@/components/season"
import utils from '@/utils/season'
import SeasonModule from "@/store/modules/season"
import {GET_SEASON} from "@/store/action-types"
import {mapActions, mapState} from "vuex"
import i18n from "@/plugins/i18n"

const STORE_SEASON_NAMESPACE = 'season'

export default {
  name: "Seasons",
  components: {
    Season
  },
  data: () => ({
    currentSeason: '',
    seasons: ['Frühling', 'Sommer', 'Herbst', 'Winter'],
    defaultText: {
      content:{
        content: {
          value: ''
        }
      }}
  }),
  methods: {
    ...mapActions(STORE_SEASON_NAMESPACE, {
      getSeason: GET_SEASON,
    }),
    activeSeasonContent(season) {
      if (this.currentSeason === season) return this.saisonphasen
    },
    activeSeason(season){
      return this.currentSeason === season
    }
  },
  computed: {
    ...mapState(STORE_SEASON_NAMESPACE, [
        'jahreszeit',
        'saisonphasen'
    ]),
  },
  created() {
    this.$store.registerModule(STORE_SEASON_NAMESPACE, SeasonModule)
    if (this.$store.state[STORE_SEASON_NAMESPACE].id) return
    this.getSeason(utils.getSeason())
    this.$eventHub.on('locale-changed',() => { this.getSeason(utils.getSeason(), i18n.locale)})
  },
  mounted() {
    this.currentSeason = utils.getSeason()
  }
}
</script>

<style scoped>

</style>
