<template>
  <v-footer
      color="transparent"
      padless
  >
    <v-container fluid class="pt-md-10">
    </v-container>
    <v-container fluid>
    <v-row
        justify="center"
        no-gutters
        style="height: 50px"
    >
      <social
          class="align-center"
          v-for="s in socials"
          :key="socials.indexOf(s)"
          :name="s.name"
          :color="s.color"
          :src="s.href"
          :icon="s.icon"
      >
      </social>
    </v-row>
  </v-container>
    <v-container fluid>
    <v-row
        justify="center"
        no-gutters
    >
      <v-btn
          v-for="link in links"
          :key="link"
          text
          rounded
          class="my-2 text-subtitle-1 font-weight-medium"
          :to="`/impressum#${link}`"
      >
        {{$t(`home.${link}`)}}
      </v-btn>
    </v-row>
    </v-container>
  </v-footer>
</template>

<script>
import Social from "@/components/appbar/Social"
import {mapState} from "vuex"

export default {
  name: "Footer",
  components: {
    Social
  },
  data: () => ({
    links:['imprint', 'privacy', 'contact']
  }),
  computed: {
    ...mapState(['socials']),
  }
}
</script>

<style scoped>

</style>
