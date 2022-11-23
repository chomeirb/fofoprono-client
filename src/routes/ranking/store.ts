import { writable, type Writable } from "svelte/store";

export const fetchError: Writable<String> = writable("");
export const fetchStatus: Writable<number> = writable();

import { goto } from '$app/navigation';
import { page as Page } from '$app/stores';
