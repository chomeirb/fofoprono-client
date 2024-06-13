<script lang="ts">
	import { stageToString, formatDate, formatTime, isPast, userPoints, potentialPoints } from '$lib/utils/display';
	import { PronoResult, type Prono } from '$lib/types/prono';
	import type { Game } from '$lib/types/game';
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { pronos } from './store';
	import Tooltip from '../Tooltip.svelte';
	import '/node_modules/flag-icons/css/flag-icons.min.css';
	import * as countries from 'i18n-iso-countries';

	export let input: [number, number] = null!;
	export let prono: Prono;
	export let game: Game;

	let animate: boolean;

	const past = isPast(game.time);

	const [resultColorBorder, resultColorText] = getResultColors(prono?.result, past);

	$: if (!input) animate = !animate;

	$: if (!past && (input?.[0] != null || input?.[1] != null)) {
		$pronos[game.id] = {
			game_id: game.id,
			home: input[0] ?? prono?.prediction.home ?? 0,
			away: input[1] ?? prono?.prediction.away ?? 0
		};
	} else {
		pronos.update((record) => {
			delete record[game.id];
			return record;
		});
	}

	function getResultColors(result: PronoResult, pastGame: boolean) {
		switch (result) {
			case PronoResult.Exact:
				return ['border-green-500', 'text-green-500'];
			case PronoResult.Correct:
				return ['border-yellow-500', 'text-yellow-500'];
			case PronoResult.Wrong:
				return ['border-red-500', 'text-red-500'];
			default:
				return [`border-primary dark:border-secondary ${pastGame ? '' : 'border-opacity-30 dark:border-opacity-30'}`, 'text-primary dark:text-secondary'];
		}
	}

	function getCountryCode(country: string) {
		switch (country) {
			case 'Angleterre':
				return 'gb-eng';
			case 'Écosse':
				return 'gb-sct';
			case 'Pays de Galles':
				return 'gb-wls';
			case 'USA':
			case 'États-Unis':
				return 'us';
			default:
				return countries.getAlpha2Code(country, 'fr')?.toLowerCase()!;
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
				<p class="w-1/2 truncate text-left m8:w-full m8:text-center">{stageToString(game.stage)}</p>
			</div>

			<div class="flex w-[40%] min-w-[20rem] items-center justify-between pt-2 text-center m8:w-full m8:pt-0 m8:pb-4">
				<div class="order-first flex w-24 flex-col items-center gap-2 m8:text-sm">
					<span class={`fi fi-${getCountryCode(game.team_home)} h-[60px] rounded-lg border-4`} />
					<p class="truncate">{game.team_home}</p>
				</div>
				<div class="order-last flex w-24 flex-col items-center gap-2 m8:text-sm">
					<span class={`fi fi-${getCountryCode(game.team_away)} h-[60px] rounded-lg border-4`} />
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
								placeholder={$pronos[game.id]?.home.toString() ?? prono?.prediction.home.toString() ?? '...'} />
							<p class="text-center">−</p>
							<input
								type="number"
								inputmode="numeric"
								min="0"
								max="20"
								bind:value={input[1]}
								class="w-7 rounded bg-primary text-center text-secondary dark:bg-secondary dark:text-primary"
								placeholder={$pronos[game.id]?.away.toString() ?? prono?.prediction.away.toString() ?? '...'} />
						</div>
					{:else if prono}
						<!-- Display mode -->
						<div class="flex w-full min-w-min flex-row justify-between text-2xl">
							<p class="w-7 rounded bg-primary text-center text-secondary dark:bg-secondary dark:text-primary">{prono.prediction.home}</p>
							<p class="text-center">−</p>
							<p class="w-7 rounded bg-primary text-center text-secondary dark:bg-secondary dark:text-primary">{prono.prediction.away}</p>
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
					{#each [game.odds_home, game.odds_draw, game.odds_away] as odd, index}
						{#if odd}
							{@const potential_points = potentialPoints(odd, game.stage)}
							{@const user_points = userPoints(potential_points, prono?.result)}
							{@const show_points = user_points !== null ? 1 - Math.sign(game.score_home - game.score_away) == index : false}
							<span class="w-1/3 cursor-default text-center {show_points ? resultColorText : ''}">
								<Tooltip
									tooltip={`
                                Partiel : ${potential_points.correct} pts 
                                Exact : ${potential_points.exact} pts` + (show_points ? ` Côte : ${odd.toPrecision(3)}` : '')}>
									{show_points ? `+${user_points}` : odd.toPrecision(3)}
								</Tooltip>
							</span>
						{:else}
							<span class="w-1/3 cursor-default text-center">?</span>
						{/if}
					{/each}
				</div>
			</div>
		</div>
	</div>
{/key}

<style>
	.fi {
		width: 77px;
	}
</style>
