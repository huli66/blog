import DefaultTheme from 'vitepress/theme'
import VueImage from './VueImage.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('VueImage', VueImage)
  }
}
