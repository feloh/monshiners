<template>
  <v-dialog
      v-model="fullScreenImage.state"
      transition="dialog-bottom-transition"
      max-width="800"
  >
    <v-img
        :src="`${fullScreenImage.src}?fm=jpg&fl=progressive&q=100`"
        :lazy-src="`${fullScreenImage.src}?w=360&h=250&fit=thumb&fm=jpg&fl=progressive&q=90`"
        width="auto"
        class="white"
        gradient="to top, rgba(0,0,0,0), rgba(0,0,0,0.30)"
    >
      <template v-slot:default>
        <v-row
            class="ma-0"
            align="start"
            justify="end"
        >
          <v-icon
              @click="close"
              large
              color="white"
          >
              mdi-close-thick
          </v-icon>
        </v-row>
      </template>
      <template v-slot:placeholder>
        <v-row
            class="fill-height ma-0"
            align="center"
            justify="center"
        >
          <v-progress-circular
              indeterminate
              color="grey lighten-5"
          ></v-progress-circular>
        </v-row>
      </template>
    </v-img>
  </v-dialog>
</template>

<script>
import {mapState} from 'vuex'

export default {
name: "FullScreenImage",
  computed:{
    ...mapState(['fullScreenImage']),
  },
  methods: {
  close(){
    this.$store.dispatch('closeFullScreenImage')
  }
  }
}
</script>

<style scoped>

</style>
