<script context="module" lang="ts">
  import type { Route } from 'svelte-pilot';
  import type { SSRContext } from '/types';
  import Child, { preload as preloadChild } from './Child.svelte';

  type APIResult = {
    title: string,
    content: string
  };

  export async function preload({ page = 1 }: { page: number}, route: Route, ssrCtx: SSRContext) {
    // Mock http request
    const ssrState = await fetchData(page, ssrCtx.cookies.token);
    const childState = await preloadChild({ propA: 1 }, route, ssrCtx);

    // Set response headers. Optional
    route.meta.response = {
      status: 200,

      headers: {
        'X-Foo': 'Bar'
      }
    };

    // Returned data will be passed to component props
    return {
      ssrState,
      childState
    };
  }

  function fetchData(page: number, token: string | null): Promise<APIResult> {
    return new Promise(resolve =>
      setTimeout(() => resolve({
        title: token ? 'Welcome back, John' : 'Hello guest',
        content: 'Content of page ' + page
      }), 100)
    )
  }
</script>

<script lang="ts">
  export let page: number = 1;
  export let ssrState: APIResult | null = null;
  export let childState: {} | null = null;

  let data = ssrState;

  main();

  async function main() {
    // CSR
    if (!data) {
      data = await fetchData(page, new URLSearchParams(document.cookie.replace(/;\s*/g, '&')).get('token'));
    }
  }

  function setCookie() {
    document.cookie = 'token=abcde';
    location.reload();
  }

  function removeCookie() {
    document.cookie = 'token=';
    location.reload();
  }
</script>

<main>
  <header>
    <img src="../favicon.png" alt="logo">
    <h1>Svelte-Vite-SSR</h1>
  </header>

  <button on:click={setCookie}>set cookie</button>
  <button on:click={removeCookie}>remove cookie</button>

  {#if data}
    <h2>{data.title}</h2>
    <p>{data.content}</p>
  {/if}

  <a href="/">page 1</a>
  <a href="/?page=2">page 2</a>

  <Child {...childState} />
</main>

<style>
  header {
    text-align: center;
  }
</style>
