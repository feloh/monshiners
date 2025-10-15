import { createVuetify, createDisplay } from 'vuetify'

const display = createDisplay({
  thresholds: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920
  },
  mobileBreakpoint: 'sm'
})

const vuetify = createVuetify({
  display,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#141414',
          secondary: '#b0bec5',
          accent: '#ec4946',
          accent1: '#b0d57d',
          accent2: '#f6cf3e',
          accent3: '#824663',
          anchor: '#824663'
        }
      }
    }
  }
})

export function installLegacyVuetifyGlobals(app) {
  app.config.globalProperties.$vuetify = app.config.globalProperties.$vuetify ?? {}
  app.config.globalProperties.$vuetify.breakpoint = display
}

export default vuetify
