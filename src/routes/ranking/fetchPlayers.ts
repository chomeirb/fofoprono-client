import type { RankedUser } from "$lib/types/player";
import { fetchStatus, fetchError } from "./store";
import { PUBLIC_API_URL } from '$env/static/public';

export async function getPlayers(): Promise<RankedUser[]> {
  try {
    const response = await fetch(`${PUBLIC_API_URL}/ranking`, {
      method: "GET",
      credentials: "include",
    });

    fetchStatus.set(response.status);

    if (response.ok) {
      fetchError.set('');
      return await response.json();
    } else {
      fetchError.set(response.statusText);
      return [];
    }
  } catch (error) {
    console.error(error);
    console.error("Unexpected Error");
    fetchError.set("Could not fetch players");
    return [];
  }
}