<script context="module" lang="ts">
  import { Route } from "svelte-pilot";
  import SSRContext from "/src/ssr-context";

  type Anwser = {
    answer: number;
  };

  export async function load(
    { question }: { question: string },
    route: Route,
    ctx: SSRContext
  ) {
    const data = await getAnswer(question);
    return { data };
  }

  function getAnswer(question: string) {
    return Promise.resolve({
      question,
      answer: 42,
    });
  }
</script>

<script lang="ts">
  export let question: string;
  export let data: Anwser;
</script>

<p>Question: {question}. Answer: {data.answer}</p>
