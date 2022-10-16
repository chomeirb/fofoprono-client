import { fetchError, fetchStatus, games } from "./store";

export async function getGames() {
  try {
    const response = await fetch("/api/games", {
      method: "GET",
      credentials: "same-origin",
    });

    fetchStatus.set(response.status);
    // fetchError.set(response.statusText);

    if (response.ok) {
      games.set(await response.json());
    }
  } catch (error) {
    console.error(error);
    console.error("Unexpected Error");
    fetchError.set("Could not fetch games");
  }
}
