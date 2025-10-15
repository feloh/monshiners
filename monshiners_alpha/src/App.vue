<template>
  <div>
    <v-app class="application">
      <CustomDrawer />
      <CustomAppBar />
      <Consent />
      <router-view />
      <CustomFooter />
    </v-app>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Consent from '@/components/core/Consent'
import { AppBar as CustomAppBar, Drawer as CustomDrawer, Footer as CustomFooter } from '@/components/core'

onMounted(() => {
  document.documentElement.setAttribute('lang', 'de')
  document.title = "handgemachter Schnaps aus Monheim am Rhein | Monshiners' Obstbrand"

  const ensureMeta = (selector, attr, value) => {
    let element = document.querySelector(selector)
    if (!element) {
      element = document.createElement('meta')
      if (attr === 'charset') {
        element.setAttribute('charset', value)
      } else {
        const [attrName, attrValue] = selector.replace('meta[', '').replace(']', '').split('=')
        element.setAttribute(attrName, attrValue.replace(/"/g, ''))
      }
      document.head.appendChild(element)
    }

    if (attr === 'charset') {
      element.setAttribute('charset', value)
    } else {
      element.setAttribute(attr, value)
    }
  }

  ensureMeta('meta[charset]', 'charset', 'utf-8')
  ensureMeta('meta[name="keywords"]', 'content', 'HTML, CSS, JAVASCRIPT')
  ensureMeta(
    'meta[name="description"]',
    'content',
    "Handgemachte Obstbrände aus Monheim am Rhein in limitierter Auflage.Vom Baum bis zur Flasche, alles aus einer Hand.&#9996; Jetzt schnell einkaufen. Solange der Vorrat reicht.'"
  )
  ensureMeta('meta[name="author"]', 'content', "Monshiners' Obstbrand")
  ensureMeta('meta[property="og:title"]', 'content', "Monshiners' Obstbrand")
  ensureMeta(
    'meta[property="og:description"]',
    'content',
    'Original Monheimer Schnaps. Hergestellt aus dem Obst der Streuobstwiesen, des Monheimer Rheinbogens.'
  )
})
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

.text-white {
  color: #ffffff !important;
}

.text-black {
  color: #000000 !important;
}

.text-accent {
  color: #ec4946 !important;
}

.text-accent1 {
  color: #b0d57d !important;
}

.text-accent2 {
  color: #f6cf3e !important;
}

.text-accent3 {
  color: #824663 !important;
}
</style>
