import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default createVuetify({
  components,
  directives,
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
          anchor: '#824663',
        },
      },
    },
  },
})
