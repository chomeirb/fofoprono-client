<script lang="ts">
	import { displayStage, formatDate, formatTime, isPast, potentialPoints, displayPotentialPoints, userPoints, displayOdds } from '$lib/utils/display';
	import { PredictionResult, type PronoResult } from '$lib/types/prono';
	import type { Game } from '$lib/types/game';
	import * as Teams from '$lib/assets/teams';
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { pronos } from './store';
	import Tooltip from '../Tooltip.svelte';

	export let input: [number, number] = null!;
	export let prono: PronoResult;
	export let game: Game;

	let animate: boolean;

	const past = isPast(game.time);

	const [resultColorBorder, resultColorText] = getResultColors(prono.result, past);

	const FlagHome = Teams[game.team_home.replace(/[\s+\-]/g, '') as keyof typeof Teams] ?? null;
	const FlagAway = Teams[game.team_away.replace(/[\s+\-]/g, '') as keyof typeof Teams] ?? null;

	const odds: [number, number, number] = [game.odds_home, game.odds_draw, game.odds_away];
	const pointsPotential = potentialPoints(odds, game.stage);
	const pointsGain = userPoints(pointsPotential, prono.prediction?.prediction_home, prono.prediction?.prediction_away, prono.result);

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

	function getResultColors(result: PredictionResult, pastGame: boolean) {
		switch (result) {
			case PredictionResult.Exact:
				return ['border-green-500', 'text-green-500'];
			case PredictionResult.Correct:
				return ['border-yellow-500', 'text-yellow-500'];
			case PredictionResult.Wrong:
				return ['border-red-500', 'text-red-500'];
			default:
				return [`border-primary dark:border-secondary ${pastGame ? '' : 'border-opacity-30 dark:border-opacity-30'}`, 'text-primary dark:text-secondary'];
		}
	}
</script>

{#key animate}
	<div transition:slide|local={{ duration: 1000, easing: quintOut }}>
		<div class="flex items-center justify-between rounded-md border-[3px] p-2 px-4 text-lg font-semibold text-primary dark:text-secondary m8:flex-col m8:px-2 {resultColorBorder}">
			<div class="flex w-[30%] flex-row m8:w-full m8:flex-col">
				<div class="flex w-1/2 flex-col border-primary dark:border-secondary m8:w-full m8:flex-row m8:border-b-2">
					<p class="w-2/3 text-left">{formatDate(game.time)}</p>
					<p class="w-1/3 text-left m8:text-right">{formatTime(game.time)}</p>
				</div>
				<p class="w-1/2 truncate text-left m8:w-full m8:text-center">{displayStage(game.stage)}</p>
			</div>

			<div class="flex w-[40%] min-w-[20rem] items-center justify-between pt-2 text-center m8:w-full m8:pt-0 m8:pb-4">
				<div class="order-first flex w-24 flex-col items-center gap-2 m8:text-sm">
					<div class="rounded-xl bg-primary p-1 dark:bg-secondary">
						<img src={FlagHome} alt="Flag {game.team_home}" class="h-[50px] w-[75px] rounded-lg object-cover" />
					</div>
					<p class="truncate">{game.team_home}</p>
				</div>
				<div class="order-last flex w-24 flex-col items-center gap-2 m8:text-sm">
					<div class="rounded-xl bg-primary p-1 dark:bg-secondary">
						<img src={FlagAway} alt="Flag {game.team_away}" class="h-[50px] w-[75px] rounded-lg object-cover" />
					</div>
					<p class="truncate">{game.team_away}</p>
				</div>
				<div class="flex w-24 flex-col items-center gap-2 font-bold">
					{#if !past && input}
						<!-- Input mode -->
						<div class="flex w-full min-w-min flex-row justify-between text-2xl">
							<input
								type="number"
								inputmode="numeric"
								min="0"
								max="20"
								bind:value={input[0]}
								class="w-7 rounded bg-primary text-center text-secondary dark:bg-secondary dark:text-primary"
								placeholder={$pronos[game.id]?.prediction_home.toString() ?? prono.prediction?.prediction_home.toString() ?? '...'} />
							<p class="text-center">−</p>
							<input
								type="number"
								inputmode="numeric"
								min="0"
								max="20"
								bind:value={input[1]}
								class="w-7 rounded bg-primary text-center text-secondary dark:bg-secondary dark:text-primary"
								placeholder={$pronos[game.id]?.prediction_away.toString() ?? prono.prediction?.prediction_away.toString() ?? '...'} />
						</div>
					{:else if prono.prediction}
						<!-- Display mode -->
						<div class="flex w-full min-w-min flex-row justify-between text-2xl">
							<p class="w-7 rounded bg-primary text-center text-secondary dark:bg-secondary dark:text-primary">{prono.prediction.prediction_home}</p>
							<p class="text-center">−</p>
							<p class="w-7 rounded bg-primary text-center text-secondary dark:bg-secondary dark:text-primary">{prono.prediction.prediction_away}</p>
						</div>
					{/if}
					<div class="flex w-5/6 min-w-min flex-row justify-between text-center {resultColorText} {game.score_home == null || game.score_away == null ? 'invisible' : ''}">
						<p class="w-5">{game.score_home}</p>
						<p class="w-5">−</p>
						<p class="w-5">{game.score_away}</p>
					</div>
				</div>
			</div>

			<div class="flex w-[30%] place-content-end m8:w-full">
				<div class="flex w-2/3 min-w-[10rem] divide-x-[3px] divide-primary rounded-md border-[3px] border-primary dark:divide-secondary dark:border-secondary m8:w-full">
					{#each odds as odd, index}
						<p class="w-1/3 cursor-default text-center {pointsGain[index] ? resultColorText : ''}">
							<Tooltip tooltip={displayPotentialPoints(pointsPotential[index]) + (pointsGain[index] ? ' ' + displayOdds(odd) : '')}>
								{pointsGain[index] || odd.toPrecision(3)}
							</Tooltip>
						</p>
					{/each}
				</div>
			</div>
		</div>
	</div>
{/key}
