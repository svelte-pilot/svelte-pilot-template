<script context="module" lang="ts">
  import type { Route } from 'svelte-pilot';
  import type { SSRContext } from '/types';

  type Anwser = {
    answer: number
  };

  export type SSRState = Anwser;

  export async function preload(props: {}, route: Route, ssrCtx: SSRContext) {
    const ssrState = await getAnswer();
    return { ssrState };
  }

  function getAnswer() {
    return Promise.resolve({
      answer: 42
    });
  }
</script>

<script lang="ts">
  export let ssrState: Anwser | null = null;

  let data = ssrState;

  main();

  async function main() {
    // CSR
    if (!data) {
      data = await getAnswer();
    }
  }
</script>

<p>Answer: {data?.answer}</p>
