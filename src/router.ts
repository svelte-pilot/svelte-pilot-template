import { Router } from "svelte-pilot";
import Layout from "./views/layout.svelte";

export default new Router({
  navigateOnStartup: false,

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
