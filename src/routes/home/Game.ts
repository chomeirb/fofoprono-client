import { fetchError, games } from "./store";

export async function getGames() {
  try {
    const response = await fetch("/api/game", {
      method: "GET",
      credentials: 'same-origin',
    });

    if (response.ok) {
      games.set(await response.json());
    } else {
      fetchError.set("error");
    }
  } catch (error) {
    console.error(error);
    fetchError.set("error");
  }
}
