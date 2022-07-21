<template>
  <base-card
      m-width="750px"
      style="margin-bottom: 50px"
  >
    <template v-slot:text >
      {{inhalt}}
    </template>
  </base-card>
</template>

<script>

import {Card as BaseCard} from '@/components/base'

export default {
  name: "intro",
  components: {
    BaseCard
  },
  props: ['inhalt']
}
</script>

<style scoped>

</style>
