import { PUBLIC_API_URL } from '$env/static/public';
import type { ResponseResult } from '$lib/types/returnable';

export async function confirmSignup(hash: string): Promise<ResponseResult<void>> {
	try {
		const response = await fetch(`${PUBLIC_API_URL}/signup/${hash}`, {
			method: 'POST'
		});

		return {
			status: response.status,
			text: response.statusText,
			data: undefined
		};
	} catch (error: any) {
		console.error(error);
		return {
			status: 500,
			text: error.toString(),
			data: undefined
		};
	}
}
