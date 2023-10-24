<script lang="ts" context="module">
  import type { Route } from 'svelte-pilot'
  import type { Context } from '../context/types'

  export async function load(props: unknown, route: Route, ctx: Context) {
    ctx.setStatus(500)
  }
</script>

<svelte:head>
  <title>500 Error</title>
</svelte:head>

<h1>500 Error</h1>
