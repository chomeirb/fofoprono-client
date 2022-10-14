import { writable } from "svelte/store";

export const curtain = writable(true);

export function enableCurtain() {
  curtain.set(true);
}

export function disableCurtain() {
  curtain.set(false);
}