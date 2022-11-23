import { PUBLIC_API_URL } from '$env/static/public';
import { session } from './store';

export async function storeSession(): Promise<void> {
    const promise = fetch(`${PUBLIC_API_URL}/user`, {
        method: 'GET',
        credentials: 'include',
    });

    return promise.then(async (response) => {
        let result = {
            status: response.status,
            text: response.statusText,
            data: '',
        };

        if (response.ok) {
            result.data = await response.json();
        }

        session.set(result);
    }).catch(async (error) => {
        let result = {
            status: 500,
            text: error.toString(),
            data: '',
        }

        session.set(result);
    })
}