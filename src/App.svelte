<script context="module">
  export async function preload(id) {
    return {
      article: {
        id,
        title: 'hello'
      }
    };
  }
</script>

<script>
  // import Child from './Child';
  // export let article;
</script>
<!--
<style>
  .foo {
    color: blue;
  }

  .foo .child {
    color: red;
  }
</style>

<h1 class="foo">
  {article.title}
  <Child class="$.child" />
</h1> -->

<h1>Hello World</h1>
<img src="./favicon.png" alt>