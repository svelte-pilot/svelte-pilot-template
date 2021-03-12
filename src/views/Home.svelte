<script lang="ts" context="module">
  import type { Route } from 'svelte-pilot';
  import type { SSRContext } from '/types';

  type APIResult = {
    title: string,
    content: string
  };

  export async function preload({ page = 1 }: { page: number}, route: Route, ctx: SSRContext) {
    // Mock http request
    const ssrState = await fetchData(page, ctx.cookies.token);

    // Set response headers. Optional
    route.meta.response = {
      status: 200,

      headers: {
        'X-Foo': 'Bar'
      }
    };

    // Returned data will be passed to component props
    return {
      ssrState
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
  export let ssrState: APIResult | null = null;
  export let page: number = 1;

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
</main>

<style>
  header {
    text-align: center;
  }
</style>
