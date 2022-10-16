import { writable, type Writable } from "svelte/store";
import type { Game } from "$lib/types/game";
import type { Prono } from "$lib/types/prono";

export const games: Writable<[Prono, Game][]> = writable([]);

export const fetchError: Writable<String> = writable("");
export const fetchStatus: Writable<number> = writable();

export const curtain = writable(true);

export function enableCurtain() {
  curtain.set(true);
}

export function disableCurtain() {
  curtain.set(false);
}