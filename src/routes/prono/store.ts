import type { Prono } from "$lib/types/prono";
import { writable, type Writable } from "svelte/store";

export const pronos: Writable<Prono[]> = writable([]);

export const fetchError: Writable<string> = writable("");