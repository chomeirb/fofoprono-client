import { fetchStatus, fetchError, players } from "./store";

export async function getPlayers()
{
  try
  {
    const response = await fetch("/api/ranking", {
      method: "GET",
      credentials: "same-origin",
    });

    fetchStatus.set(response.status);

    if (response.ok)
    {
      players.set(await response.json());
      fetchError.set('');
    } else
    {
      fetchError.set(response.statusText);
    }
  } catch (error)
  {
    console.error(error);
    console.error("Unexpected Error");
    fetchError.set("Could not fetch players");
  }
}