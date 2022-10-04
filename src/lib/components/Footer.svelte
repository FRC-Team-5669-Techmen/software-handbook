<script>
	import Icon from "svelte-icons-pack/Icon.svelte";
	import Github from "svelte-icons-pack/fi/FiGithub";
</script>

<div id="line" />
<footer>
	Copyright &copy; Techmen Robotics {`${new Date().getFullYear()}`} - All rights
	reserved
	<div id="socials">
		<a href="https://github.com/FRC-Team-5669-Techmen" target="_blank">
			<Icon src={Github} size="25" className="navbarIcon" />
		</a>
	</div>
</footer>

<style>
	#line {
		margin-top: 100px;
		width: 100%;
		height: 1px;
		background-image: linear-gradient(
			to right,
			var(--middleGray) 0%,
			var(--lighterMiddleGray) 20%,
			var(--lighterMiddleGray) 80%,
			var(--middleGray) 100%
		);
	}
	#socials {
		margin-top: 20px;
	}
	footer {
		width: 100%;
		height: 100px;
		padding: 50px 0;
		color: var(--lighterMiddleGray);
	}
</style>
