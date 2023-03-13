<script>
  import { page } from "$app/stores";
  import SvelteMarkdown from "svelte-markdown";
  import CodeBlock from "$lib/components/code-block.svelte";
  import { onMount } from "svelte";
  let pathName = "";
  let curPage = "";
  page.subscribe(() => {
    pathName = $page.url.pathname;
    console.log(pathName);
  });

  export let data;
  let { pages } = data;
  $: ({ pages } = data); // so it stays in sync when `data` changes
  let currentPage = {title: ""};
  onMount((e) => {
    curPage = pathName.split("/")[1];
    pages.forEach((element) => {
      if (!element.category && !element.section && curPage == element.slug)
        currentPage = element;
    });
  });
</script>

<svelte:head><title>{currentPage.title}</title></svelte:head>

{#if currentPage}
  <h1>{currentPage.title}</h1>

  <article class="postContent">
    <SvelteMarkdown
      source={currentPage.content}
      renderers={{ code: CodeBlock }}
    />
  </article>
{/if}
