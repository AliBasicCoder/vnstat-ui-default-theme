// @ts-nocheck
import { writable } from "svelte/store";
import { merge } from "lodash";
import { defaultOptions } from "../../data.json";
import { init } from "./selStore.js";
import { errors } from "./errors";
import {
  getConfig,
  getInterfacesList,
  getSelectedInterface,
  getData,
  getMonthlyData,
} from "vnstat-ui-deps";

export async function getEveryThing() {
  try {
    const data = await getData();
    const fullConfig = await getConfig();
    /** @type {DefaultThemeConfig} */
    const config = merge(
      defaultOptions,
      fullConfig.config.client.themeConfig,
    );
    let interfacesList;
    if (config.useCustomInterfaces) {
      interfacesList = [];
      for (const key in config.customInterfaces) {
        const element = config.customInterfaces[key];
        interfacesList.push({ name: element, value: key });
      }
    } else {
      interfacesList = (await getInterfacesList()).map((item) => ({
        name: item,
        value: item,
      }));
    }
    console.log(config.useCustomInterfaces, interfacesList);
    const selectedInterface = getSelectedInterface() ||
      (config.useCustomInterfaces
        ? Object.keys(config.customInterfaces)[0]
        : interfacesList[0].value) ||
      interfacesList[0].value;
    if (config.clickAndHoverToSelect) init();
    // test if interface exits
    getMonthlyData(data, selectedInterface);
    return {
      data,
      fullConfig,
      config,
      interfacesList,
      selectedInterface,
    };
  } catch (error) {
    errors.set(error.stack);
    throw error;
  }
}

export const store = writable({
  data: {
    vnstatversion: "1.0",
    jsonversion: "1",
    interfaces: [
      {
        id: "enp1s0",
        nick: "enp1s0",
        created: {
          date: {
            year: 1970,
            month: 1,
            day: 1,
          },
        },
        updated: {
          date: {
            year: 1970,
            month: 1,
            day: 1,
          },
          time: {
            hour: 1,
            minute: 0,
          },
        },
        traffic: {
          days: [],
          months: [],
          tops: [],
          hours: [],
        },
      },
    ],
  },
  config: defaultOptions,
  fullConfig: {
    client: {
      theme: "vnstat-ui-default-theme",
      themesConfig: {
        "vnstat-ui-default-theme": defaultOptions,
      },
    },
  },
  interfacesList: [{ name: "enp1s0", value: "enp1s0" }],
  selectedInterface: "enp1s0",
});

(async () => store.set(await getEveryThing()))();
