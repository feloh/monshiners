<template>
      <v-container fluid>
        <v-card
            :max-width="mWidth"
            class="mx-auto"
        >
          <v-card-title><slot name="title"/></v-card-title>
          <v-card-text
              class="font-weight-medium text-md-subtitle-1"
          >
            <slot name="text"/>
          </v-card-text>
          <v-card-text>
            <slot name="element"/>
          </v-card-text>
          <v-card-actions class="pa-7">
            <slot name="actions"/>
          </v-card-actions>
        </v-card>
      </v-container>
</template>

<script>
export default {
  name: "Card",
  props:{
    mWidth:{
      type: String,
      default: 'undefined'
    }
  }
}
</script>

<style scoped>

</style>
