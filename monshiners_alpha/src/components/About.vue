<template>
  <kinesis-container event="scroll">
  <v-container fluid class="pa-5">
    <v-row justify-md="space-around">
      <v-col
          md="6"
          order="2"
          order-md="1"
          align-self="center"
      >
        <kinesis-element :strength=30 type="translate" axis="x" :max-x="10"	 :active="!this.$vuetify.breakpoint.mobile">
        <v-img
            :src="logo"
            :height="$vuetify.breakpoint.mdAndUp ? 500 : 200"
            contain
            class="mx-auto"
        />
        </kinesis-element>
      </v-col>
      <v-col
          md="6"
          order="1"
          order-md="2"
          align-self="center"
      >
        <kinesis-element :strength=-30 type="translate" axis="x" :max-x="10"	 :active="!this.$vuetify.breakpoint.mobile">
            <v-card
                max-width="750px"
                class="mx-auto"
            >
              <v-img
                  :src="black"
                  min-width="100px"
                  max-width="400px"
                  class="mx-auto"
              />
              <v-card-subtitle
                  class="text-md-h6 text-uppercase font-weight-medium mx-auto text-center"
              >
                {{titel}}
              </v-card-subtitle>
              <v-card-text
                  class="font-weight-medium text-md-subtitle-1"
              >
                {{inhalt}}
              </v-card-text>
            </v-card>
        </kinesis-element>
      </v-col>
    </v-row>
  </v-container>
  </kinesis-container>
</template>

<script>
import{KinesisElement, KinesisContainer} from 'vue-kinesis'

export default {
  name: "Collage",
  components: {
    KinesisContainer,
    KinesisElement
  },
  data: () => ({
    black: require('@/assets/geometry/monshiners_schriftzug_schwarz.png'),
    logo: require('@/assets/img/monshiners_logo.jpg'),
  }),
  props: {
    inhalt: {
      type: String,
      default: (() => '')
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
