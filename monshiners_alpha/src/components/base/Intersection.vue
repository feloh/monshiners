<template>
  <div
      v-intersect="{
          handler: onIntersect,
          options: {
              rootMargin: '0px',
              threshold: threshold
          }
        }"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Intersection",
  props:['onIntersect', 'threshold']
}
</script>

<style scoped>

</style>
