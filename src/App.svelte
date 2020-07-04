<script>
  import Tabs from "./components/Tabs.svelte";
  import Footer from "./components/Footer.svelte";
  import Header from "./components/Header.svelte";
  import CT from "./components/CT.svelte";
  import { store } from "./stores/store.js";
  import { onDestroy } from "svelte";
  import { defaultOptions } from "../data.json";
  import {
    getHourlyData,
    getDailyData,
    getMonthlyData,
    get5MinData,
    getYearlyData,
    isV2Data,
  } from "vnstat-ui-deps";

  const baseNames = ["Hourly", "Daily", "Monthly"];
  $: isV2 = isV2Data($store.data);
  $: tabs = Array(isV2 ? 5 : 3).fill(CT);
  $: names = isV2 ? ["5 Min", ...baseNames, "Yearly"] : baseNames;
  $: tableData = {
    fiveMin: isV2 && get5MinData($store.data, $store.selectedInterface),
    hourly: getHourlyData($store.data, $store.selectedInterface),
    daily: getDailyData($store.data, $store.selectedInterface),
    monthly: getMonthlyData($store.data, $store.selectedInterface),
    yearly: isV2 && getYearlyData($store.data, $store.selectedInterface),
  };
  $: props = [
    isV2 && {
      time: "5 Min",
      ...tableData.fiveMin,
    },
    {
      time: "Hour",
      ...tableData.hourly,
    },
    {
      time: "Day",
      ...tableData.daily,
    },
    {
      time: "Month",
      ...tableData.monthly,
    },
    isV2 && {
      time: "Year",
      ...tableData.yearly,
    },
  ].filter(Boolean);

  $: some = $store.config.black && document.body.classList.add("black");
</script>

<Header />
<Tabs names="{names}" tabs="{tabs}" props="{props}" />
<Footer />
