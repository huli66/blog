import DefaultTheme from "vitepress/theme";
import VueImage from "./VueImage.vue";
import LayoutIndex from "./layout/index.vue";
import { inBrowser } from "vitepress";
import busuanzi from "busuanzi.pure.js";

export default {
  ...DefaultTheme,
  Layout: LayoutIndex,
  enhanceApp({ app, router }) {
    app.component("VueImage", VueImage);
    if (inBrowser) {
      router.onAfterRouteChanged = () => {
        busuanzi.fetch();
      };
    }
  },
};
