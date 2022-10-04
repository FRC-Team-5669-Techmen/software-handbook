<script>
	import Logo from "./Logo.svelte";
	import Icon from "svelte-icons-pack/Icon.svelte";
	import GithubLogo from "svelte-icons-pack/fi/FiGithub";
	import SearchButton from "./SearchButton.svelte";
	import RiSystemMenu3Fill from "svelte-icons-pack/ri/RiSystemMenu2Fill";
	import RiSystemCloseFill from "svelte-icons-pack/ri/RiSystemCloseFill";
	import RiSystemSearchLine from "svelte-icons-pack/ri/RiSystemSearchLine";
	export let y = 0;
	let open = false;
	export let breakpoint = 1100;
</script>

<header>
	<div id="content">
		{#if y > breakpoint}
			<h3>Techmen Robotics Handbook</h3>
		{/if}
		<Logo size={40} />
		{#if y > breakpoint}
			<div id="interactables">
				<SearchButton />
				<div class="vertical-divider" />
				<a
					class="interactableIcon"
					href="https://github.com/FRC-Team-5669-Techmen"
					target="_blank"
				>
					<Icon src={GithubLogo} size="25" className="navbarIcon" />
				</a>
			</div>
		{/if}
		{#if y <= breakpoint}
			<button id="hamburger" on:click>
				<Icon
					size="32"
					color="var(--yellow)"
					className="icon-button"
					src={RiSystemMenu3Fill}
				/>
			</button>
			<div id="interactables">
				<a
					class="interactableIcon"
					href="https://github.com/FRC-Team-5669-Techmen"
					target="_blank"
				>
					<Icon src={GithubLogo} size="25" className="navbarIcon" />
				</a>
			</div>
		{/if}
	</div>
</header>

<style>
	:root {
		--border: rgba(255, 255, 255, 0.15);
	}
	header {
		position: fixed;
		width: 100%;
		box-sizing: border-box;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.363);
		z-index: 1000000;
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		border-bottom: 1px solid var(--border);
		gap: 20px;
	}
	#content {
		width: min(1300px, 100vw);
		height: 65px;
		display: flex;
		margin: auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	h3 {
		width: fit-content;
		text-align: left;
		margin-left: 25px;
	}
	#interactables {
		margin-left: auto;
		display: flex;
		align-items: center;
		justify-content: right;
		gap: 10px;
		margin-right: 20px;
	}
	.vertical-divider {
		width: 1px;
		height: 30px;
		margin: 5px;
		background: var(--border);
	}
	.interactableIcon {
		background: transparent;
		border: none;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 15px;
		cursor: pointer;
	}
	#hamburger {
		background: transparent;
		border: none;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 15px;
		cursor: pointer;
		margin-left: 25px;
	}
</style>
