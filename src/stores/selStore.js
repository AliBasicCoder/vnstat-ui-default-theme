// @ts-nocheck
import { writable } from "svelte/store";

export const selStore = writable(
  {
    fiveMin: {},
    hourly: {},
    daily: {},
    monthly: {},
    yearly: {},
    hovered: false,
    clicking: false
  },
);

export function init() {
  let hovered = false;

  selStore.subscribe(st => {
    hovered = st.hovered;
    window.val = st;
  });

  window.onmousedown = (e) => {
    if (hovered) e.preventDefault();
    if (e.button === 0) selStore.update(pv => {
      pv.clicking = true;
      return pv;
    });
  };

  window.onmouseup = (e) => {
    if (hovered) e.preventDefault();
    if (e.button === 0) selStore.update(pv => {
      pv.clicking = false;
      return pv;
    });
  };
}