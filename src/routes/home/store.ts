import { writable, type Writable } from "svelte/store";
import type { Game } from "$lib/types/game";

export const games: Writable<Game[]> = writable([]);

export const fetchError: Writable<String> = writable("");