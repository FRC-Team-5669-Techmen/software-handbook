<div class="backgroundPattern"></div>

<style>
    .backgroundPattern {
        z-index: 0;
        width: 100vw;
        height: 100vh;
        position: absolute;
        top: 0;
        left: 0;
	background-size: 35px 35px;
	background-image:
		linear-gradient(to right, var(--superdarkgray) 1px, transparent 1px),
		linear-gradient(to bottom, var(--superdarkgray) 1px, transparent 1px);
	background-position: center;
    mask-image: linear-gradient( to bottom, black, #0000)
    }
</style>