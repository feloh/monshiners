<template>
  <div
    class="parallax-section"
    :style="sectionStyle"
  >
    <div class="parallax-overlay">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  src: {
    type: String,
    default: ''
  },
  height: {
    type: [Number, String],
    default: 400
  },
  gradient: {
    type: String,
    default: ''
  }
})

const sectionStyle = computed(() => {
  const style = {
    minHeight: typeof props.height === 'number' ? `${props.height}px` : props.height,
    backgroundImage: props.src ? `url(${props.src})` : undefined
  }

  if (props.gradient) {
    style.backgroundImage = props.src
      ? `${props.gradient}, url(${props.src})`
      : props.gradient
  }

  return {
    ...style,
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center center'
  }
})
</script>

<style scoped>
.parallax-section {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.parallax-overlay {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: inherit;
  justify-content: inherit;
}
</style>
