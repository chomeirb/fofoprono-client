import { writable, type Writable } from "svelte/store";
import type { Game } from "$lib/types/game";
import type { PronoResult } from "$lib/types/prono";
import type { ResponseResult } from "$lib/types/returnable";

export const darkMode: Writable<boolean> = writable(false);

export const games: Writable<ResponseResult<[PronoResult, Game][]>> = writable({
    status: undefined!,
    text: 'LOADING',
    data: [],
});

export const session: Writable<ResponseResult<string>> = writable({
    status: undefined!,
    text: undefined!,
    data: '',
});

export const curtain = writable(true);

export function enableCurtain() {
    curtain.set(true);
}

export function disableCurtain() {
    curtain.set(false);
}
