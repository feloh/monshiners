<template>
  <v-container fluid>
    <v-card>
      <v-row justify="center">
      <v-card-title
          class="text-md-h5 font-weight-bold mb-4"
      >
        {{ titel }}
      </v-card-title>
      </v-row>
      <v-card-text>
        <v-row justify="center">
          <fruit
              v-for="(eintrag, index) in eintrge"
              :key="index"
              :index="index"
              :titel="eintrag.name"
              :text="eintrag.kurzbeschreibung"
              :src="eintrag.bild.url"
          ></fruit>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import Fruit from "@/components/fruit"
import Ingredients from "@/store/modules/ingredients"
import {GET_INGREDIENTS} from "@/store/action-types"
import {mapActions, mapState} from "vuex"
import i18n from "@/plugins/i18n";

const STORE_INGREDIENTS_NAMESPACE = 'ingredients'

export default {
  name: "Fruits",
  components: {
    Fruit
  },
  methods: {
    ...mapActions(STORE_INGREDIENTS_NAMESPACE, {
      getIngredients: GET_INGREDIENTS,
    }),
  },
  computed: {
    ...mapState(STORE_INGREDIENTS_NAMESPACE, [
        'eintrge',
        'titel'
    ])
  },
  created() {
    this.$store.registerModule(STORE_INGREDIENTS_NAMESPACE, Ingredients)
    if (this.$store.state[STORE_INGREDIENTS_NAMESPACE].id) return
    this.getIngredients(i18n.locale)

    this.$eventHub.$on('locale-changed',() => {this.getIngredients(i18n.locale)})
  },

}
</script>

<style scoped>

</style>
