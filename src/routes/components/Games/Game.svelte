<script lang="ts">
	import type { Game } from '$lib/types/game';
	import { PredictionResult, type Prediction, type PronoResult } from '$lib/types/prono';
	import { displayPoints, displayStage, formatDate, formatTime, getMatchTime, isPast } from '$lib/utils/display';
	import * as Teams from '$lib/assets/teams';

	export let showOdds = true;
	export let pronoMode = false;
	export let displayMode = false;

	export let fetchedProno: PronoResult = null!;
	export let fetchedGame: Game;

	export let prono: Prediction = null!;

	let input: [number, number] = [null!, null!];

	// showDetails should be true if the window is wide enough
	let showDetails = window.innerWidth > 768;
	let showScore: boolean;

	$: if (input[0] === null && input[1] === null) {
		prono = null!;
	} else {
		prono = {
			game_id: fetchedGame.id,
			prediction_home: input[0] ?? fetchedProno?.prediction.prediction_home ?? 0,
			prediction_away: input[1] ?? fetchedProno?.prediction.prediction_away ?? 0
		};
	}

	const past = isPast(fetchedGame.time);

	const resultColorBorder = pronoMode ? getResultColorBorder(fetchedProno?.result) : '';
	const resultColorText = pronoMode ? getResultColorText(fetchedProno?.result) : '';

	const FlagHome = Teams[fetchedGame.team_home.replace(/[\s+\-]/g, '') as keyof typeof Teams] ?? null;
	const FlagAway = Teams[fetchedGame.team_away.replace(/[\s+\-]/g, '') as keyof typeof Teams] ?? null;

	function enter() {
		showScore = pronoMode && fetchedGame.score_home !== null && fetchedGame.score_away !== null;
	}

	function leave() {
		showScore = false;
	}

	function getResultColorBorder(result: PredictionResult) {
		switch (result) {
			case PredictionResult.Exact:
				return 'border-green-500';
			case PredictionResult.Correct:
				return 'border-yellow-500';
			case PredictionResult.Wrong:
				return 'border-red-500';
		}
	}

	function getResultColorText(result: PredictionResult) {
		switch (result) {
			case PredictionResult.Exact:
				return 'text-green-500';
			case PredictionResult.Correct:
				return 'text-yellow-500';
			default:
				return 'text-red-500';
		}
	}

	function toggleDetails() {
		showDetails = !showDetails;
		showDetails ? enter() : leave();
	}
</script>

<div class="flex flex-row">
	<li
		class={`${
			showDetails ? 'm12:gap-2 m12:py-4' : 'm12:gap-0'
		} flex w-full flex-row items-center justify-between gap-5 rounded-md border-[3px] px-3 py-4 text-primary shadow-xl duration-300 dark:text-secondary m12:flex-col m12:justify-center m12:px-3 ${
			resultColorBorder ? `${resultColorBorder}` : 'border-primary dark:border-secondary'
		}`}
		on:mouseenter={enter}
		on:mouseleave={leave}>
		<div class={`${showDetails ? 'm12:text-sm' : 'm12:gap:0 m12:h-0 m12:text-[0px]'} flex w-[22%] flex-col pr-5 text-lg duration-300 i1:text-sm m12:w-full m12:pr-0`}>
			<div class="justify-between gap-5 m12:flex m12:flex-row">
				{#if !getMatchTime(fetchedGame.time)}
					<div class="flex w-[90%] flex-row justify-between m12:w-[44%] m12:justify-start m12:gap-5">
						<p>{formatDate(fetchedGame.time)}</p>
						<p>{formatTime(fetchedGame.time)}</p>
					</div>
				{:else}
					<div class="flex flex-row items-center gap-10 text-red-500">
						<span class="flex animate-ping">⦿</span>
						<span>{getMatchTime(fetchedGame.time)}</span>
					</div>
				{/if}

				<p class="hidden m12:flex">{displayStage(fetchedGame.stage)}</p>
				<button class={` ${showDetails ? 'text-2xl' : ''} hidden font-bold m12:flex`} on:click={toggleDetails}>-</button>
			</div>
			<hr class={`${showDetails ? 'w-full border text-left opacity-75' : 'opacity-0'} hidden m12:flex`} />
		</div>
		<div class="flex w-[55%] flex-row justify-center m12:w-full">
			<div class="flex h-full w-full flex-row items-center justify-between gap-5 text-2xl m12:w-[90%] m12:justify-start m12:gap-2">
				<div class="flex w-full flex-row items-center gap-5 m12:flex-col m12:gap-3">
					{#if FlagHome}
						<div class="rounded-xl bg-primary p-1 dark:bg-secondary">
							<img src={FlagHome} alt="Logo {fetchedGame.team_home}" class="h-[50px] w-[75px] rounded-md object-cover m12:h-[40px] m12:w-[50px]" />
						</div>
					{/if}
					<p class="w-[75%] truncate text-left text-lg m12:text-center m12:text-sm">
						{fetchedGame.team_home}
					</p>
				</div>
				<div class="flex w-[25%] flex-row justify-center">
					{#if pronoMode}
						{#if past || displayMode}
							{#if fetchedProno}
								<p class="order-first mr-3 w-7 rounded bg-primary text-center text-secondary dark:bg-secondary dark:text-primary m12:mr-[6px]">
									{fetchedProno?.prediction.prediction_home ?? ''}
								</p>
								<p class="order-last ml-3 w-7 rounded bg-primary text-center text-secondary dark:bg-secondary dark:text-primary m12:ml-[6px]">
									{fetchedProno?.prediction.prediction_away ?? ''}
								</p>
							{/if}
							<p class={`flex-none align-middle duration-100 ${resultColorText} ${showScore ? 'm6:text-lg' : 'text-[0px]'}`}>
								{fetchedGame.score_home} - {fetchedGame.score_away}
							</p>
						{:else}
							<input
								type="number"
								inputmode="numeric"
								min="0"
								max="20"
								bind:value={input[0]}
								class="mr-3 w-7 rounded bg-primary text-center text-secondary dark:bg-secondary dark:text-primary m12:mr-[6px]"
								placeholder={prono?.prediction_home.toString() ?? fetchedProno?.prediction.prediction_home.toString() ?? '...'}
								disabled={past} />
							<input
								type="number"
								inputmode="numeric"
								min="0"
								max="20"
								bind:value={input[1]}
								class="ml-3 w-7 rounded bg-primary text-center text-secondary dark:bg-secondary dark:text-primary m12:ml-[6px]"
								placeholder={prono?.prediction_away.toString() ?? fetchedProno?.prediction.prediction_away.toString() ?? '...'}
								disabled={past} />
						{/if}
					{:else}
						<p class="mr-3 w-7 rounded bg-primary text-center text-secondary dark:bg-secondary dark:text-primary m12:mr-[6px]">
							{fetchedGame.score_home ?? ''}
						</p>
						<p class="ml-3 w-7 rounded bg-primary text-center text-secondary dark:bg-secondary dark:text-primary m12:ml-[6px]">
							{fetchedGame.score_away ?? ''}
						</p>
					{/if}
				</div>
				<div class="flex w-full flex-row items-center justify-end gap-5 m12:flex-col-reverse m12:gap-3">
					<p class="w-[75%] truncate text-right text-lg m12:text-center m12:text-sm">
						{fetchedGame.team_away}
					</p>
					{#if FlagAway}
						<div class="rounded-xl bg-primary p-1 dark:bg-secondary">
							<img src={FlagAway} alt="Logo {fetchedGame.team_away}" class="h-[50px] w-[75px] rounded-lg object-cover m12:h-[40px] m12:w-[50px]" />
						</div>
					{/if}
				</div>
			</div>
			<button class={`hidden -translate-y-1 select-none text-2xl duration-100 hover:cursor-pointer m12:flex ${showDetails ? 'm12:hidden' : ''}`} on:click={toggleDetails}> + </button>
		</div>
		<div class={`${showDetails ? 'm12:mt-1 m12:text-sm' : 'm12:h-0 m12:text-[0px]'} flex w-1/4 flex-row justify-end text-lg duration-300 i1:text-sm m12:w-full m12:justify-center`}>
			<div class="flex w-[90%] flex-row justify-end gap-5 m12:justify-center m12:gap-0">
				<p class={`align-middle m12:hidden ${showScore ? '-translate-x-5 text-[0px]' : ''} duration-75`}>
					{displayStage(fetchedGame.stage)}
				</p>
				<p class={`m12:hidden ${!showScore ? 'text-[0px]' : '-translate-x-5'} duration-75 ${resultColorText}`}>
					{showScore ? displayPoints(fetchedGame, fetchedProno) : ''}
				</p>
				{#if showOdds}
					<div class="flex flex-row gap-1 m12:w-full m12:justify-center m12:pl-16 m6:pl-8">
						<p class={` ${showDetails ? 'rounded-md border-[3px] border-primary px-1 dark:border-secondary' : ''}`}>
							{fetchedGame.odds_home.toPrecision(3)}
						</p>
						<p class={` ${showDetails ? 'rounded-md border-[3px] border-primary px-1 dark:border-secondary' : ''}`}>
							{fetchedGame.odds_draw.toPrecision(3)}
						</p>
						<p class={` ${showDetails ? 'rounded-md border-[3px] border-primary px-1 dark:border-secondary' : ''}`}>
							{fetchedGame.odds_away.toPrecision(3)}
						</p>
						<p class={`ml-10 hidden m12:flex m6:ml-6 ${!showScore ? 'text-[0px]' : ''} ${resultColorText}`}>
							{showScore ? displayPoints(fetchedGame, fetchedProno) : ''}
						</p>
					</div>
				{/if}
			</div>
		</div>
	</li>
</div>