import { writable, type Writable } from "svelte/store";
import type { Game } from "$lib/types/game";
import type { PronoResult } from "$lib/types/prono";

export const games: Writable<[PronoResult, Game][]> = writable([]);

export const fetchError: Writable<String> = writable("");
export const fetchStatus: Writable<number> = writable();
export const fetchLoggedIn: Writable<boolean> = writable();
export const darkMode: Writable<boolean> = writable(false);

export const curtain = writable(true);

export function enableCurtain() {
  curtain.set(true);
}

export function disableCurtain() {
  curtain.set(false);
}
