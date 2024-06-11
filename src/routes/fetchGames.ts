import { games } from './store';
import { PUBLIC_API_URL } from '$env/static/public';
import { Stage, type Game } from '$lib/types/game';
import type { Prono } from '$lib/types/prono';
import type { ResponseResult } from '$lib/types/returnable';

export async function storeGames(competition_id: number) {
    games.set({
        status: undefined!,
        text: 'LOADING',
        data: []
    });
    
	try {
		games.set(await getGames(competition_id));
	} catch (error: any) {
		games.set({
			status: 500,
			text: error.toString(),
			data: []
		});
	}
}

export async function getGames(competition_id: number, user?: string) {
	try {
		const userPath = user ? `/${user}` : '';
		const response = await fetch(`${PUBLIC_API_URL}/competition/${competition_id}/prono${userPath}`, {
			method: 'GET',
			credentials: 'include'
		});

		let result: ResponseResult<[Prono, Game][]> = {
			status: response.status,
			text: response.statusText,
			data: []
		};

		if (response.ok) {
			result.data = await response.json();
			result.data.forEach(([, game]) => {
				if (game.id === 66) {
					game.stage = Stage.ThirdPlace;
				}
			});
		}
		return result;
	} catch (error: any) {
		console.error(error);
		return {
			status: 500,
			text: error.toString(),
			data: []
		};
	}
}
