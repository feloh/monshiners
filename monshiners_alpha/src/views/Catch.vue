<template>
  <v-app>
    <v-container>
    <base-card>
    <template v-slot:title>
      <span class="h3">404 Error</span>
    <p class="text-subtitle-1">
      {{$t("catch.text")}}
    </p>
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
}
</script>

<style scoped>

</style>

