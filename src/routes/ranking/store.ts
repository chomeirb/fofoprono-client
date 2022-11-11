import { writable, type Writable } from "svelte/store";


export const fetchError: Writable<String> = writable("");
export const fetchStatus: Writable<number> = writable();
export const fetchLoggedIn: Writable<boolean> = writable();

import { goto } from '$app/navigation';
import { page as Page } from '$app/stores';

const URLSearchParamsToObject = (params: URLSearchParams) => {
  let obj: Record<string, string> = {};
  params.forEach((val: string, key: string) => {
    obj[key] = val;
  });
  return obj;
};

export const getQueryParamsStore = (key: string, defaultValue: string = '') => {
  let params: Record<string, string>;
  Page.subscribe((page) => {
    params = URLSearchParamsToObject(page.url.searchParams);
  });

  return {
    subscribe: (cb: Function) => {
      return Page.subscribe((page) => {
        cb(page.url.searchParams.get(key) ?? defaultValue);
      });
    },
    set: (value: string) => {
      params[key] = value;
      const urlSearchParams = new URLSearchParams(params);
      goto(`?${urlSearchParams.toString()}`, {
        keepfocus: true,
        replaceState: true,
        noscroll: true
      });
    }
  };
};