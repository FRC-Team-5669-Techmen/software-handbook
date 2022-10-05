<script>
	import SearchButton from "./SearchButton.svelte";
	import summary from "../summary.json";
	import Icon from "svelte-icons-pack/Icon.svelte";
	import RiDeviceCpuLine from "svelte-icons-pack/ri/RiDeviceCpuLine";
	import RiDesignCompasses2Line from "svelte-icons-pack/ri/RiDesignCompasses2Line";
	import RiSystemSettings5Line from "svelte-icons-pack/ri/RiSystemSettings5Line";
	import RiDevelopmentCodeSSlashFill from "svelte-icons-pack/ri/RiDevelopmentCodeSSlashFill";
	console.log(summary);
	export let y = 0;
	export let breakpoint = 0;
	export let open = false;
	let categories = {
		"Software": {
			"icon":  RiDevelopmentCodeSSlashFill,
			"open": false
		},
		"Electrical" : {
			"icon": RiDeviceCpuLine,
			"open": false
		},
		"Mechanical": {
			'icon': RiSystemSettings5Line,
			"open": false

		},
		"Design": {
			"icon": RiDesignCompasses2Line,
		"open": false		}
	}
	function setCategory(cat){
		for (const key in categories) {
			if (Object.hasOwnProperty.call(categories, key)) {
				const element = categories[key];
				categories[key].open = false
			}
		}
		categories[cat].open = true
		console.log(cat)
	}
</script>

<div id="sidebar" class={open ? "open" : ""}>
	<div id="content">
		<div id="inner">
			{#each summary.pages as link}
				<a href={link[1]}>{link[0]}</a>
			{/each}
			{#each Object.entries(summary.categories) as [name, content]}
				<button id={categories[name].open ? "active-category" : ""} class="category-label" on:click={() => setCategory(name)}>
					<Icon src={categories[name].icon} color="var(--yellow)" className="categoryIcon"></Icon>
					<h1>{name}</h1>
				</button>
				{#if categories[name].open}
				{#each content.pages as surfacePage}
					<a class="inner-margin" href={surfacePage[1]}>{surfacePage[0]}</a>
				{/each}
				{#each Object.entries(content.sections) as [title, inner]}
					<h3 class="inner-margin">{title}</h3>
					<div class="innerPages">
					{#each inner.pages as page}
						<a class="innerPage" href={page[1]}>{page[0]}</a>
					{/each}</div>
				{/each}
				{/if}
			{/each}
		</div>
	</div>
	{#if y <= breakpoint}
		<SearchButton className="inSidebar" {breakpoint} {y} />
	{/if}
</div>

<style>
	.inner-margin {
		margin-left: 15px;
	}
	.innerPage {
		margin-left: 30px;
	}
	.innerPages {
		margin-bottom: 20px;
		background-image: linear-gradient(to right, transparent 20px, var(--lighterMiddleGray) 20px, var(--lighterMiddleGray) 21px, transparent 21px);
	}
	h3 {
		margin-top: 15px;
		margin-bottom: 10px;
	}
	.category-label {
		position:relative;
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
	.category-label h1 {
		position: absolute;
		display: inline;
		padding: 0;
		 margin: 0;
		 font-size: 30px;
		 font-family: "Space Grotesk";
		 color: var(--white);
		top:50%;
		transform: translateY(-50%);
		left: 40px;
		text-align: left;
	}
	#active-category h1 {
		color: var(--yellow)
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
		overflow-x: hidden;
		overflow: hidden;
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
