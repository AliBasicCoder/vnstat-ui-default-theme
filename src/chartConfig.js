import convertSize from "convert-size";
import zoomPlugin from "chartjs-plugin-zoom";
import { zoomStore } from "./stores/zoomStore";

export function chartConfig(config, labels, downData, upData) {
  return {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "Download",
          backgroundColor: config.chart.colors.down,
          data: downData,
        },
        {
          label: "Upload",
          backgroundColor: config.chart.colors.up,
          data: upData,
        },
        {
          label: "Total",
          backgroundColor: config.chart.colors.total,
          data: upData.map((item, i) => item + downData[i]),
        },
      ],
    },
    options: {
      legend: config.chart.legend,
      scales: {
        yAxes: [
          {
            ticks: {
              callback: (value) => {
                return convertSize(Number(value), { accuracy: 1 });
              },
            },
          },
        ],
      },
      tooltips: {
        callbacks: {
          label(tooltip) {
            return convertSize(Number(tooltip.value), { accuracy: 1 });
          },
        },
      },
      plugins: {
        zoom: {
          pan: {
            enabled: true,
            mode: "x",
          },
          zoom: {
            enabled: true,
            mode: "x",
            onZoom() {
              zoomStore.set(true);
            },
          },
        },
      },
    },
    plugins: [zoomPlugin]
  };
}
