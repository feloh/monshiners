<template>
  <v-app>
    <v-container>
      <v-row justify="space-around" class="mt-10">
        <contact></contact>
        <base-card
            v-for="bestandteil in bestandteile"
            :key="bestandteil.id"
            :id="bestandteil.identifier"
        >
          <template v-slot:title>
            {{bestandteil.titel}}
          </template>
          <template v-slot:text>
            <div
                v-for="(c, indexC) in bestandteil.inhalt"
                :key="indexC"
            >
              <p v-if="c.nodeType !== 'heading-4' && c.nodeType !== 'heading-5'">
            <span
                v-for="(s, indexS) in c.content"
                :key="indexS"
            >
              {{s.value}}
            </span>
              </p>
              <ul v-if="c.nodeType ==='unordered-list'">
            <li
                v-for="(l, indexL) in c.content"
                :key="indexL"
            >
               <div
                   v-for="(s, indexS) in l.content[0].content"
                   :key="indexS"
               >
                 <span v-if="s.nodeType !=='paragraph'">
                     {{s.value}}
                   </span>
                 <div
                     v-for="(x, indexS) in s.content"
                     :key="indexS"
                 >
                   <a :href="s.data.uri" target="_blank">
                     {{x.value}}
                   </a>
                 </div>
            </div>
            </li>
              </ul>
              <div v-if="c.nodeType === 'heading-4'">
                <span v-for="(s, indexS) in c.content"
                      :key="indexS"
                      class="text-md-h5"
                >
                  {{s.value}}
                </span>
              </div>
              <div v-if="c.nodeType === 'heading-5'">
                <span v-for="(s, indexS) in c.content"
                    :key="indexS"
                      class="text-md-h5"
                >
                  {{s.value}}
                </span>
              </div>
            </div>
          </template>
        </base-card>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import BaseCard from '@/components/base/Card'
import {mapActions, mapState} from "vuex"
import {GET_REFERENCE} from "@/store/action-types"
import Reference from "@/store/modules/reference"
import Contact from "@/components/about/Contact"

const STORE_REFERENCE_NAMESPACE = 'reference'

export default {
  name: "About",
  components:{
    Contact,
    BaseCard
  },
  methods: {
    ...mapActions(STORE_REFERENCE_NAMESPACE, {
      getReference: GET_REFERENCE,
    }),
  },
  computed: {
    ...mapState(STORE_REFERENCE_NAMESPACE, [
      'bestandteile'
    ])
  },
  created() {
    this.$store.registerModule(STORE_REFERENCE_NAMESPACE, Reference)
    if (this.$store.state[STORE_REFERENCE_NAMESPACE].id) return
    this.getReference({id: '3lAVKi6bWbI1xoNAyNxaGq'})
  },
}
</script>

<style scoped>

</style>
