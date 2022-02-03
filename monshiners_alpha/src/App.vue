<template>
  <div>
    <v-app class="application">
      <custom-drawer/>
      <consent></consent>
      <router-view/>
    </v-app>
  </div>
</template>

<script>
import Consent from '@/components/core/Consent'
import CustomDrawer from '@/components/core/Drawer'

export default {
  name: "App",
  components: {
    Consent,
    CustomDrawer
  }
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
