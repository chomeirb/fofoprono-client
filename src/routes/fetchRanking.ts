import { players } from './store';
import { PUBLIC_API_URL } from '$env/static/public';

export async function storePlayers() {
	try {
		const response = await fetch(`${PUBLIC_API_URL}/ranking`, {
			method: 'GET',
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
