<script>
	import SearchButton from "./SearchButton.svelte";
	import summary from "../summary.json";
	import Icon from "svelte-icons-pack/Icon.svelte";
	import RiDeviceCpuLine from "svelte-icons-pack/ri/RiDeviceCpuLine";
	import RiDesignCompasses2Line from "svelte-icons-pack/ri/RiDesignCompasses2Line";
	import RiSystemSettings5Line from "svelte-icons-pack/ri/RiSystemSettings5Fill";
	import RiDevelopmentCodeSSlashFill from "svelte-icons-pack/ri/RiDevelopmentCodeSSlashFill";
	import { supabase } from "$lib/supabaseClient.js";
	var pages = [];
	var categories = [];
	var sections = [];
	export let y = 0;
	export let breakpoint = 0;
	export let open = false;
	import { page } from "$app/stores";
	let pathName = "";
	page.subscribe(() => {
		pathName = $page.url.pathname;
		console.log(pathName);
	});
	let categoryData = {
		Software: {
			icon: RiDevelopmentCodeSSlashFill,
			open: true,
			content: null,
		},
		Electrical: {
			icon: RiDeviceCpuLine,
			open: true,
			content: null,
		},
		Mechanical: {
			icon: RiSystemSettings5Line,
			open: true,
			content: null,
		},
		Design: {
			icon: RiDesignCompasses2Line,
			open: true,
			content: null,
		},
	};
	function setCategory(cat) {
		for (const key in categoryData) {
			if (Object.hasOwnProperty.call(categoryData, key)) {
				const element = categoryData[key];
				categoryData[key].open = false;
			}
		}
		if (!cat) return;
		console.log(cat);
		categoryData[cat].open = true;
		console.log(cat);
	}

	import { onMount } from "svelte";
	let heightTransition = "";

	onMount(async () => {
		supabase
			.from("pages")
			.select()
			.order("index", { ascending: true })
			.then(({ data, error, status }) => {
				pages = [...data];
				console.log(pages);
				supabase
					.from("categories")
					.select()
					.order("index", { ascending: true })
					.then(({ data, error, status }) => {
						categories = [...data];
						console.log(data);
						supabase
							.from("sections")
							.select()
							.order("index", { ascending: true })
							.then(({ data, error, status }) => {
								sections = [...data];
								setTimeout(() => {
									for (const key in categoryData) {
										if (Object.hasOwnProperty.call(categoryData, key)) {
											const element = categoryData[key];
											if (element.content)
												element.height =
													element.content.getBoundingClientRect().height + "px";
											setCategory(
												capitalizeFirstLetter(pathName.split("/")[1]) || null
											);
											heightTransition = "opacity 0.3s, height 0.3s";
											setTimeout(() => {}, 100);
										}
									}
								}, 100);
							});
					});
			});
	});
	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
	function titleCase(str) {
		str = str.toLowerCase();
		str = str.split(" ");
		for (var i = 0; i < str.length; i++) {
			str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
		}
		return str.join(" ");
	}
</script>

<div id="sidebar" class={open ? "open" : ""}>
	<div id="content">
		<div id="inner">
			{#each pages as page}
				{#if (page.category == null) & (page.section == null)}
					<a
						href={"/" + (page.slug != "/" ? page.slug : "")}
						class={"/" + (page.slug != "/" ? page.slug : "") == pathName
							? "link-active"
							: ""}>{page.title}</a
					>
				{/if}
			{/each}
			{#each categories as category}
				<button
					id={categoryData[category.title].open ? "active-category" : ""}
					class="category-label"
					on:click={() => setCategory(category.title)}
					tabindex={categoryData[category.title].open ? "-1" : ""}
				>
					<Icon
						src={categoryData[category.title].icon}
						color="var(--yellow)"
						className="categoryIcon"
					/>
					<h1>{capitalizeFirstLetter(category.title)}</h1>
				</button>
				<div
					bind:this={categoryData[category.title].content}
					style:--height={categoryData[category.title].open
						? categoryData[category.title].height
						: "0px"}
					style:transition={heightTransition}
					class={"category-content " +
						(categoryData[category.title].open ? "category-open" : "")}
				>
					{#each pages as page}
						{#if page.category == category.id && !page.section}
							<a
								class={"inner-margin " +
									("/" +
										category.slug +
										(page.slug != "/" ? "/" + page.slug : "") ==
									pathName
										? "link-active"
										: "")}
								href={"/" +
									category.slug +
									"/" +
									(page.slug != "/" ? page.slug : "")}
								tabindex={categoryData[category.title].open ? "" : "-1"}
								>{page.title}</a
							>
						{/if}
					{/each}
					{#each sections as section}
						<h3 class="inner-margin">
							{titleCase(section.title.replace("_", " "))}
						</h3>
						<div class="innerPages">
							{#each pages as page}
								{#if page.category == category.id && page.section == section.id}
									<a
										class={"innerPage " +
											("/" +
												category.slug +
												"/" +
												section.slug +
												"/" +
												(page.slug != "/" ? page.slug : "") ==
											pathName
												? "link-active"
												: "")}
										href={"/" +
											category.slug +
											"/" +
											section.slug +
											"/" +
											(page.slug != "/" ? page.slug : "")}
										tabindex={categoryData[category.title].open ? "" : "-1"}
										>{page.title}</a
									>
								{/if}
							{/each}
						</div>
					{/each}
				</div>
			{/each}
		</div>
	</div>
	{#if y <= breakpoint}
		<SearchButton className="inSidebar" {breakpoint} {y} />
	{/if}
</div>

<style>
	.link-active {
		color: var(--yellow);
		text-decoration: underline;
	}
	.inner-margin {
		margin-left: 15px;
	}
	.innerPage {
		margin-left: 30px;
	}
	.innerPages {
		margin: 0;
		background-image: linear-gradient(
			to right,
			transparent 20px,
			var(--lighterMiddleGray) 20px,
			var(--lighterMiddleGray) 21px,
			transparent 21px
		);
	}
	a {
		padding: 5px 0;
		text-decoration: none;
		font-weight: bolder;
		margin-left: -7px;
		padding-left: 7px !important;
		cursor: pointer;
	}
	button {
		cursor: pointer;
	}
	a:hover,
	a:focus {
		background: rgba(255, 255, 255, 0.15);
		border-radius: 5px;
		outline: none;
	}
	h3 {
		margin-top: 15px;
		margin-bottom: 10px;
	}
	.category-label {
		position: relative;
		background: none;
		border: none;
		outline: none;
		padding: 0;
		margin: 0;
		font-size: 30px;
		font-family: "Space Grotesk";
		font-weight: bolder;
		width: 100%;
		height: 50px;
	}
	.category-label:hover *,
	.category-label:focus * {
		text-decoration: underline;
		text-decoration-color: var(--yellow);
	}
	.category-content {
		overflow: hidden;
		opacity: 0;
		transform-origin: top;

		margin-bottom: 20px;
		background-image: linear-gradient(
			to right,
			transparent 5px,
			var(--middleGray) 5px,
			var(--middleGray) 6px,
			transparent 6px
		);

		height: var(--height);
	}
	.category-open {
		opacity: 1;
	}
	.category-label h1 {
		position: absolute;
		display: inline;
		padding: 0;
		margin: 0;
		font-size: 30px;
		font-family: "Space Grotesk";
		color: var(--white);
		top: 50%;
		transform: translateY(-50%);
		left: 40px;
		text-align: left;
	}
	#active-category h1 {
		color: var(--yellow);
	}
	#sidebar {
		position: sticky;
		box-sizing: border-box;
		top: 65px;
		left: 0;
		background: rgba(0, 0, 0, 0.363);
		display: flex;
		justify-content: space-between;
		align-content: flex-start;
		flex-wrap: wrap;
		z-index: 1000000;
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		border-right: 1px solid var(--border);
		gap: 20px;
		width: 300px;
		height: calc(100vh - 65px);
		flex-shrink: 0;
		overflow: hidden !important;
	}
	#sidebar * {
		display: block;
	}
	#content {
		position: relative;
		top: 0;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		margin: 0;
		overflow-y: scroll;
		padding: 30px;
		padding-top: 30px;
		padding-bottom: 70px;
		overflow-x: hidden;
	}
	@media screen and (max-width: 1100px) {
		#content {
			position: relative;
			top: 0;
			width: 100%;
			height: 100%;
			box-sizing: border-box;
			margin: 0;
			overflow-y: scroll;
			padding: 30px;
			padding-top: 100px;
			padding-bottom: 70px;
			mask-image: linear-gradient(to bottom, transparent 70px, black 105px);
		}
		#sidebar {
			position: fixed;
			top: 65px;
			left: -300px;
			background: rgba(0, 0, 0, 0.603);
			box-shadow: 0 0 50px black;
			z-index: 109999999990000;
			transition: 0.3s left, 0.3s opacity;
			opacity: 0;
		}
		#sidebar.open {
			left: 0;
			opacity: 1;
		}
	}
	@media screen and (max-width: 500px) {
		#sidebar {
			left: -100vw;
			width: 100vw;
			background: rgba(0, 0, 0, 0.9);
		}
	}
</style>
