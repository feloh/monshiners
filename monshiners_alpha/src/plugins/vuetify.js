import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#141414',
                secondary: '#b0bec5',
                accent:'#ec4946',
                accent1:'#b0d57d',
                accent2:'#f6cf3e',
                accent3:'#824663',
                anchor: '#824663',
            },
        },
    },
})
