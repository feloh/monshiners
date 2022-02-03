<template>
  <v-app>
    <v-container class="my-auto">
      <base-card>
        <template v-slot:title>
          <v-row justify="center">
            <v-col cols="12" class="text-h2 text-md-h1 d-flex justify-center">
            404 Error
            </v-col>
            <v-col cols="12" class="text-subtitle-1 d-flex justify-center">
              {{$t("catch.text")}}
            </v-col>
          </v-row>
        </template>
        <template v-slot:text>
          <v-row justify="center">
            <v-btn
                color="darkgreen"
                elevation="3"
                dark
                tile
                class="my-4 font-weight-medium"
                href="https://simply-kaschemm.com/whiskey-whisky/Sea-Shepherd-Islay-Single-Malt-Whisky"
            >
              {{ $t("catch.btn") }}
            </v-btn>
          </v-row>
        </template>
      </base-card>
    </v-container>
  </v-app>
</template>

<script>
import BaseCard from '@/components/base/Card'
export default {
  name: "Catch",
  components: {BaseCard}
  //TODO Link ersetzen
}
</script>

<style scoped>

</style>

