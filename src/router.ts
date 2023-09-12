import { Router } from "svelte-pilot";
import SSRContext from "./ssr-context";
import Layout from "./views/layout.svelte";

export default new Router({
  handleInitialURL: false,
  mockedSSRContext: new SSRContext({}),
  ssrState: window?.__SSR_STATE__,

  routes: [
    {
      component: Layout,

      children: [
        {
          name: "footer",
          component: () => import("./views/footer.svelte"),
        },

        {
          path: "/",
          component: () => import("./views/home.svelte"),
          props: (route) => ({ page: route.query.int("page", { default: 1 }) }),
        },
      ],
    },

    {
      path: "(.*)",
      component: () => import("./views/not-found.svelte"),
    },
  ],
});
