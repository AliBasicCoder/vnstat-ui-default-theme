<script>
  import Table from "./Table.svelte";
  import Chart from "./Chart.svelte";
  import Float from "./Float.svelte";
  import { store } from "../stores/store.js";
  import { chartConfig } from "../chartConfig.js";

  export let time;
  export let labels;
  export let downData;
  export let upData;
  $: aLabels = [...labels].reverse();
  $: aDownData = [...downData].reverse();
  $: aUpData = [...upData].reverse();
  $: config = $store.config;
  $: options = config
    ? chartConfig(config, aLabels, aDownData, aUpData)
    : undefined;
</script>

<Chart options="{options}" />
<Table
  time="{time}"
  labels="{labels}"
  downData="{downData}"
  upData="{upData}"
/>
<Float time="{time}" />
