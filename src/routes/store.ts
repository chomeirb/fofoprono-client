import { writable, type Writable } from 'svelte/store';
import type { Competition } from '$lib/types/competition';
import type { Prono } from '$lib/types/prono';
import type { Game } from '$lib/types/game';
import type { ResponseResult } from '$lib/types/returnable';
import type { RankedUser } from '$lib/types/player';

export const competitions: Writable<ResponseResult<Competition[]>> = writable({
	status: undefined!,
	text: 'LOADING',
	data: []
});

export const games: Writable<ResponseResult<[Prono, Game][]>> = writable({
	status: undefined!,
	text: 'LOADING',
	data: []
});

export const session: Writable<ResponseResult<string>> = writable({
	status: undefined!,
	text: 'LOADING',
	data: ''
});

export const players: Writable<ResponseResult<RankedUser[]>> = writable({
	status: undefined!,
	text: 'LOADING',
	data: []
});

export const selected_competition: Writable<number> = writable();
