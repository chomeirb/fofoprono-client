import type { RankedUser } from "$lib/types/player";
import { fetchStatus, fetchError } from "./store";

export async function getPlayers(): Promise<RankedUser[]> {
  try {
    const response = await fetch("/api/ranking", {
      method: "GET",
      credentials: "same-origin",
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