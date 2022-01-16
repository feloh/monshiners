<template>
  <base-card id="contact">
    <template v-slot:title>
    <span class="text-h3">
      {{$t("contact.title")}}
    </span>
    </template>
    <template v-slot:text>
      <span>Monshiners' GbR</span>
      <p>
      <span>Frohnstr.9</span><br>
      <span>40789 Monheim</span>
      </p>
      <p>
        <v-icon
            color="accent3"
        >mdi-email</v-icon>
        <a class="text-decoration-none" href="mailto:info@monshiners.de">
          info@monshiners.de
        </a><br>
        <span>
          <v-icon
              color="accent2"
          >mdi-instagram</v-icon>
          <a class="text-decoration-none text--accent-2" href="https://www.instagram.com/monshiners_obstbrand/" target="_blank">
          @monshiners_obstbrand
        </a>
        </span><br>
        <span>
           <v-icon
               color="accent1"
           >mdi-facebook</v-icon>
          <a class="text-decoration-none text--accent"  href="" target="_blank">
          Monshiners'
        </a>
        </span><br>
      </p>
    </template>
  </base-card>
</template>

<script>
import BaseCard from '@/components/base/Card'
export default {
  name: "Contact",
  components: {BaseCard}
}
</script>

<style scoped>

</style>
