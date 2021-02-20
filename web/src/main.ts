import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import urql, { cacheExchange, dedupExchange, fetchExchange } from "@urql/vue";

createApp(App)
  .use(urql, {
    url: "http://localhost:4000/graphql",
    fetchOptions: {
      credentials: "include",
    },
    exchanges: [dedupExchange, cacheExchange, fetchExchange],
  })
  .use(router)
  .mount("#app");
