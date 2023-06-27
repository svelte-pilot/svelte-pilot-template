<script context="module" lang="ts">
  import { Route, RouterLink } from "svelte-pilot";
  import SSRContext from "../ssr-context";
  import Child, { load as preloadChild } from "./child.svelte";

  type APIResult = {
    title: string;
    content: string;
    question: string;
  };

  export async function load(
    { page = 1 }: { page: number },
    route: Route,
    ctx: SSRContext
  ) {
    // Mock http request
    const ssrState = await fetchData(page, ctx.req.cookies.token);

    // preload child component
    const childState = await preloadChild(
      { question: ssrState.question },
      route,
      ctx
    );

    // Set response headers. Optional
    ctx.res.statusCode = 200;
    ctx.setHeader("X-Foo", "Bar");

    // Returned data will be passed to component props
    return {
      ssrState,
      childState,
    };
  }

  function fetchData(page: number, token?: string | null): Promise<APIResult> {
    return new Promise((resolve) =>
      setTimeout(
        () =>
          resolve({
            title: token ? "Welcome back, John" : "Hello guest",
            content: ["Lorem ipsum dolor sit amet.", "Donec vel neque massa."][
              page - 1
            ],
            question: "Meaning of life",
          }),
        100
      )
    );
  }
</script>

<script lang="ts">
  export let page = 1;
  export let ssrState: APIResult | null = null;
  export let childState: Record<string, unknown> | null = null;

  // Initialize data from SSR state.
  let data = ssrState;

  $: onPageChange(page);

  async function onPageChange(page: number) {
    // SSR state will be set to undefined when history.pushState / history.replaceState / popstate event is called.
    if (!ssrState) {
      data = await fetchData(
        page,
        new URLSearchParams(document.cookie.replace(/;\s*/g, "&")).get("token")
      );
    }
  }

  function setCookie() {
    document.cookie = "token=abcde";
    location.reload();
  }

  function removeCookie() {
    document.cookie = "token=";
    location.reload();
  }
</script>

<main class="p-4">
  <header class="flex flex-col items-center">
    <img src="../favicon.png" alt="logo" class="grow-0 w-fit" />
    <h1 class="text-2xl">
      <a href="https://github.com/jiangfengming/svelte-vite-ssr"
        >Svelte-Vite-SSR</a
      >
    </h1>
  </header>

  <button
    on:click={setCookie}
    class="rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
    >set cookie</button
  >
  <button
    on:click={removeCookie}
    class="rounded border border-indigo-600 px-12 py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
    >remove cookie</button
  >

  {#if data}
    <h2>{data.title}</h2>
    <p>{data.content}</p>
    <Child question={data.question} {...childState} />
  {/if}

  <ul>
    <li><a href="/" class="text-sky-700 underline">page 1</a></li>
    <li><a href="/?page=2" class="text-sky-700 underline">page 2</a></li>
    <li>
      <RouterLink to="/" class="text-sky-700 underline"
        >page 1 (pushState)</RouterLink
      >
    </li>
    <li>
      <RouterLink to="/?page=2" class="text-sky-700 underline"
        >page 2 (pushState)</RouterLink
      >
    </li>
  </ul>

  <pre>ssrState: {JSON.stringify(ssrState, null, 2)}</pre>

  <p>
    On the client side, when a navigation is triggered through <code
      >history.pushState</code
    >
    /
    <code>history.replaceState</code> / <code>popstate</code> event, the state object
    will be purged.
  </p>
</main>
