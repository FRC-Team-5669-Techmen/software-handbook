<script>
    import Header from "../lib/components/Header.svelte";
    import  "../lib/styles/main.css"
    import  "../lib/styles/prism-theme.css"
    import  "../lib/styles/font.css"
    import BackgroundPattern from "../lib/components/BackgroundPattern.svelte";
</script>

<main>
    <slot></slot>
</main>
<Header></Header>