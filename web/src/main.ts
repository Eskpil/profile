import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import urql, { cacheExchange, dedupExchange, fetchExchange } from "@urql/vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

createApp(App)
  .use(router)
  .use(urql, {
    url: "http://localhost:4000/graphql",
    fetchOptions: {
      credentials: "include",
    },
    exchanges: [dedupExchange, cacheExchange, fetchExchange],
  })
  .use(BootstrapVue)
  .mount("#app");
