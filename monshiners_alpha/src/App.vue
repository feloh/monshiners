<template>
  <div>
    <v-app class="application">
      <custom-drawer/>
      <custom-app-bar/>
      <consent></consent>
      <router-view/>
      <custom-footer/>
    </v-app>
  </div>
</template>

<script>
import Consent from '@/components/core/Consent'
import {AppBar as CustomAppBar, Drawer as CustomDrawer, Footer as CustomFooter} from '@/components/core'

export default {
  name: "App",
  metaInfo: {
    title: `handgemachter Schnaps aus Monheim am Rhein`,
    titleTemplate: `%s | Monshiners' Obstbrand`,
    htmlAttrs: {
      lang: 'de',
      amp: true
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'keywords', content: 'HTML, CSS, JAVASCRIPT'},
      { name: 'description', content: 'Handgemachte Obstbrände aus Monheim am Rhein in limitierter Auflage.Vom Baum bis zur Flasche, alles aus einer Hand.&#9996; Jetzt schnell einkaufen. Solange der Vorrat reicht.'},
      { name: 'author', content: 'Monshiners\' Obstbrand'},
      { name: 'author', content: 'Monshiners\' Obstbrand'},
      {
        property: 'og:title',
        content: 'Monshiners\' Obstbrand',
        template: chunk => `${chunk} - Monshiners'`,
        vmid: 'og:title'
      }
    ]
  },
  components: {
    Consent,
    CustomAppBar,
    CustomDrawer,
    CustomFooter
  },
}
</script>

<style lang="scss">
html, body {
  margin: 0;
  padding: 0;
}

body {
  width: 100vw;
  overflow: auto;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: transparent;
}
</style>
