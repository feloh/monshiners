<template>
  <v-container fluid class="pa-15">
    <v-row justify-md="space-around">
      <v-col
          md="6"
          order="2"
          order-md="1"
          align-self="center"
      >
          <gallery :src="galerie"/>
      </v-col>
      <v-col
          md="6"
          order="1"
          order-md="2"
          align-self="center"
      >
            <v-card
                max-width="750px"
                class="mx-auto"
            >
              <v-img
                  :src="black"
                  min-width="75px"
                  max-width="300px"
                  class="mx-auto"
              />
              <v-card-subtitle
                  class="text-md-h6 text-uppercase font-weight-regular mx-auto text-center"
              >
                {{titel}}
              </v-card-subtitle>
              <v-card-text
                  class="font-weight- text-md-subtitle-1 text-center"
              >
                {{inhalt}}
              </v-card-text>
            </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import {Gallery} from "@/components/home";

export default {
  name: "Collage",
  components: {
    Gallery,
  },
  data: () => ({
    black: require('@/assets/geometry/Monshiners_Schriftmarke_Black.png'),
    logo: require('@/assets/img/monshiners_logo.jpg'),
    skizze: require('@/assets/img/Skizze_Prozess.jpg'),
  }),
  props: {
    inhalt: {
      type: String,
      default: (() => '')
    },
    galerie: {
      type: Array,
      default: (() => [])
    },
    titel: {
      type: String,
      default: (() => 'Ups. Da ist was schiefgelaufen.')
    },
  },
}
</script>

<style scoped>
</style>
