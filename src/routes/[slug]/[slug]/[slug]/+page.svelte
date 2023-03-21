<script>
  import { onMount } from "svelte";
  import SvelteMarkdown from "svelte-markdown";
  import CodeBlock from "$lib/components/code-block.svelte";
  import { page } from "$app/stores";
  let pathName = "";
  let category = "";
  let section = "";
  let curPage = "";
  export let data;
  let { pages } = data;
  $: ({ pages } = data); // so it stays in sync when `data` changes
  let currentPage = { title: "" };
  function mnt(){
    pages.forEach((element) => {
      if (element.category && element.section) {
        if (
          element.category.title.toLowerCase() == category.replace("-", " ") &&
          element.section.title.toLowerCase() == section.replace("-", " ") &&
          curPage == element.slug
        ) {
          currentPage = element;
        }
      }
    });

  }
  onMount(mnt);
  page.subscribe(() => {
    pathName = $page.url.pathname;
    category = pathName.split("/")[1];
    section = pathName.split("/")[2];
    curPage = pathName.split("/")[3];
    mnt()
  });
</script>

<svelte:head><title>{currentPage.title}</title></svelte:head>

{#if currentPage}
  <h2>{currentPage.title}</h2>

  <article class="postContent">
    <SvelteMarkdown
      source={currentPage.content}
      renderers={{ code: CodeBlock }}
    />
  </article>
{/if}