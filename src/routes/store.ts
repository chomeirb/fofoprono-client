import { writable, type Writable } from 'svelte/store';
import type { Game } from '$lib/types/game';
import type { PronoResult } from '$lib/types/prono';
import type { ResponseResult } from '$lib/types/returnable';
import type { RankedUser } from '$lib/types/player';

export const games: Writable<ResponseResult<[PronoResult, Game][]>> = writable({
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
