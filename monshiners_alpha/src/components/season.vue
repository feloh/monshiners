
<template>
  <v-container fluid style="height: 100%; padding:200px 10px">
    <v-row justify="center" align="end" style="height:100%">
      <v-col
          cols="12"
          md="8"
          class="mx-auto my-auto"
      >
        <kinesis-container event="scroll">
          <kinesis-element axis="y" :strength="200" type="translate">
            <v-card
                style="background-color:#272727"
            >
              <v-row justify="center">
                <v-card-title
                    class="text-md-h3 white--text font-weight-medium"
                >
                  {{ jahreszeit }}
                </v-card-title>
              </v-row>
              <v-row justify="center">
                <v-card-subtitle
                    class="text-md-h6 text-uppercase white--text"
                >
                  {{ saisonphasen.bezeichnung}}
                </v-card-subtitle>
              </v-row>
              <v-card-text
                  class="text-md-justify white--text text-md-subtitle-1"
              >
                <p
                    v-for="(c, indexC) in saisonphasen.beschreibung.content"
                    :key="indexC"
                >
            <span
                v-for="(s, indexS) in c.content"
                :key="indexS"
            >
              {{s.value}}
            </span>
                </p>
              </v-card-text>
            </v-card>

          </kinesis-element>
        </kinesis-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import{KinesisElement, KinesisContainer} from 'vue-kinesis'

export default {
  name: "season",
  components:{
    KinesisContainer,
    KinesisElement
  },
  props:{
    jahreszeit:{
      type: String,
      default: 'Jahreszeit'
    },
    saisonphasen:{
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style scoped>
</style>
