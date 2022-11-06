<script lang="ts">
    import { displayStage, type Game } from '$lib/types/game';
    import { Result, Team, type Prono, type PronoResult } from '$lib/types/prono';
    import { formatDate, formatTime, isPassed } from '$lib/utils/time';

    let input: [number, number] = [null!, null!];

    export let fetchedProno: PronoResult;
    export let fetchedGame: Game;

    export let prono: Prono = null!;
    export let remove: Prono = null!;

    const passed = isPassed(fetchedGame.time);
    const exists = fetchedProno !== null;

    let showScore: boolean;

    function enter() {
        showScore = fetchedGame.score_home !== null && fetchedGame.score_away !== null;
    }

    function leave() {
        showScore = false;
    }

    function getResultColor(result: Result) {
        switch (result) {
            case Result.Exact:
                return 'bg-green-500';
            case Result.Correct:
                return 'bg-yellow-500';
            case Result.Wrong:
                return 'bg-red-500';
            default:
                return '';
        }
    }

    function setRemove() {
        remove = remove === null ? fetchedProno.prediction : null!;
    }

    function handleInputs() {
        if (input[0] === null && input[1] === null) {
            prono = null!;
            return;
        }

        prono = {
            game_id: fetchedGame.id,
            prediction_home: input[0] ?? fetchedProno?.prediction.prediction_home ?? 0,
            prediction_away: input[1] ?? fetchedProno?.prediction.prediction_away ?? 0,
        };
    }
</script>

<li class="flex flex-row justify-between w-full gap-5 h-full items-center shadow-xl border pr-3" on:mouseenter={enter} on:mouseleave={leave}>
    <div class={`w-1 h-full ${getResultColor(fetchedProno?.result)} py-4`}>&nbsp;</div>
    <div class="flex flex-row gap-10 justify-between w-1/4 text-lg pr-24">
        <p>{formatDate(fetchedGame.time)}</p>
        <p>{formatTime(fetchedGame.time)}</p>
    </div>
    <div class="flex flex-row text-2xl gap-5 h-full items-center justify-between w-2/5">
        <p class="w-1/3">{fetchedGame.team_home.toUpperCase()}</p>
        <div class="flex flex-row justify-center gap-5 w-1/5">
            <input
                type="number"
                inputmode="numeric"
                min="0"
                max="20"
                bind:value={input[0]}
                on:input={handleInputs}
                class="w-7 bg-col1 text-col4 rounded text-center"
                placeholder={prono?.prediction_home.toString() ?? fetchedProno?.prediction.prediction_home.toString() ?? '...'}
                disabled={passed} />
            <div class={`duration-300 flex flex-row text-green-800 z-0 ${showScore ? 'opacity-100 w-full h-full' : 'opacity-0 w-0 h-0'}`}>
                <p>{fetchedGame.score_home}</p>
                <p>&nbsp;-&nbsp;</p>
                <p>{fetchedGame.score_away}</p>
            </div>
            <input
                type="number"
                inputmode="numeric"
                min="0"
                max="20"
                bind:value={input[1]}
                on:input={handleInputs}
                class="w-7 bg-col1 text-col4 rounded text-center z-10"
                placeholder={prono?.prediction_away.toString() ?? fetchedProno?.prediction.prediction_away.toString() ?? '...'}
                disabled={passed} />
        </div>
        <p class="w-1/3 text-right">
            {fetchedGame.team_away.toUpperCase()}
        </p>
    </div>
    <div class="flex flex-row justify-end w-1/4 gap-5">
        <p class="text-lg">{displayStage(fetchedGame.stage)}</p>
        <div class="flex flex-row gap-1">
            <p class="text-xl border-2">{fetchedGame.odds_home}</p>
            <p class="text-xl border-2">{fetchedGame.odds_draw}</p>
            <p class="text-xl border-2">{fetchedGame.odds_away}</p>
        </div>
        <button
            on:click={setRemove}
            disabled={passed || !exists}
            class={`w-[10%] -ml-2 text-xl ${passed || !exists ? 'opacity-0' : 'hover:opacity-50 hover:text-2xl'} ${remove ? 'text-red-600' : ''} duration-200`}
            type="button">✖</button>
    </div>
</li>
