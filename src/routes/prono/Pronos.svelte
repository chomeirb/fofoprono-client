<script lang="ts">
  import type { Game } from "$lib/types/game";
  import { Team, type Prono } from "$lib/types/prono";
  import { formatDate, formatTime, isPassed } from "$lib/utils/time";
  import { fetchError, fetchStatus, fetchLoggedIn, games } from "../store";

  let fetchedData: [Prono, Game][] = [];
  let inputs: [number, number][] = [];

  let submitPronos: Prono[] = [];
  let deletePronos: Prono[] = [];

  let fetchErrorContent: String = "loading";
  let fetchStatusContent: number;

  games.subscribe((value: [Prono, Game][]) => {
    fetchedData = value;

    submitPronos = value.map(() => {
      return null!;
    });

    deletePronos = value.map(() => {
      return null!;
    });

    inputs = value.map(() => {
      return [null!, null!];
    });
  });

  fetchError.subscribe((value: String) => {
    fetchErrorContent = value;
  });

  fetchStatus.subscribe((value: number) => {
    fetchStatusContent = value;
  });

  function handleInputs(team: Team, index: number) {
    const [prediction_home, prediction_away] = inputs[index];
    if (prediction_home === null && prediction_away === null) {
      submitPronos[index] = null!;
      return;
    }

    const fetchedProno = fetchedData[index][0] && { ...fetchedData[index][0] };
    if (submitPronos[index] === null) {
      if (fetchedProno) {
        submitPronos[index] = fetchedProno;
      } else {
        submitPronos[index] = {
          game_id: fetchedData[index][1].id,
          prediction_home: 0,
          prediction_away: 0,
        };
      }
    }

    switch (team) {
      case Team.Home:
        submitPronos[index].prediction_home =
          prediction_home ?? fetchedProno?.prediction_home ?? 0;
        break;
      case Team.Away:
        submitPronos[index].prediction_away =
          prediction_away ?? fetchedProno?.prediction_away ?? 0;
        break;
    }
  }

  const submit = async () => {
    const toSubmit = submitPronos.filter((element) => {
      return element !== null;
    });

    const toDelete = deletePronos.filter((element) => {
      return element !== null;
    });

    const res_s = await fetch("/api/prono", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toSubmit),
    });

    const res_d = await fetch("/api/prono", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toDelete),
    });

    if (res_s.ok && res_d.ok) {
      window.location.href = "/prono";
    }
  };

  function deleteProno(index: number) {
    deletePronos[index] =
      deletePronos[index] === null ? fetchedData[index][0] : null!;
  }
</script>

<head>
  <style>
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    input[type="number"] {
      -moz-appearance: textfield;
    }

    button {
    }
    button:disabled {
      opacity: 0.2;
    }
  </style>
</head>

<form id="Pronos" on:submit|preventDefault={submit}>
  <div class="flex flex-col items-center justify-center mb-3 w-full">
    <ul class="w-[95%] flex flex-col gap-3 pt-4">
      {#if fetchErrorContent !== ""}
        <li
          class="flex flex-row items-center justify-between bg-col1 text-col4 py-2 px-5 rounded"
        >
          <p class="font-bold">Aucun pronostique</p>
          <p>
            Problème rencontré lors du chargement: {fetchStatusContent}
            {fetchErrorContent}
          </p>
        </li>
      {:else}
        {#each fetchedData as [fetchedProno, fetchedGame], index}
          {@const clientProno = submitPronos[index]}
          {@const deleted = deletePronos[index] !== null}
          {@const exists = fetchedData[index][0] !== null}
          {@const passed = isPassed(fetchedGame.time)}
          <li
            class="flex flex-row justify-between w-full gap-5 h-full items-center py-3 shadow-xl border px-3"
          >
            <div
              class="flex flex-row gap-10 justify-between w-1/4 text-lg pr-24"
            >
              <p>{formatDate(fetchedGame.time)}</p>
              <p>{formatTime(fetchedGame.time)}</p>
            </div>
            <div
              class="flex flex-row text-2xl gap-5 h-full items-center justify-between w-2/5"
            >
              <p class="w-1/3">{fetchedGame.team_home.toUpperCase()}</p>
              <div class="flex flex-row justify-center gap-5 w-1/5">
                <input
                  type="number"
                  inputmode="numeric"
                  min="0"
                  max="20"
                  bind:value={inputs[index][0]}
                  on:input={() => handleInputs(Team.Home, index)}
                  class="w-7 bg-col1 text-col4 rounded text-center"
                  placeholder={clientProno?.prediction_home.toString() ??
                    fetchedProno?.prediction_home.toString() ??
                    "..."}
                  disabled={passed}
                />
                <input
                  type="number"
                  inputmode="numeric"
                  min="0"
                  max="20"
                  bind:value={inputs[index][1]}
                  on:input={() => handleInputs(Team.Away, index)}
                  class="w-7 bg-col1 text-col4 rounded text-center"
                  placeholder={clientProno?.prediction_away.toString() ??
                    fetchedProno?.prediction_away.toString() ??
                    "..."}
                  disabled={passed}
                />
              </div>
              <p class="w-1/3 text-right">
                {fetchedGame.team_away.toUpperCase()}
              </p>
            </div>
            <div class="flex flex-row justify-end w-1/4 gap-5">
              <p class="text-lg">{fetchedGame.stage}</p>
              <div class="flex flex-row gap-1">
                <p class="text-xl border-2">{fetchedGame.odds_home}</p>
                <p class="text-xl border-2">{fetchedGame.odds_draw}</p>
                <p class="text-xl border-2">{fetchedGame.odds_away}</p>
              </div>
              <button
                style={deleted ? "color:red" : ""}
                on:click={() => deleteProno(index)}
                disabled={passed || !exists}
                class="text-xl formatted"
                type="button">✖</button
              >
            </div>
          </li>
        {/each}
      {/if}
    </ul>
  </div>
</form>
