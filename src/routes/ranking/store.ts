import type { RankedUser } from "$lib/types/player";
import { writable, type Writable } from "svelte/store";

export const players: Writable<RankedUser[]> = writable([]);

export const fetchError: Writable<String> = writable("");
export const fetchStatus: Writable<number> = writable();
export const fetchLoggedIn: Writable<boolean> = writable();