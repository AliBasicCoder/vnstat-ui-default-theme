<style>
  ul {
    margin-bottom: 20px;
  }

  div.tab-content {
    margin-bottom: 80px;
  }

  button.zoom-reset {
    position: relative;
    background: none;
    left: 44%;
    border: none;
    display: none;
    font-size: 1.2rem;
  }

  button.zoom-reset.black {
    color: white;
  }

  button.zoom-reset.display {
    display: unset;
  }

  label.nav-link {
    margin-bottom: 0px;
  }

  @media (min-width: 1200px) {
    button.zoom-reset {
      left: 53%;
    }
  }
</style>

<script>
  import { zoomStore } from "../stores/zoomStore.js";
  import { store } from "../stores/store.js";

  export let names = [];
  export let tabs = [];
  export let props = [];
  let selItem = 0;
  $: black = $store.config.black;

  function resetZoom() {
    $zoomStore = false;
  }
</script>

<div class="container">
  <ul class="nav nav-tabs">
    {#each names as name, i}
      <li on:click="{() => (selItem = i)}" class="nav-item">
        <label class="nav-link" class:active="{i === selItem}">{name}</label>
      </li>
    {/each}
    <button
      on:click="{resetZoom}"
      class="zoom-reset"
      class:display="{$zoomStore}"
      class:black
    >
      <li class="icon-ccw"></li>
    </button>
  </ul>

  <div class="tab-content">
    {#each tabs as tab, i}
      <div
        class="{'tab-pane fade'}"
        class:show="{i === selItem}"
        class:active="{i === selItem}"
      >
        <svelte:component this="{tab}" {...props[i]} />
      </div>
    {/each}
  </div>
</div>
