<style>
  canvas {
    margin-bottom: 20px;
  }
</style>

<script>
  import { onMount, afterUpdate, onDestroy } from "svelte";
  import { Chart } from "chart.js";
  import { zoomStore } from "../stores/zoomStore.js";

  export let options;
  let chart;
  let canvas;

  onMount(() => {
    if (options) {
      chart = new Chart(canvas.getContext("2d"), options);
      chart.render();
      canvas.style.width = `${minWidth()}px`;
      canvas.style.height = `${minHeight()}px`;
    }
  });
  afterUpdate(() => {
    if (options) {
      if (!chart) {
        chart = new Chart(canvas.getContext("2d"), options);
        chart.render();
        canvas.style.width = `${minWidth()}px`;
        canvas.style.height = `${minHeight()}px`;
      } else {
        chart.data = options.data;
        chart.update();
      }
    }
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

  const unSub = zoomStore.subscribe((st) => {
    if (!st && chart) {
      chart.resetZoom();
    }
  });

  onDestroy(unSub);
</script>

<canvas bind:this="{canvas}"></canvas>
