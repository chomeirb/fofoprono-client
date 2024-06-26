import { players } from './store';
import { PUBLIC_API_URL } from '$env/static/public';

export async function storePlayers(competition_id: number) {
    players.set({
        status: undefined!,
        text: 'LOADING',
        data: []
    });
    
	try {
		const response = await fetch(`${PUBLIC_API_URL}/competition/${competition_id}/ranking`, {
			method: 'GET',
			credentials: 'include'
		});

		let result = {
			status: response.status,
			text: response.statusText,
			data: []
		};

		if (response.ok) {
			result.data = await response.json();
		}

		players.set(result);
	} catch (error: any) {
		players.set({
			status: 500,
			text: error.toString(),
			data: []
		});
	}
}
