<script>
	import PrismJs from "./prism-js.svelte";
	export let lang = "";
	export let text = "";
</script>

<PrismJs code={text} />
