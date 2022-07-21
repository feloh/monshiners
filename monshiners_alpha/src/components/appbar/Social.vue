<template>
  <v-col cols="auto" align-self="center">
  <v-btn
      :aria-label="name"
      :href=" src"
      target="_blank"
      rel="noopener"
      dark
      rounded
  >
      <v-icon
          large
          :color="color"
      >
        {{icon}}
      </v-icon>
  </v-btn>
  </v-col>
</template>

<script>
export default {
  name: "Social",
  props:{
    color:{
      type:String,
      default:'primary'
    },
    icon:{
      type:String,
      default:''
    },
    src:{
      type:String,
      default:'/*'
    },
    name:{
      type:String,
      default:'/*'
    }
  }
}
</script>

<style scoped>

</style>
