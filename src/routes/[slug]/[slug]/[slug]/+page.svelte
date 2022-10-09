<script>
	import { onMount } from "svelte";
	import { supabase } from "$lib/supabaseClient.js";
	import { page } from "$app/stores";
	let pathName = "";
	page.subscribe(() => {
		pathName = $page.url.pathname;
		console.log(pathName);
	});
	var pages = [];
	var error;
	var categoryId = [];
	var sectionId = [];
	function titleCase(str) {
		str = str.toLowerCase();
		str = str.split(" ");
		for (var i = 0; i < str.length; i++) {
			str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
		}
		return str.join(" ");
	}
	onMount(async () => {
		supabase
			.from("categories")
			.select("id")
			.eq("slug", pathName.split("/")[1])
			.then(({ data, error, status }) => {
				categoryId = data[0].id;
				supabase
					.from("sections")
					.select("id")
					.eq("slug", pathName.split("/")[2])
					.then(({ data, error, status }) => {
						sectionId = data[0].id;
						supabase
							.from("pages")
							.select()
							.eq("category", categoryId)
							.eq("section", sectionId)
							.eq("slug", pathName.split("/")[3])
							.then(({ data, error, status }) => {
								pages = [...data];
							});
					});
			});
	});
</script>

{#each pages as page}
	<h2>{page.title}</h2>
	<p>{page.content}</p>
{/each}
