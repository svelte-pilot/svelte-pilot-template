<script lang="ts">
  import type { Route } from 'svelte-pilot';
  import type SSRContext from '/src/ssr-context';

  export function load(props: unknown, route: Route, ctx: SSRContext) {
    ctx.res.statusCode = 404;
    return {};
  }
</script>

<h1>Not Found</h1>
