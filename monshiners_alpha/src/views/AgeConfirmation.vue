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
    <v-row justify="center" align="start" class="pb-10">
      <v-img
          :src="black"
          min-width="400px"
          max-width="700px"
          class="mx-auto"
      />
<!--      <div class="head">
        <span class="jittery">MONSHINERS'</span>
      </div>-->
    </v-row>
    <v-row justify="space-around" class="mt-10">
      <v-btn
          text
          x-large
          class="no-uppercase text-justify"
          @click="onward"
      >
        {{ $t('ageConfirmation.o18') }}
      </v-btn>
      <v-btn
          text
          x-large
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
import Language from '@/components/core/Language'
import Social from "@/components/Social"
import $ from 'jquery'
import Cookies from 'js-cookie'
import {mapState} from "vuex"

export default {
  name: "Start",
  components:  {
    Language,
    Social
  },
  data: () => ({
        black: require('@/assets/geometry/title_black_ms.svg')}),
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
  },
  created(){
    $(function(){
      let $jittery = $('.jittery'),
          aText    = $jittery.text().split(''),
          letters = '';

      for(let i = 0; i < aText.length; i++){
        letters += '<span>'+aText[i]+'</span>'
      }

      $jittery.empty().append(letters)

      $.each($('span', $jittery), function(i){
        $(this).css('animation-delay', '-'+i+'70ms')
      });
    });
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
