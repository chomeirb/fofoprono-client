<script lang="ts">
	import { displayStage, formatDate, formatTime, getMatchTime, isPast, potentialPoints, displayPotentialPoints, userPoints, displayOdds } from '$lib/utils/display';
	import { PredictionResult, type PronoResult } from '$lib/types/prono';
	import type { Game } from '$lib/types/game';
	import * as Teams from '$lib/assets/teams';
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { pronos } from './store';
	import Tooltip from '../Tooltip.svelte';

	export let input: [number, number] = null!;
	export let prono: PronoResult = null!;
	export let game: Game;

	let animate: boolean;

	const past = isPast(game.time);

	const resultColorBorder = prono?.result ? `${getResultColorBorder(prono.result)}` : `border-primary dark:border-secondary ${past ? '' : 'border-opacity-30 dark:border-opacity-30'}`;
	const resultColorText = prono?.result ? `${getResultColorText(prono.result)}` : 'text-primary dark:text-secondary';

	const FlagHome = Teams[game.team_home.replace(/[\s+\-]/g, '') as keyof typeof Teams] ?? null;
	const FlagAway = Teams[game.team_away.replace(/[\s+\-]/g, '') as keyof typeof Teams] ?? null;

	const pointsPotential = potentialPoints(game);
	const pointsGain = userPoints(pointsPotential, game.score_home, game.score_away, prono?.result);

	$: if (!input) animate = !animate;

	$: if (!past && (input?.[0] != null || input?.[1] != null)) {
		$pronos[game.id] = {
			game_id: game.id,
			prediction_home: input[0] ?? prono.prediction?.prediction_home ?? 0,
			prediction_away: input[1] ?? prono.prediction?.prediction_away ?? 0
		};
	} else {
		pronos.update((record) => {
			delete record[game.id];
			return record;
		});
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
			case PredictionResult.Wrong:
				return 'text-red-500';
		}
	}
</script>

{#key animate}
	<div transition:slide|local={{ duration: 1000, easing: quintOut }}>
		<div class="flex items-center rounded-md border-[3px] m8:flex-col {resultColorBorder} justify-between p-2 text-lg font-semibold text-primary dark:text-secondary">
			<div class="order-1 flex w-[30%] flex-row border-primary dark:border-secondary m8:w-full m8:border-b-2">
				<p class="w-2/3 text-left">{formatDate(game.time)}</p>
				<p class="w-1/3 text-center m8:text-right">{formatTime(game.time)}</p>
			</div>

			<p class="order-4 w-[10%] truncate text-center m8:order-2 m8:w-full">{displayStage(game.stage)}</p>

			<div class="order-3 flex w-[40%] min-w-[20rem] items-center justify-between pt-2 text-center m8:w-full m8:pt-0 m8:pb-4">
				<div class="order-first flex w-24 flex-col items-center gap-2 m8:text-sm">
					<div class="rounded-xl bg-primary p-1 dark:bg-secondary">
						<img src={FlagHome} alt="Logo {game.team_home}" class="h-[50px] w-[75px] rounded-lg object-cover" />
					</div>
					<p class="truncate">{game.team_home}</p>
				</div>
				<div class="order-last flex w-24 flex-col items-center gap-2 m8:text-sm">
					<div class="rounded-xl bg-primary p-1 dark:bg-secondary">
						<img src={FlagAway} alt="Logo {game.team_away}" class="h-[50px] w-[75px] rounded-lg object-cover" />
					</div>
					<p class="truncate">{game.team_away}</p>
				</div>
				<div class="flex w-24 flex-col items-center gap-2 font-bold">
					<div class="flex w-full min-w-min flex-row justify-between text-2xl">
						{#if !past && input}
							<!-- Input mode -->
							<input
								type="number"
								inputmode="numeric"
								min="0"
								max="20"
								bind:value={input[0]}
								class="w-7 rounded bg-primary text-center text-secondary dark:bg-secondary dark:text-primary"
								placeholder={$pronos[game.id]?.prediction_home.toString() ?? prono?.prediction?.prediction_home.toString() ?? '...'} />
							<p class="text-center">−</p>
							<input
								type="number"
								inputmode="numeric"
								min="0"
								max="20"
								bind:value={input[1]}
								class="w-7 rounded bg-primary text-center text-secondary dark:bg-secondary dark:text-primary"
								placeholder={$pronos[game.id]?.prediction_away.toString() ?? prono?.prediction?.prediction_away.toString() ?? '...'} />
						{:else if prono?.prediction}
							<!-- Display mode -->
							<p class="w-7 rounded bg-primary text-center text-secondary dark:bg-secondary dark:text-primary">{prono.prediction.prediction_home}</p>
							<p class="text-center">−</p>
							<p class="w-7 rounded bg-primary text-center text-secondary dark:bg-secondary dark:text-primary">{prono.prediction.prediction_away}</p>
						{/if}
					</div>
					<div class="flex w-5/6 min-w-min flex-row justify-between text-center {resultColorText} {game.score_home == null || game.score_away == null ? 'invisible' : ''}">
						<p class="w-5">{game.score_home}</p>
						<p class="w-5">−</p>
						<p class="w-5">{game.score_away}</p>
					</div>
				</div>
			</div>

			<div class="order-5 flex w-[20%] place-content-end m8:w-full">
				<div class="flex w-3/4 min-w-[8rem] divide-x-[3px] divide-primary rounded-md border-[3px] border-primary dark:divide-secondary dark:border-secondary m8:w-full">
					<p class="w-1/3 cursor-default text-center {!pointsGain[0] || resultColorText}">
						<Tooltip tooltip={pointsGain[0] ? displayOdds(game.odds_home) : displayPotentialPoints(pointsPotential[0])}>
							{pointsGain[0] || game.odds_home.toPrecision(3)}
						</Tooltip>
					</p>

					<p class="w-1/3 cursor-default text-center {!pointsGain[1] || resultColorText}">
						<Tooltip tooltip={pointsGain[1] ? displayOdds(game.odds_draw) : displayPotentialPoints(pointsPotential[1])}>
							{pointsGain[1] || game.odds_draw.toPrecision(3)}
						</Tooltip>
					</p>

					<p class="w-1/3 cursor-default text-center {!pointsGain[2] || resultColorText}">
						<Tooltip tooltip={pointsGain[2] ? displayOdds(game.odds_away) : displayPotentialPoints(pointsPotential[2])}>
							{pointsGain[2] || game.odds_away.toPrecision(3)}
						</Tooltip>
					</p>
				</div>
			</div>
		</div>
	</div>
{/key}
