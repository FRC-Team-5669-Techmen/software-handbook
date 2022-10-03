<script>
    import Logo from "./Logo.svelte"
</script>
<header>
    <Logo size={50}></Logo>
</header>

<style> 
header{
    position: fixed;
    width: 100vw;
    top: 0;
    left: 0;
    height: 60px;
    background: rgba(0, 0, 0, 0.363);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000000;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border-bottom: 1px solid rgba(248,250,252,.06);
}
</style>