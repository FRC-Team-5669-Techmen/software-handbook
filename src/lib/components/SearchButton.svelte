<script>
	import Icon from "svelte-icons-pack/Icon.svelte";
	import GithubLogo from "svelte-icons-pack/fi/FiGithub";
	import SearchButton from "./SearchButton.svelte";
	import RiSystemSearchLine from "svelte-icons-pack/ri/RiSystemSearchLine";
	export let className = "";
</script>

<div id="searchBar" class={className}>
	<button id="searchButton">Search</button>
	<Icon size="18" src={RiSystemSearchLine} className="searchbaricon" />
</div>

<style>
	:root {
		--border: rgba(255, 255, 255, 0.15);
	}
	#searchBar {
		width: fit-content;
		height: fit-content;
		position: relative;
	}
	#searchButton {
		position: relative;
		width: 250px;
		padding: 10px;
		background: transparent;
		background: var(--border);
		border: 1px solid var(--border);
		border-radius: 5px;
		transition: outline 0.1s, background 0.1s;
		outline: 0px solid black;
		text-align: left;
		color: var(--lightGray);
		cursor: pointer;
		z-index: 100;
	}
	#searchButton:focus {
		outline: 2px solid var(--yellow);
	}
	#searchButton:hover {
		background: rgba(255, 255, 255, 0.25);
	}
	/**ensure that before is placed below insidebar*/
	.inSidebar {
		position: absolute !important;
		top: 0px;
		z-index: 100;
		top: 30px;
		left: 50%;
		transform: translate(-50%);
	}
</style>
