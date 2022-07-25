<template>
  <base-card
      m-width="750px"
      style="margin-bottom: 50px"
  >
    <template v-slot:text>
      <div class="text-center">
        {{inhalt}}
      </div>
      <div class="d-flex justify-center">
        <p class="my-7">Jahrgang 2021</p>
      </div>
    </template>
    <template v-slot:element class="my-6">
      <v-row
          justify-md="center"
          class="bottle-container"
          :style="$vuetify.breakpoint.smAndDown ? 'height:200px' : 'height:450px'"
      >
        <bottle v-for="(n,i) in 5"
                :key="n"
                :class="wedge(i)"
                />
      </v-row>
    </template>
    <template v-slot:actions>
      <v-row justify="center">
        <v-btn
            color="darkgreen"
            elevation="0"
            dark
        >
          zu den Produkten
        </v-btn>
      </v-row>
    </template>
  </base-card>
</template>

<script>

import {Card as BaseCard} from '@/components/base'
import {Bottle} from '@/components/home'

export default {
  name: "intro",
  components: {
    BaseCard,
    Bottle,
  },
  props: ['inhalt'],
  methods:{
    wedge(i){
      if(i === 0) return 'bottle'
      if(i % 2 === 0) return `bottle left-${i}`
      else return `bottle right-${i}`
    }
  }
}
</script>

<style scoped>
.bottle-container{
  position: relative;
  width: 100px;
  margin: auto;
  text-align: center;
}

.bottle{
  position: absolute;
  z-index: 4;
}

.left-2{
  transform: translate3d(50%, -3%, 300px);
  z-index: 3;
}
.left-4{
  transform: translate3d(100%, -6%, 600px);
  z-index: 2;
}
.left-6{
  transform: translate3d(150%, -9%, 900px);
  z-index: 1;
}

.right-1{
  transform: translate3d(-50%, -3%, 300px);
  z-index: 3;
}
.right-3{
  transform: translate3d(-100%, -6%, 600px);
  z-index: 2;
}
.right-5{
  transform: translate3d(-150%, -9%, 900px);
  z-index: 1;
}
</style>
