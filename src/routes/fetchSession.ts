import { session } from './store';
import { PUBLIC_API_URL } from '$env/static/public';

export async function storeSession() {
	try {
		const response = await fetch(`${PUBLIC_API_URL}/user`, {
			method: 'GET',
			credentials: 'include'
		});

		let result = {
			status: response.status,
			text: response.statusText,
			data: ''
		};

		if (response.ok) {
			result.data = await response.json();
		}

		session.set(result);
	} catch (error: any) {
		session.set({
			status: 500,
			text: error.toString(),
			data: ''
		});
	}
}
