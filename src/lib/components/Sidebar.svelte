<script>
	import SearchButton from "./SearchButton.svelte";
	export let y = 0;
	export let breakpoint = 0;
	export let open = false;
</script>

<div id="sidebar" class={open ? "open" : ""}>
	<div id="content">
		<div id="inner">
			asdf<br />asdf<br />asdf<br />asdf<br />asdf<br />asdf<br />asdf<br
			/>asdf<br />asdf<br />asdf<br />asdf<br />asdf<br />asdf<br />asdf<br
			/>asdf<br />asdf<br />asdf<br />asdf<br />asdf<br />asdf<br />asdf<br
			/>asdf<br />asdf<br />asdf<br />asdf<br />asdf<br />asdf<br />asdf<br
			/>asdf<br />asdf<br />asdf<br />asdf<br />
			asdf<br />asdf<br />asdf<br />asdf<br />asdf<br />asdf<br />asdf<br
			/>asdf<br />asdf<br />asdf<br />asdf<br />asdf<br />asdf<br />asdf<br
			/>asdf<br />asdf<br />asdf<br />asdf<br />asdf<br />asdf<br />asdf<br
			/>asdf<br />asdf<br />asdf<br />asdf<br />asdf<br />asdf<br />asdf<br
			/>asdf<br />asdf<br />asdf<br />asdf<br />
			asdf<br />asdf<br />asdf<br />asdf<br />asdf<br />asdf<br />asdf<br
			/>asdf<br />asdf<br />asdf<br />asdf<br />asdf<br />asdf<br />asdf<br
			/>asdf<br />asdf<br />asdf<br />asdf<br />asdf<br />asdf<br />asdf<br
			/>asdf<br />asdf<br />asdf<br />asdf<br />asdf<br />asdf<br />asdf<br
			/>asdf<br />asdf<br />asdf<br />asdf<br />
		</div>
	</div>
	{#if y < breakpoint}
		<SearchButton className="inSidebar" {breakpoint} {y} />
	{/if}
</div>

<style>
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
