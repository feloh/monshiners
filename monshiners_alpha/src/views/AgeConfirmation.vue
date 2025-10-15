<template>
  <v-app>
  <v-main>
  <v-container>
    <v-row justify="center" align="start" class="py-10">
      <v-img
          :src="black"
          min-width="100px"
          max-width="300px"
          class="mx-auto"
      />
    </v-row>
    <v-row justify="space-around" class="mt-10">
      <v-btn
          variant="text"
          size="x-large"
          class="no-uppercase text-justify"
          @click="onward"
      >
        {{ $t('ageConfirmation.o18') }}
      </v-btn>
      <v-btn
          variant="text"
          size="x-large"
          class="no-uppercase text-justify"
          @click="redirect"
      >
        {{ $t('ageConfirmation.u18') }}
      </v-btn>
    </v-row>
  </v-container>
  </v-main>
  </v-app>
</template>

<script>
import Cookies from 'js-cookie'
import {mapState} from "vuex"
import blackLogo from '@/assets/geometry/monshiners_schriftzug_schwarz.png'

export default {
  name: "Start",
  data: () => ({
        black: blackLogo}),
  computed: {
    ...mapState(['socials']),
  },
  methods: {
    onward () {
      this.setCookie('age', 1, 265)
      this.$router.push({name: 'Home'})
    },
    redirect (){
      this.setCookie('age', 0, 31)
      this.$router.push({name: 'TooYoung'})
    },
    setCookie(name,value,expT){
      Cookies.set(name, value, {expires: expT})
    }
  }
}
</script>

<style>
@font-face {
  font-family: Belta;
  src: url("../assets/fonts/belta-light.otf") format('otf');
  font-weight: 300;
}

.no-uppercase {
  text-transform: none;
}

.head {
  line-height: 1em;
  font-weight: 400;
  font-size: 90px;
  font-family: Belta;
  text-align:center;
  padding-top:140px;
}

@media only screen and (min-width: 800px) {
  .head {
    font:400 180px/1em Belta;
    text-align:center;
    padding-top:140px;
  }
}

.jittery span {
  animation:jitter 200ms linear infinite;
  display:inline-block;
}

@keyframes jitter {
  50%{transform:skewY(0.7deg) skewX(-0.7deg) scale(1.006);}
}
</style>
