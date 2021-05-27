<script context="module" lang="ts">
  import type { Route } from 'svelte-pilot';
  import type { SSRContext } from '/src/types';

  type Anwser = {
    answer: number
  };

  export type SSRState = Anwser;

  export async function load({ question }: { question: string }, route: Route, ssrCtx: SSRContext) {
    const ssrState = await getAnswer(question);
    return { ssrState };
  }

  function getAnswer(question: string) {
    return Promise.resolve({
      question,
      answer: 42
    });
  }
</script>

<script lang="ts">
  export let question: string;
  export let ssrState: Anwser | null = null;

  let data = ssrState;

  $: onQuestionChange(question);

  async function onQuestionChange(question: string) {
    if (!ssrState) {
      data = await getAnswer(question);
    }
  }
</script>

<p>Question: {question}. Answer: {data?.answer}</p>
