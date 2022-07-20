<template>
  <v-app>
    <v-app-bar
        app
        fixed
        color="transparent"
        elevation="0"
    >
      <v-row no-gutters>
        <Language/>
        <v-spacer></v-spacer>
        <social
            v-for="s in socials"
            :key="socials.indexOf(s)"
            :color="s.color"
            :src="s.href"
            :icon="s.icon"
        >
        </social>
      </v-row>
    </v-app-bar>
    <v-main>
      <v-container>
        <v-row justify="space-around" class="mt-10">
         <v-card>
           <v-card-title
               class="text-h3"
           >
             Wat'n Driss!
           </v-card-title>
           <v-card-text class="text-body-1" style="margin-bottom: 200px" v-text="$t('redirect.text')" />
           <v-card-actions>
             <v-row justify="space-around">
               <v-btn
                   x-large
                   color="black"
                   class="text-justify text-center"
               >
                 <a
                     :href="link"
                     target="_self"
                     class="text-decoration-none text--black"
                 >
                   {{ $t("redirect.link") }}
                 </a>
               </v-btn>
             </v-row>
           </v-card-actions>
         </v-card>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Language from '@/components/appbar/Language'
import Social from "@/components/appbar/Social"
import i18n from '@//plugins/i18n'
import {mapState} from "vuex"

export default {
name: "TooYoung",
  components:  {
    Language,
    Social
  },
  data: () =>({
    href: {
      de: 'https://www.kenn-dein-limit.info/gesetzliche-regelungen.html',
      plt: 'https://www.kenn-dein-limit.info/gesetzliche-regelungen.html',
      en: 'https://en.wikipedia.org/wiki/Alcohol_laws_in_Germany'
    }
  }),
  computed: {
    ...mapState(['socials']),
  link(){
    return this.href[i18n.locale]
  }
  }
}
</script>

<style scoped>
</style>
