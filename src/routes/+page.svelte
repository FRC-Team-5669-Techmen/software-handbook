<script>
	import { onMount } from "svelte";
	import { supabase } from "$lib/supabaseClient.js";
	import { page } from "$app/stores";
	import SvelteMarkdown from "svelte-markdown";
	import CodeBlock from "$lib/components/code-block.svelte";
	let pathName = "";
	page.subscribe(() => {
		pathName = $page.url.pathname;
		console.log(pathName);
	});
	var pages = [];
	var error;
	onMount(async () => {
		supabase
			.from("pages")
			.select()
			.eq("slug", pathName)
			.is("category", null)
			.is("section", null)
			.order("index", { ascending: true })
			.then(({ data, error, status }) => {
				pages = [...data];
			});
	});
</script>

{#each pages as page}
	<h1>{page.title}</h1>

	<article class="postContent">
		<SvelteMarkdown source={page.content} renderers={{ code: CodeBlock }} />
	</article>
{/each}
