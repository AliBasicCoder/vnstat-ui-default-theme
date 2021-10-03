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
    let selectedInterface = getSelectedInterface() || interfacesList[0].value;
    if (!interfaceExists(selectedInterface, data)) {
      if (getSelectedInterface()) throw new Error(`interface "${getSelectedInterface()}" doesn't exist`);
      let found = false;
      for (let i = 1; i < interfacesList.length; i++) {
        if (interfaceExists(interfacesList[i].value, data)) {
          selectedInterface = interfacesList[i].value;
          found = true;
          break;
        }
      }
      if (!found) throw new Error(`Couldn't find any working interface`);
    }
    if (config.clickAndHoverToSelect) init();
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

/**
 * @returns {boolean}
 * @param {string} inter
 */
export function interfaceExists(inter, data) {
  if (inter.indexOf("+") !== -1) {
    for (const item of inter.split("+")) {
      if (data.interfaces.find(inter2 => (inter2.name || inter2.id) === item) === undefined)
        return false;
    }
    return true;
  }

  return data.interfaces.find(inter2 => (inter2.name || inter2.id) === inter) !== undefined;
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
