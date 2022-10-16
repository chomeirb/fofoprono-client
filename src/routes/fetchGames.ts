import { fetchError, fetchStatus, games } from "./store";

export async function getGames() {
  try {
    const response = await fetch("/api/games", {
      method: "GET",
      credentials: 'same-origin',
    });

    fetchStatus.set(response.status);

    if (response.ok || response.status === 203) {
      games.set(await response.json());
      if (response.status === 203) {
        fetchError.set("Connection requise !");
      }
    } else {
      fetchError.set("error");
    }
  } catch (error) {
    console.error(error);
    fetchError.set("error");
  }
}
