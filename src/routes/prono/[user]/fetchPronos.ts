import type { Game } from "$lib/types/game";
import type { PronoResult } from "$lib/types/prono";
import { PUBLIC_API_URL } from '$env/static/public';
import type { ResponseResult } from "$lib/types/returnable";

export async function getGames(user: string): Promise<ResponseResult<[PronoResult, Game][]>> {
    try {
        const response = await fetch(`${PUBLIC_API_URL}/prono/${user}`, {
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
        return result;
    } catch (error: any) {
        console.error(error);
        return {
            status: 500,
            text: error.toString(),
            data: [],
        };
    }
}
