<script>
	import { page } from "$app/stores";
	import SvelteMarkdown from "svelte-markdown";
	import CodeBlock from "$lib/components/code-block.svelte";
	import { onMount } from "svelte";
	let pathName = "";
	let curPage = ""
	page.subscribe(() => {
	  pathName = $page.url.pathname;
	  console.log(pathName);
	});
  
	export let data;
	let { pages } = data;
	$: ({ pages } = data); // so it stays in sync when `data` changes
	onMount(e=>{
		curPage = pathName.split("/")[1];
	})
  </script>
  
  {#each pages as page}
	{#if !page.category && !page.section && curPage == page.slug}
	  <h1>{page.title}</h1>
  
	  <article class="postContent">
		<SvelteMarkdown source={page.content} renderers={{ code: CodeBlock }} />
	  </article>
	{/if}
  {/each}
  