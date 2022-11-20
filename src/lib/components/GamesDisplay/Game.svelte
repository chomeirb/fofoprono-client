<script lang="ts">
    import type { Game } from '$lib/types/game';
    import { PredictionResult, Team, type Prediction, type PronoResult } from '$lib/types/prono';
    import { displayStage, formatDate, formatTime, getMatchTime, isPassed } from '$lib/utils/display';

    export let showOdds = true;
    export let pronoMode = false;

    export let fetchedProno: PronoResult = null!;
    export let fetchedGame: Game;

    let input: [number, number] = [null!, null!];

    export let prono: Prediction = null!;
    // export let remove: Prediction = null!;

    const passed = isPassed(fetchedGame.time);
    const exists = pronoMode && fetchedProno !== null;

    let showScore: boolean;
    // showDetails should be true if the window is wide enough
    let showDetails: boolean = window.innerWidth > 768;

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

    // This functionnality is desableb at the moment
    // function setRemove() {
    //     remove = remove === null ? fetchedProno.prediction : null!;
    // }

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

    function toggleDetails() {
        showDetails = !showDetails;
        showDetails ? enter() : leave();
    }
</script>

<li
    class={`${
        showDetails ? 'm12:gap-2' : 'm12:gap-0'
    } flex flex-row m12:flex-col text-primary duration-300 dark:text-secondary gap-5 justify-between m12:justify-start w-full h-full items-center shadow-xl border pr-3 m12:pb-1 m12:px-3`}
    on:mouseenter={enter}
    on:mouseleave={leave}>
    <div class={`w-1 h-full m12:h-1 m12:w-[calc(100%_+_25px)] ${getResultColor(fetchedProno?.result)} m12:mb-1 py-4 m12:py-0`}>&nbsp;</div>
    <div
        class={`${
            showDetails ? 'm12:text-sm' : 'm12:text-[0px] m12:gap:0 m12:h-0'
        } flex flex-row gap-5 text-lg justify-between w-[22%] m12:w-full pr-16 m12:pr-0 duration-300`}>
        {#if !getMatchTime(fetchedGame.time)}
            <div class="flex flex-row m12:w-[44%] w-[90%] justify-between m12:justify-start m12:gap-5">
                <p>{formatDate(fetchedGame.time)}</p>
                <p>{formatTime(fetchedGame.time)}</p>
            </div>
        {:else}
            <div class="flex flex-row gap-10 items-center text-red-500">
                <span class="flex animate-ping">⦿</span>
                <span>{getMatchTime(fetchedGame.time)}</span>
            </div>
        {/if}

        <p class="hidden m12:flex">{displayStage(fetchedGame.stage)}</p>
    </div>
    <div class="flex flex-row justify-between m12:w-full w-[55%]">
        <div class="flex flex-row text-2xl gap-5 h-full items-center justify-between m12:justify-start m12:w-[90%] w-full">
            <p class="w-[40%] m12:text-base">{fetchedGame.team_home.toUpperCase()}</p>
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
            <p class="w-[40%] text-right m12:text-base">
                {fetchedGame.team_away.toUpperCase()}
            </p>
        </div>
        <p class="hover:cursor-pointer select-none duration-100 m12:flex hidden" on:click={toggleDetails}>{showDetails ? '-' : '+'}</p>
    </div>
    <div
        class={`${
            showDetails ? 'm12:text-sm m12:mt-1' : 'm12:text-[0px] m12:h-0'
        } flex flex-row text-lg justify-end m12:justify-start w-1/4 m12:w-full duration-300`}>
        <div class="flex flex-row w-[90%] m12:justify-center m12:gap-0 justify-end gap-5">
            <p class="m12:hidden">{displayStage(fetchedGame.stage)}</p>
            {#if showOdds}
                <div class="flex flex-row m12:justify-center gap-1 m12:gap-5">
                    <p class={` ${showDetails ? 'border-2 px-1' : ''}`}>{fetchedGame.odds_home.toPrecision(3)}</p>
                    <p class={` ${showDetails ? 'border-2 px-1' : ''}`}>{fetchedGame.odds_draw.toPrecision(3)}</p>
                    <p class={` ${showDetails ? 'border-2 px-1' : ''}`}>{fetchedGame.odds_away.toPrecision(3)}</p>
                </div>
            {/if}
            <!-- Button to supp remove for the moment because confusing -->
            <!-- <button
            on:click={setRemove}
            disabled={passed || !exists}
            class={`w-[10%] -ml-2 text-xl ${passed || !exists ? 'opacity-0' : 'hover:opacity-50 hover:text-2xl'} ${remove ? 'text-red-600' : ''} duration-200`}
            type="button">✖</button> -->
        </div>
    </div>
</li>
