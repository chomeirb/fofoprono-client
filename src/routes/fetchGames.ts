import { games } from './store';
import { PUBLIC_API_URL } from '$env/static/public';

export async function storeGames() {
    try {
        games.set(await getGames());
    } catch (error: any) {
        games.set({
            status: 500,
            text: error.toString(),
            data: []
        });
    }
}

export async function getGames() {
    try {
        const response = await fetch(`${PUBLIC_API_URL}/prono`, {
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

        return result;
    } catch (error: any) {
        return {
            status: 500,
            text: error.toString(),
            data: []
        };
    }
}
