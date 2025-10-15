<template>
  <v-navigation-drawer
      color="primary"
      app
      v-model="drawerState">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-h6">
          Monshiners' Obstbrand
        </v-list-item-title>
        <v-list-item-subtitle>
          Wo willst'e hin?
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-list-item>
      <v-list-item-content>
        <switcher class="d-flex justify-center" v-if="$vuetify.breakpoint.smAndDown"></switcher>
      </v-list-item-content>
    </v-list-item>
      <v-divider></v-divider>
      <v-list
          density="compact"
      >
        <v-list-item v-for="l in links"
                     :key="`s-${l}`"
                     :to="l"
        >
          <v-list-item-content>
            <v-list-item-title>{{$t(`home.${l}`)}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    <v-divider></v-divider>
    <v-list
        density="compact"
    >
      <v-list-item v-for="(s,i) in socials"
                   :key="`s-${i}`"
                   :href="s.href"
                   target="_blank"
                   rel="noopener"
                   :prepend-icon="s.icon"
      >
        <v-list-item-title>{{ s.name }}</v-list-item-title>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-spacer></v-spacer>
    <v-list
        density="compact"
    >
      <v-list-item v-for="i in imprint"
                   :key="`s-${i}`"
      >
        <v-list-item-content>
          <v-list-item-title>{{$t(`home.${i}`)}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import {mapState} from "vuex";
import Switcher from "@/components/appbar/Switcher"

export default {
  name: "Drawer",
  components: {
    Switcher
  },
  data: () => ({
    imprint:['imprint', 'privacy', 'contact']
  }),
  computed: {
    ...mapState(['links','socials']),
    drawerState: {
      get() {
        return this.$store.getters.drawerState
      },
      set(v) {
        return this.$store.commit('toggleDrawerState', v)
      }
    }
  }
}
</script>

<style lang="sass">

</style>
