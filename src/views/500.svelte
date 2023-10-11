<script lang="ts" context="module">
  import type { Route } from 'svelte-pilot'
  import type { Context } from '../context-interface'

  export async function load(props: unknown, route: Route, ctx: Context) {
    ctx.setStatus(500)
  }
</script>

<h1>500 Error</h1>
