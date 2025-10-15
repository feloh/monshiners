<template>
  <v-col
      cols="12"
      md="4"
      class="pa-0"
  >
    <kinesis-container event="scroll">
      <kinesis-element :strength="direction(index)" type="translate" axis="x" :max-x="3">
        <v-container fluid>
          <v-row justify="space-around" justify-md="start">
            <v-col
                class="pr-0"
                align-self="center"
                cols="4" md="4" sm="2"
            >
              <v-img
                  :src="src"
                  :lazy-src="`${src}?w=100&h=100&fm=jpg&fl=progressive&q=80`"
                  aspect-ratio="1"
                  :width="pictureWidth"

              />
            </v-col>
            <v-col
                cols="8" md="8" sm="10"
                class="pl-0 pl-md-1"
            >
              <v-card>
                <v-row justify="start">
                  <v-card-title
                      class="pb-0"
                  >{{ titel }}
                  </v-card-title>
                  <v-card-text
                      style="color: rgba(0, 0, 0, 0.6)"
                      class="font-weight-medium text-lg-subtitle-1 pt-0"
                  >
                    {{text}}
                  </v-card-text>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </kinesis-element>
    </kinesis-container>
  </v-col>
</template>

<script>
import{KinesisElement, KinesisContainer} from 'vue-kinesis'

export default {
  name: "fruit",
  components: {
    KinesisContainer,
    KinesisElement
  },
  props: {
    index: {
      type: Number,
      default: 0
    },
    src: {
      type: String,
      default: 'overlays/scratches.jpg'
    },
    titel: {
      type: String,
      default: "Ups! Dat is ne' Error du Früchtchen."
    },
    text: {
      type: String,
      default: "Ups! Dat is ne' Error du Früchtchen."
    }
  },
  computed: {
    pictureWidth() {
      return this.$vuetify.breakpoint.mobile ? '80' : '200'
    }
  },
  methods: {
    direction (index) {
      if(this.$vuetify.breakpoint.mobile === false){
        let strength = index*10+25
        // if(index === 0 || index === 1 || index === 3) strength
        if(index === 2 || index === 4) strength = -strength
        return strength
      }
      else return 0
    },
  }
}
</script>

<style scoped>

</style>
