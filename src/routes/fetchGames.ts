import { PUBLIC_API_URL } from '$env/static/public';
import type { ResponseResult } from "$lib/types/returnable";
import type { PronoResult } from "$lib/types/prono";
import type { Game } from "$lib/types/game";
import { games } from "./store";

export async function storeGames() {
    try {
        const response = await fetch(`${PUBLIC_API_URL}/prono`, {
            method: "GET",
            credentials: "include",
        });

        let result: ResponseResult<[PronoResult, Game][]> = {
            status: response.status,
            text: response.statusText,
            data: [],
        };

        if (response.ok) {
            result.data = (await response.json()).sort(([, gameA]: [any, Game], [, gameB]: [any, Game]) => gameA.time.secs_since_epoch - gameB.time.secs_since_epoch);
        }

        games.set(result);

    } catch (error: any) {
        games.set({
            status: 500,
            text: error.toString(),
            data: [],
        });
    }
}
