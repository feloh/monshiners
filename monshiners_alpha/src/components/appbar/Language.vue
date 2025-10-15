<template>
    <v-speed-dial
        v-model="fab"
        direction="bottom"
        transition="scale-transition"
    >
      <template v-slot:activator>
        <v-btn
            color="accent1"
            elevation="0"
            variant="flat"
            class="text-white"
            v-model="fab"
        >
          <v-icon v-if="fab">
            mdi-close
          </v-icon>
          <span
              v-else
          >
            {{$t('lng.language')}}
          </span>
        </v-btn>
      </template>
      <v-btn
          :color="isIntersecting ? 'accent1' : 'white'"
          variant="flat"
          size="small"
          rounded="lg"
          class="text-subtitle-1 font-weight-bold"
          @click="changeLocale('pl')"
      >
        {{$t('lng.plt')}}
      </v-btn>
      <v-btn
          variant="flat"
          size="small"
          :color="isIntersecting ? 'accent1' : 'white'"
          rounded="lg"
          class="text-subtitle-1 font-weight-bold"
          @click="changeLocale('de')"
      >
        {{$t('lng.de')}}
      </v-btn>
    </v-speed-dial>
</template>

<script>
import i18n from '@/plugins/i18n'
import {mapState, mapMutations} from "vuex"

export default {
  name: "Language",
  data: () => ({
    fab: false
  }),
  methods: {
    ...mapMutations(['setIntersection']),
    changeLocale (locale) {
      i18n.locale = locale
      this.$eventHub.emit('locale-changed')
    },
  },
  computed:{
    ...mapState(['intersection']),
    isIntersecting: {
      get () {
        return this.$store.state.intersection
      },
      set (val) {
        this.setIntersection(val)
      }
    },
  }
}
</script>

<style scoped>
.v-speed-dial {
  position: absolute;
}
.v-btn--floating {
  position: relative;
}

</style>
