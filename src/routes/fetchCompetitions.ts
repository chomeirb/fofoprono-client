import { competitions } from './store';
import { PUBLIC_API_URL } from '$env/static/public';

export async function storeCompetitions() {
    competitions.set({
        status: undefined!,
        text: 'LOADING',
        data: []
    });
    
	try {
		const response = await fetch(`${PUBLIC_API_URL}/competitions`, {
			method: 'GET'
		});

		let result = {
			status: response.status,
			text: response.statusText,
			data: []
		};

		if (response.ok) {
			result.data = await response.json();
		}

		competitions.set(result);
	} catch (error: any) {
		competitions.set({
			status: 500,
			text: error.toString(),
			data: []
		});
	}
}
