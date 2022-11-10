import type { Current, Other, UserScore } from "$lib/types/player";
import { writable, type Writable } from "svelte/store";

export const players: Writable<(Current)[]> = writable([]);

export const fetchError: Writable<String> = writable("");
export const fetchStatus: Writable<number> = writable();
export const fetchLoggedIn: Writable<boolean> = writable();