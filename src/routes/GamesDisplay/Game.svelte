<script lang="ts">
    import type { Game } from '$lib/types/game';
    import { PredictionResult, Team, type Prediction, type PronoResult } from '$lib/types/prono';
    import { displayStage, formatDate, formatTime, isPassed } from '$lib/utils/display';

    export let showOdds = true;
    export let pronoMode = false;

    export let fetchedProno: PronoResult = null!;
    export let fetchedGame: Game;

    let input: [number, number] = [null!, null!];

    export let prono: Prediction = null!;
    export let remove: Prediction = null!;

    const passed = isPassed(fetchedGame.time);
    const exists = pronoMode && fetchedProno !== null;

    let showScore: boolean;

    function enter() {
        showScore = pronoMode && fetchedGame.score_home !== null && fetchedGame.score_away !== null;
    }

    function leave() {
        showScore = false;
    }

    function getResultColor(result: PredictionResult) {
        if (!pronoMode) {
            return '';
        }
        switch (result) {
            case PredictionResult.Exact:
                return 'bg-green-500';
            case PredictionResult.Correct:
                return 'bg-yellow-500';
            case PredictionResult.Wrong:
                return 'bg-red-500';
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

<li
    class="flex flex-row m8:flex-col text-primary dark:text-secondary justify-between m8:justify-start w-full gap-5 m8:gap-2 h-full items-center shadow-xl border pr-3 m8:pb-3 m8:px-3"
    on:mouseenter={enter}
    on:mouseleave={leave}>
    <div class={`w-1 h-full m8:h-1 m8:w-[106%] ${getResultColor(fetchedProno?.result)} py-4 m8:py-0`}>&nbsp;</div>
    <div class="flex flex-row gap-5 justify-between w-[22%] m8:w-full text-lg m8:text-base pr-16 m8:pr-0">
        <div class="flex flex-row m8:w-[44%] w-[80%] justify-between">
            <p>{formatDate(fetchedGame.time)}</p>
            <p>{formatTime(fetchedGame.time)}</p>
        </div>
        <p class="text-lg hidden m8:flex">{displayStage(fetchedGame.stage)}</p>
    </div>
    <div class="flex flex-row text-2xl gap-5 h-full items-center justify-between w-[45%] m8:w-full">
        <p class="w-[40%] m8:text-right m8:text-xl">{fetchedGame.team_home.toUpperCase()}</p>
        <div class="flex flex-row justify-center w-1/5">
            {#if pronoMode}
                <input
                    type="number"
                    inputmode="numeric"
                    min="0"
                    max="20"
                    bind:value={input[0]}
                    on:input={handleInputs}
                    class="w-7 bg-primary dark:bg-secondary text-secondary dark:text-primary rounded text-center mr-3"
                    placeholder={prono?.prediction_home.toString() ?? fetchedProno?.prediction.prediction_home.toString() ?? '...'}
                    disabled={passed} />
                <p class={`duration-100 flex-none text-green-600 ${showScore ? '' : 'text-[0px]'}`}>
                    {fetchedGame.score_home} - {fetchedGame.score_away}
                </p>
                <input
                    type="number"
                    inputmode="numeric"
                    min="0"
                    max="20"
                    bind:value={input[1]}
                    on:input={handleInputs}
                    class="w-7 bg-primary dark:bg-secondary text-secondary dark:text-primary rounded text-center ml-3"
                    placeholder={prono?.prediction_away.toString() ?? fetchedProno?.prediction.prediction_away.toString() ?? '...'}
                    disabled={passed} />
            {:else}
                <p class="w-7 bg-primary dark:bg-secondary text-secondary dark:text-primary rounded text-center mr-3">
                    {fetchedGame.score_home ?? ''}
                </p>
                <p class="w-7 bg-primary dark:bg-secondary text-secondary dark:text-primary rounded text-center ml-3">
                    {fetchedGame.score_away ?? ''}
                </p>
            {/if}
        </div>
        <p class="w-[40%] text-right m8:text-left m8:text-xl">
            {fetchedGame.team_away.toUpperCase()}
        </p>
    </div>
    <div class="flex flex-row justify-end mt-1 w-1/4 m8:w-full gap-5 m8:text-lg">
        <p class="text-lg m8:hidden">{displayStage(fetchedGame.stage)}</p>
        {#if showOdds}
            <div class="flex flex-row m8:justify-around gap-1 m8:gap-5 m8:mr-10">
                <p class="text-xl border-2 px-1">{fetchedGame.odds_home.toPrecision(3)}</p>
                <p class="text-xl border-2 px-1">{fetchedGame.odds_draw.toPrecision(3)}</p>
                <p class="text-xl border-2 px-1">{fetchedGame.odds_away.toPrecision(3)}</p>
            </div>
        {/if}
        <button
            on:click={setRemove}
            disabled={passed || !exists}
            class={`w-[10%] -ml-2 text-xl ${passed || !exists ? 'opacity-0' : 'hover:opacity-50 hover:text-2xl'} ${remove ? 'text-red-600' : ''} duration-200`}
            type="button">✖</button>
    </div>
</li>
