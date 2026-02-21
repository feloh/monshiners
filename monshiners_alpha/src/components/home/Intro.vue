<template>
  <v-card>
    <v-card-text class="d-flex mx-auto text-center mt-6" style="max-width: 750px">
      {{inhalt}}
    </v-card-text>
  </v-card>
</template>

<script>

import {mapActions, mapState} from 'vuex'
import {GETALL_PRODUCT} from "@/store/action-types"
import Product from "@/store/modules/product"

import i18n from '@//plugins/i18n'



const STORE_PRODUCT_NAMESPACE = 'product'

export default {
  name: "intro",
  components: {
    //Bottle
  },
  props: ['inhalt'],
  methods: {
    ...mapActions(STORE_PRODUCT_NAMESPACE, {
      getAllProduct: GETALL_PRODUCT,
    }),
    wedge(i){
      if(i === 0) return 'bottle'
      if(i % 2 === 0) return `bottle left-${i}`
      else return `bottle right-${i}`
    }
  },
  computed: {
    ...mapState(STORE_PRODUCT_NAMESPACE, ['productImg']),
  },
 async created() {
    this.$store.registerModule(STORE_PRODUCT_NAMESPACE, Product)
    if (this.$store.state[STORE_PRODUCT_NAMESPACE].id) return
    await this.getAllProduct({locale: i18n.locale})

    this.$eventHub.$on('locale-changed', () => {
    this.getAllProduct({locale: i18n.locale})
    })
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
