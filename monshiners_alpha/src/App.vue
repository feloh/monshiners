 <template>
   <v-app class="application">
     <consent></consent>
    <router-view/>
   </v-app>
</template>

 <script>
 import Consent from '@/components/core/Consent'
 export default {
   name: "App",
   components: {
     Consent
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
