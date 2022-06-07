<script context="module" lang="ts">
  import { RouterLink } from 'svelte-pilot';
  import type { Route } from 'svelte-pilot';
  import type { SSRContext } from '/src/types';
  import Child, { load as preloadChild } from './Child.svelte';

  type APIResult = {
    title: string,
    content: string,
    question: string
  };

  export async function load({ page = 1 }: { page: number}, route: Route, ssrCtx: SSRContext) {
    // Mock http request
    const ssrState = await fetchData(page, ssrCtx.cookies.token);

    // preload child component
    const childState = await preloadChild({ question: ssrState.question }, route, ssrCtx);

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

  function fetchData(page: number, token?: string | null): Promise<APIResult> {
    return new Promise(resolve =>
      setTimeout(() => resolve({
        title: token ? 'Welcome back, John' : 'Hello guest',
        content: ['Lorem ipsum dolor sit amet.', 'Donec vel neque massa.'][page - 1],
        question: 'Meaning of life'
      }), 100)
    );
  }
</script>

<script lang="ts">
  export let page = 1;
  export let ssrState: APIResult | null = null;
  export let childState: Object | null = null;

  // Initialize data from SSR state.
  let data = ssrState;

  $: onPageChange(page);

  async function onPageChange(page: number) {
    // SSR state will be set to undefined when history.pushState / history.replaceState / popstate event is called.
    if (!ssrState) {
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
    <h1><a href="https://github.com/jiangfengming/svelte-vite-ssr">Svelte-Vite-SSR</a></h1>
  </header>

  <button on:click={setCookie}>set cookie</button>
  <button on:click={removeCookie}>remove cookie</button>

  {#if data}
    <h2>{data.title}</h2>
    <p>{data.content}</p>
    <Child question={data.question} {...childState} />
  {/if}

  <ul>
    <li><a href="/">page 1</a></li>
    <li><a href="/?page=2">page 2</a></li>
    <li><RouterLink to="/">page 1 (pushState)</RouterLink></li>
    <li><RouterLink to="/?page=2">page 2 (pushState)</RouterLink></li>
  </ul>

  <pre>ssrState: {JSON.stringify(ssrState, null, 2)}</pre>

  <p>On the client side, when a navigation is triggered through <code>history.pushState</code> /
    <code>history.replaceState</code> / <code>popstate</code> event, the state object will be purged.</p>
</main>

<style>
  header {
    text-align: center;
  }
</style>
