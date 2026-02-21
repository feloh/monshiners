<template>
  <base-card>
    <template v-slot:element>
      <mini-shop class="mx-3" />
    </template>
  </base-card>
</template>

<script>
import {Card as BaseCard} from '@/components/base'
import MiniShop from '@/components/store/MiniShop'

export default {
  name: 'Intro',
  components: {
    BaseCard,
    MiniShop,
  },
}
</script>

<style scoped>
</style>
