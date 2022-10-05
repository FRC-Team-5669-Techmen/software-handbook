<script>
	import Header from "../lib/components/Header.svelte";
	import Sidebar from "../lib/components/Sidebar.svelte";
	import Footer from "../lib/components/Footer.svelte";
	import "../lib/styles/main.css";
	import "../lib/styles/prism-theme.css";
	import "../lib/styles/font.css";
	import BackgroundPattern from "../lib/components/BackgroundPattern.svelte";
	let breakpoint = 1100;
	let y;
	let open = false;
	function handleHamburgerClick() {
		console.log("asdf");
		open = !open;
	}
    import { page } from '$app/stores';
	let pathName = ""
	page.subscribe(() => {
		pathName = $page.url.pathname.split("/");
		pathName.pop()
		pathName = pathName.join("/")
		console.log(pathName);
	});
</script>

<svelte:window bind:innerWidth={y} />
<div id="container">
	{#if y > breakpoint}
		<Sidebar {breakpoint} {y} {open} />
	{/if}
	<main class="main">
		<p style="color: var(--lightGray); font-weight: bold; margin-bottom: 0">{pathName}</p>
		<slot />
		<Footer />
	</main>
	{#if y <= breakpoint}
		<Sidebar {breakpoint} {y} {open} />
	{/if}
</div>
<Header {breakpoint} {y} on:click={handleHamburgerClick} />

<style>
	#container {
		width: min(1300px, 100vw);
		height: fit-content;
		min-height: 100vh;
		display: flex;
		margin: auto;
	}
	.main {
		position: relative;
		padding: 0 50px;
		padding-right: 80px;
		z-index: -100;
		position: relative;
		width: 100%;
		background-size: 35px 35px;
		background-image: linear-gradient(
				to right,
				var(--superdarkgray) 1px,
				transparent 1px
			),
			linear-gradient(to bottom, var(--superdarkgray) 1px, transparent 1px);
		background-position: center; /**inset box shadow*/
		box-shadow: 0 0 50px inset var(--black);
		padding-top: 120px;
	}
	@media (max-width: 1100px) {
		.main {
			width: 100%;
		}
	}
</style>
