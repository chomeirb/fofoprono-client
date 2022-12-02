import type { Prediction } from '$lib/types/prono';
import { writable, type Writable } from 'svelte/store';

export const pronos: Writable<Record<number, Prediction>> = writable({});
