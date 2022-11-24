<script lang="ts">
    import { getQueryParamsStore } from '../../queryParamsStore';
    import type { Game } from '$lib/types/game';
    import type { Prediction, PronoResult } from '$lib/types/prono';
    import { sysTimeToDate } from '$lib/utils/display';
    import PronoDisplay from './Game.svelte';
    import Filter from './Filter.svelte';
    import type { ResponseResult } from '$lib/types/returnable';

    export let response: ResponseResult<[PronoResult, Game][]>;
    export let pronos: Prediction[] = response.data.map(() => null!);

    export let pronoMode: boolean;
    export let displayMode: boolean;

    let queryTeam = getQueryParamsStore('team');
    let queryStage = getQueryParamsStore('stage');
    let queryFrom = getQueryParamsStore('from');
    let queryTo = getQueryParamsStore('to');

    $: teamFilter = response.data.map(([, game]) => game.team_home.concat(' ', game.team_away).toUpperCase().includes($queryTeam.toUpperCase()));
    $: stageFilter = response.data.map(([, game]) => game.stage == $queryStage || $queryStage == '');

    $: fromFilter = $queryFrom === '' ? response.data.map(() => true) : response.data.map(([, game]) => sysTimeToDate(game.time) >= new Date($queryFrom));
    $: toFilter = $queryTo === '' ? response.data.map(() => true) : response.data.map(([, game]) => sysTimeToDate(game.time) <= new Date($queryTo));
</script>

<div class="w-full grid grid-cols-20-80 m12:flex m12:flex-col m12:items-center h-full">
    <Filter bind:queryTeam bind:queryStage bind:queryFrom bind:queryTo />
    {#if response.text === 'LOADING'}
        <div class="w-full h-full m12:overflow-x-hidden mt-4 m8:mt-0 m8:border-t overflow-y-auto shadow-in items-center flex place-content-center">
            <p>Loading...</p>
        </div>
    {:else if response.text !== 'OK'}
        <div class="w-full h-full m12:overflow-x-hidden mt-4 m8:mt-0 m8:border-t overflow-y-auto shadow-in items-center flex place-content-center">
            <div class="justify-between bg-primary dark:bg-secondary text-secondary dark:text-primary py-2 px-5 rounded">
                <p class="font-bold">Aucun pronostique</p>
                <p>
                    Problème rencontré lors du chargement: Code {response.status}<br />
                    {response.text}
                </p>
            </div>
        </div>
    {:else}
        <div class="w-full m12:overflow-x-hidden mt-4 m8:mt-0 m8:border-t overflow-y-auto h-full shadow-in items-center flex flex-col">
            <ul class="w-[95%] flex flex-col gap-3 pt-4 items-center pb-6">
                {#each response.data as [fetchedProno, fetchedGame], index}
                    {#if teamFilter[index] && stageFilter[index] && fromFilter[index] && toFilter[index]}
                        {#if pronoMode}
                            <PronoDisplay {pronoMode} {displayMode} {fetchedProno} {fetchedGame} bind:prono={pronos[index]} />
                        {:else}
                            <PronoDisplay {fetchedGame} />
                        {/if}
                    {/if}
                {/each}
            </ul>
        </div>
    {/if}
</div>
