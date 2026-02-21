<template>
 <base-card>
<!--    <template
        v-slot:text
    >
    <div class="d-flex mx-auto text-center" style="max-width: 750px">
      {{inhalt}}
    </div>
    <div class="d-flex justify-center">
      <p class="my-7">Jahrgang 2022</p>
    </div>
  </template>-->
 <template v-slot:element>
    <odoo-shop
      class="mx-3"
      :src="odooShopUrl"
      :api-url="odooApiUrl"
      :api-token="odooApiToken"
    />
   <!--   <v-row
       justify-md="center"
       class="bottle-container"
       :style="$vuetify.breakpoint.smAndDown ? 'height:200px' : 'height:450px'"
   >
     <bottle v-for="(img,i) in productImg"
             :key="img.id"
             :src="img.produktbild.url"
             :class="wedge(i)"/>
   </v-row>
 </template>
 <template v-slot:actions>
   <v-row justify="center">
     <v-btn
         color="darkgreen"
         href="https://monshiners-schwarzmarkt.company.site/"
         elevation="0"
         dark
     >
       {{ $t("home.btn") }}
     </v-btn>
   </v-row>-->
 </template>
  </base-card>
</template>

<script>

import {Card as BaseCard} from '@/components/base'
//import {Bottle} from '@/components/home'
import OdooShop from '@/components/store/OdooShop'

import {mapActions, mapState} from 'vuex'
import {GETALL_PRODUCT} from "@/store/action-types"
import Product from "@/store/modules/product"

import i18n from '@//plugins/i18n'



const STORE_PRODUCT_NAMESPACE = 'product'

export default {
  name: "intro",
  components: {
    OdooShop,
    BaseCard,
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
    odooShopUrl() {
      return process.env.VUE_APP_ODOO_SHOP_URL || 'https://www.monshiners.at/shop'
    },
    odooApiUrl() {
      return process.env.VUE_APP_ODOO_API_URL || ''
    },
    odooApiToken() {
      return process.env.VUE_APP_ODOO_API_TOKEN || ''
    }
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
