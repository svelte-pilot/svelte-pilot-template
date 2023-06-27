<script lang="ts" context="module">
  import { Route } from "svelte-pilot";
  import SSRContext from "/src/ssr-context";

  export function load(
    props: Record<string, never>,
    route: Route,
    ctx: SSRContext
  ) {
    ctx.res.statusCode = 404;
  }
</script>

<h1>Not Found</h1>
