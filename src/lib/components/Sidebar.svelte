<script>
  import SearchButton from "./SearchButton.svelte";
  import summary from "../summary.json";
  import Icon from "svelte-icons-pack/Icon.svelte";
  import RiDeviceCpuLine from "svelte-icons-pack/ri/RiDeviceCpuLine";
  import RiDesignCompasses2Line from "svelte-icons-pack/ri/RiDesignCompasses2Line";
  import RiSystemSettings5Line from "svelte-icons-pack/ri/RiSystemSettings5Fill";
  import RiDevelopmentCodeSSlashFill from "svelte-icons-pack/ri/RiDevelopmentCodeSSlashFill";
  console.log(summary);
  export let y = 0;
  export let breakpoint = 0;
  export let open = false;
  import { page } from "$app/stores";
  let pathName = "";
  page.subscribe(() => {
    pathName = $page.url.pathname;
    console.log(pathName);
  });
  let categories = {
    Software: {
      icon: RiDevelopmentCodeSSlashFill,
      open: true,
    },
    Electrical: {
      icon: RiDeviceCpuLine,
      open: true,
    },
    Mechanical: {
      icon: RiSystemSettings5Line,
      open: true,
    },
    Design: {
      icon: RiDesignCompasses2Line,
      open: true,
    },
  };
  function setCategory(cat) {
    for (const key in categories) {
      if (Object.hasOwnProperty.call(categories, key)) {
        const element = categories[key];
        categories[key].open = false;
      }
    }
    if (!cat) return;
    categories[cat].open = true;
    console.log(cat);
  }

  import { onMount } from "svelte";
  let heightTransition = "";

  onMount(async () => {
    for (const key in categories) {
      if (Object.hasOwnProperty.call(categories, key)) {
        const element = categories[key];
        element.height = element.content.getBoundingClientRect().height + "px";
        setCategory(capitalizeFirstLetter(pathName.split("/")[1]) || null);
        heightTransition = "opacity 0.3s, height 0.3s";
		setTimeout(() => {
			
		}, 100);
      }
    }
  });
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
</script>

<div id="sidebar" class={open ? "open" : ""}>
  <div id="content">
    <div id="inner">
      {#each summary.pages as link}
        <a href={link[1]} class={link[1] == pathName ? "link-active" : ""}
          >{link[0]}</a
        >
      {/each}
      {#each Object.entries(summary.categories) as [name, content]}
        <button
          id={categories[name].open ? "active-category" : ""}
          class="category-label"
          on:click={() => setCategory(name)}
        >
          <Icon
            src={categories[name].icon}
            color="var(--yellow)"
            className="categoryIcon"
          />
          <h1>{name}</h1>
        </button>
        <div
          bind:this={categories[name].content}
          style:--height={categories[name].open
            ? categories[name].height
            : "0px"}
          style:transition={heightTransition}
          class={"category-content " +
            (categories[name].open ? "category-open" : "")}
        >
          {#each content.pages as surfacePage}
            <a
              class={"inner-margin " +
                (surfacePage[1] == pathName + "/" ? "link-active" : "")}
              href={surfacePage[1]}>{surfacePage[0]}</a
            >
          {/each}
          {#each Object.entries(content.sections) as [title, inner]}
            <h3 class="inner-margin">{title}</h3>
            <div class="innerPages">
              {#each inner.pages as page}
                <a
                  class={"innerPage " +
                    (page[1] == pathName ? "link-active" : "")}
                  href={page[1]}>{page[0]}</a
                >
              {/each}
            </div>
          {/each}
        </div>
      {/each}
    </div>
  </div>
  {#if y <= breakpoint}
    <SearchButton className="inSidebar" {breakpoint} {y} />
  {/if}
</div>

<style>
  .link-active {
    color: var(--yellow);
    text-decoration: underline;
  }
  .inner-margin {
    margin-left: 15px;
  }
  .innerPage {
    margin-left: 30px;
  }
  .innerPages {
    margin: 0;
    background-image: linear-gradient(
      to right,
      transparent 20px,
      var(--lighterMiddleGray) 20px,
      var(--lighterMiddleGray) 21px,
      transparent 21px
    );
  }
  a {
    padding: 5px 0;
    text-decoration: none;
    font-weight: bolder;
    margin-left: -7px;
    padding-left: 7px !important;
	cursor: pointer;
  }
  button {
	cursor: pointer;
}
  a:hover {
    background: rgba(255, 255, 255, 0.15);
    border-radius: 5px;
  }
  h3 {
    margin-top: 15px;
    margin-bottom: 10px;
  }
  .category-label {
    position: relative;
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
  .category-content {
    overflow: hidden;
    opacity: 0;
    transform-origin: top;

    margin-bottom: 20px;
    background-image: linear-gradient(
      to right,
      transparent 5px,
      var(--middleGray) 5px,
      var(--middleGray) 6px,
      transparent 6px
    );

    height: var(--height);
  }
  .category-open {
    opacity: 1;
  }
  .category-label h1 {
    position: absolute;
    display: inline;
    padding: 0;
    margin: 0;
    font-size: 30px;
    font-family: "Space Grotesk";
    color: var(--white);
    top: 50%;
    transform: translateY(-50%);
    left: 40px;
    text-align: left;
  }
  #active-category h1 {
    color: var(--yellow);
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
