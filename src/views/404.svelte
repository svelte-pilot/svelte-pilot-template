<script lang="ts" context="module">
  import type { LoadFunction } from 'svelte-pilot'
  import type { Context } from '../context/types'

  export const load: LoadFunction<{}, Context> = async ({}, route, ctx) => {
    ctx.setStatus(404)
  }
</script>

<svelte:head>
  <title>404 Not Found</title>
</svelte:head>

<h1>404 Not Found</h1>
