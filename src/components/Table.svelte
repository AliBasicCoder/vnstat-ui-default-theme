<style>
  table.black {
    color: white;
  }

  tr.selected {
    background-color: #acacac;
  }

  tr.selected.black {
    background-color: #6d6d6d;
  }
</style>

<script>
  import convertSize from "convert-size";
  import { store } from "../stores/store.js";
  import { selStore } from "../stores/selStore.js";
  import { getKey } from "../getKey.js";

  export let time;
  export let labels;
  export let downData;
  export let upData;
  let key = getKey(time);
  $: black = $store.config.black;

  function over() {
    $selStore.hovered = true;
  }

  function out() {
    $selStore.hovered = false;
  }

  function toggle(i) {
    if (!$selStore[key][i])
      $selStore[key][i] = { up: upData[i], down: downData[i] };
    else {
      selStore.update((pv) => {
        delete pv[key][i];
        return pv;
      });
    }
  }
</script>

<table
  class="table table-bordered"
  class:black
  on:mouseenter="{over}"
  on:mouseleave="{out}"
>
  <thead>
    <th>{time}</th>
    <th>Recived</th>
    <th>Send</th>
    <th>Total</th>
  </thead>
  <tbody>
    {#each labels as label, i}
      <tr
        on:click="{() => toggle(i)}"
        on:mouseover="{() => ($selStore.clicking ? toggle(i) : null)}"
        class:selected="{$selStore[key][i]}"
        class:black
      >
        <td>{label}</td>
        <td>{convertSize(upData[i], { accuracy: 1 })}</td>
        <td>{convertSize(downData[i], { accuracy: 1 })}</td>
        <td>{convertSize(upData[i] + downData[i], { accuracy: 1 })}</td>
      </tr>
    {/each}
  </tbody>
</table>
