<script>
  import { onMount } from "svelte";
  import { supabase } from "$lib/supabaseClient.js";
	import SvelteMarkdown from "svelte-markdown";
	import CodeBlock from "$lib/components/code-block.svelte";
  import { page } from "$app/stores";
  let pathName = "";
  let category = "";
  let curPage = "";
  export let data;
  let { pages } = data;
  $: ({ pages } = data); // so it stays in sync when `data` changes
  function titleCase(str) {
    str = str.toLowerCase();
    str = str.split(" ");
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(" ");
  }
  page.subscribe(() => {
    pathName = $page.url.pathname;
    category = pathName.split("/")[1];
    curPage = pathName.split("/")[2];
    console.log(category);
  });
</script>

{#each pages as page}
  {#if page.category}
    {#if page.category.title.toLowerCase() == category.replace("-", " ") && !page.section && curPage == page.slug}
      <h2>{page.title}</h2>
  
	  <article class="postContent">
		<SvelteMarkdown source={page.content} renderers={{ code: CodeBlock }} />
	  </article>{/if}
  {/if}
{/each}
