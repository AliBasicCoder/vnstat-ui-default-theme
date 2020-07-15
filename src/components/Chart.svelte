<style>
  canvas {
    margin-bottom: 20px;
  }
</style>

<script>
  import { onMount, afterUpdate } from "svelte";
  import { Chart } from "chart.js";
  import { zoomStore } from "../stores/zoomStore.js";

  export let options;
  let chart;
  let canvas;
  $: zoomListen = !$zoomStore && chart && chart.resetZoom();

  onMount(() => {
    chart = new Chart(canvas.getContext("2d"), options);
    Object.assign(canvas.style, {
      width: `${minWidth()}px`,
      height: `${minHeight()}px`
    });
  });
  afterUpdate(() => {
    chart.data = options.data;
    chart.update();
  });

  function minHeight() {
    const { innerWidth: width } = window;
    if (width <= 767) return 255;
    if (width >= 768 && width <= 991) return 345;
    if (width >= 992 && width < 1200) return 465;
    if (width >= 1200) return 555;
  }

  function minWidth() {
    const { innerWidth: width } = window;
    if (width <= 767) return 510;
    if (width >= 768 && width <= 991) return 690;
    if (width >= 992 && width < 1200) return 930;
    if (width >= 1200) return 1110;
  }
</script>

<canvas bind:this="{canvas}"></canvas>
