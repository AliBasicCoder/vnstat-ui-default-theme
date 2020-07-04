<style>
  div {
    position: fixed;
    bottom: 4rem;
    right: 1.5rem;
    background-color: blue;
    color: white;
    border-radius: 15px;
    padding: 20px;
    display: none;
  }

  td {
    padding-right: 16px;
  }

  button {
    position: absolute;
    top: 2px;
    right: 0.3rem;
    border: none;
    background: none;
    color: white;
    font-weight: bold;
    font-size: 25px;
  }

  div.black {
    background-color: #6d6d6d;
  }
</style>

<script>
  import convertSize from "convert-size";
  import { selStore } from "../stores/selStore.js";
  import { store } from "../stores/store.js";
  import { getKey } from "../getKey.js";

  export let time;
  let totalDown = 0;
  let totalUp = 0;
  let lastLength = 0;
  let key = getKey(time);
  $: len = Object.keys($selStore[key]).length;
  $: totalDown = reduce($selStore[key], (pv, cv) => pv + cv.down);
  $: totalUp = reduce($selStore[key], (pv, cv) => pv + cv.up);
  $: black = $store.config.black;

  function reduce(obj, func, initial = 0) {
    let pv = initial;
    for (const key in obj) {
      const element = obj[key];
      const temp = func(pv, element);
      pv = temp;
    }
    return pv;
  }

  function unSel() {
    $selStore[key] = {};
  }
</script>

<div style="{`display: ${len === 0 ? 'none' : 'block'};`}" class:black>
  <button on:click="{unSel}">X</button>
  <table>
    <thead>
      <tr>
        <th>Received</th>
        <th>Send</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{convertSize(totalDown, { accuracy: 1 })}</td>
        <td>{convertSize(totalUp, { accuracy: 1 })}</td>
        <td>{convertSize(totalUp + totalDown, { accuracy: 1 })}</td>
      </tr>
    </tbody>
  </table>
</div>
