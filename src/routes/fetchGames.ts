import type { Game } from "$lib/types/game";
import { fetchError, fetchStatus, games } from "./store";
import { PUBLIC_API_URL } from '$env/static/public';

export async function getGames() {
  try {
    const response = await fetch(`${PUBLIC_API_URL}/prono`, {
      method: "GET",
      credentials: "include",
    });

    fetchStatus.set(response.status);

    if (response.ok) {
      games.set((await response.json()).sort(([, gameA]: [any, Game], [, gameB]: [any, Game]) => gameA.time.secs_since_epoch - gameB.time.secs_since_epoch));
      fetchError.set('');
    } else {
      fetchError.set(response.statusText);
    }
  } catch (error) {
    console.error(error);
    console.error("Unexpected Error");
    fetchError.set("Could not fetch games");
  }
}
