<script lang="ts" context="module">
  import type { Route } from 'svelte-pilot'
  import type { Context } from '../context-interface'

  export async function load(props: {}, route: Route, ctx: Context) {
    return {
      name: 'World'
    }
  }
</script>

<script lang="ts">
  export let name: string
</script>

<svelte:head>
  <title>Svelte Pilot Template</title>
</svelte:head>

<h1 class="text-orange-600 text-4xl text-center mt-8">Hello, {name}!</h1>
