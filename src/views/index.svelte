<script lang="ts" context="module">
  import type { LoadFunction } from 'svelte-pilot'
  import type { Context } from '../context/types'

  export const load: LoadFunction<{}, Context> = async ({}, route, ctx) => {
    return {
      name: 'World'
    }
  }
</script>

<script lang="ts">
  let { name }: { name: string } = $props()
</script>

<svelte:head>
  <title>Svelte Pilot Template</title>
</svelte:head>

<h1 class="text-orange-600 text-4xl text-center mt-8">Hello, {name}!</h1>
