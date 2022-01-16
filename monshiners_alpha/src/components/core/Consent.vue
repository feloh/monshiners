<template>
  <v-bottom-sheet
      v-model="sheet"
      no-click-animation
      persistent
      hide-overlay
      width="100%"
      open-delay="10000"
  >
    <v-sheet class="elevation-3 pa-2">
      <v-row align="center" no-gutters>
        <v-col cols="12">
          <p class="text-body-2">
            {{$t("consent.text")}}
          </p>
        </v-col>
        <v-col cols="12" style="min-height: 30px">
          <v-row justify="center">
          <v-btn
              class="mx-auto"
              color="darkgreen"
              elevation="0"
              dark
              tile
              @click="acknowledgeCookies"
          >Ich akzeptiere</v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-sheet>
  </v-bottom-sheet>
</template>

<script>
import Cookies from 'js-cookie'

export default {
  name: "Consent",
  data:()=> ({
    sheet: false
  }),
  methods: {
    acknowledgeCookies() {
      Cookies.set('acknowledgement', '1',  {expires: 31})
      this.sheet = false
    }
  },
  mounted() {
    this.sheet = Cookies.get('acknowledgement') !== '1'
  }
}
</script>

<style scoped>

</style>
