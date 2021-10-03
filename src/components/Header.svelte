<style>
  nav {
    background-color: #f8f9fa;
    margin-bottom: 20px;
  }

  nav.black {
    margin-bottom: 25px;
    color: white;
    background-color: #6d6d6d;
  }

  a.black {
    color: white;
  }

  button.black {
    background-color: #898989;
  }

  label.navbar-brand {
    margin-bottom: 0px;
  }

</style>

<script>
  import { getEveryThing } from "../stores/store";
  import { store, interfaceExists } from "../stores/store.js";
  import { errors } from "../stores/errors.js";

  $: selInterface = $store.selectedInterface;
  $: interfacesList = $store.interfacesList;
  $: black = $store.config.black;
  let show = false;

  function toggle() {
    show = !show;
  }

  function update(selInterface) {
    if (!interfaceExists(selInterface, $store.data)) {
      errors.set(new Error(`interface ${selInterface} doesn't exist`).stack);
      return;
    }
    history.pushState("", "", `/?i=${selInterface}`);
    getEveryThing().then((res) => store.set(res));
  }

</script>

<nav class="navbar sticky-top" class:black>
  <div class="container">
    <label class="navbar-brand" class:black>
      Network Traffic ({selInterface})
    </label>

    <div class="dropdown">
      <button
        class="btn btn-secondary dropdown-toggle"
        class:black
        on:click="{toggle}"
      >
        Interface Selection
      </button>

      <div class="dropdown-menu" class:show>
        {#each interfacesList as item}
          <label on:click="{() => update(item.value)}" class="dropdown-item">
            {item.name}
          </label>
        {/each}
      </div>
    </div>
    <a href="/configure" style="font-size: 1.5rem;" class:black>
      <i class="icon-cog"></i>
    </a>
  </div>
</nav>
