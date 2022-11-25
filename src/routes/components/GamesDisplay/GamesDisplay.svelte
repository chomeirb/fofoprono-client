<script lang="ts">
    import { getQueryParamsStore } from '../../queryParamsStore';
    import type { Game } from '$lib/types/game';
    import type { Prediction, PronoResult } from '$lib/types/prono';
    import { sysTimeToDate } from '$lib/utils/display';
    import PronoDisplay from './Game.svelte';
    import Filter from './GamesFilter.svelte';
    import type { ResponseResult } from '$lib/types/returnable';

    export let games: ResponseResult<[PronoResult, Game][]>;
    export let pronos: Prediction[] = games.data.map(() => null!);

    export let pronoMode: boolean;
    export let displayMode: boolean;

    let queryTeam = getQueryParamsStore('team');
    let queryStage = getQueryParamsStore('stage');
    let queryFrom = getQueryParamsStore('from');
    let queryTo = getQueryParamsStore('to');

    $: filtered = games.data
        .filter(([, game]) => game.team_home.concat(' ', game.team_away).toUpperCase().includes($queryTeam.toUpperCase()))
        .filter(([, game]) => game.stage == $queryStage || $queryStage == '')
        .filter(([, game]) => $queryFrom === '' || sysTimeToDate(game.time) >= new Date($queryFrom))
        .filter(([, game]) => $queryTo === '' || sysTimeToDate(game.time) <= new Date($queryTo));
</script>

<div class="w-full h-full grid grid-cols-20-80 m12:flex m12:flex-col m12:items-center">
    <Filter bind:queryTeam bind:queryStage bind:queryFrom bind:queryTo />
    {#if games.text === 'LOADING'}
        <div class="w-full h-full m12:overflow-x-hidden mt-4 m8:mt-0 m8:border-t overflow-y-auto shadow-in items-center flex place-content-center">
            <p>Loading...</p>
        </div>
    {:else if games.text !== 'OK'}
        <div class="w-full h-full m12:overflow-x-hidden mt-4 m8:mt-0 m8:border-t overflow-y-auto shadow-in items-center flex place-content-center">
            <div class="justify-between bg-primary dark:bg-secondary text-secondary dark:text-primary py-2 px-5 rounded">
                <p class="font-bold">Aucun pronostique</p>
                <p>
                    Problème rencontré lors du chargement: Code {games.status}<br />
                    {games.text}
                </p>
            </div>
        </div>
    {:else}
        <div class="w-full m12:overflow-x-hidden mt-4 m8:mt-0 m8:border-t overflow-y-auto h-full shadow-in items-center flex flex-col">
            <ul class="w-full px-5 h-full flex flex-col gap-3 py-4">
                {#each filtered as [fetchedProno, fetchedGame]}
                    {#if pronoMode}
                        <PronoDisplay {pronoMode} {displayMode} {fetchedProno} {fetchedGame} bind:prono={pronos[fetchedGame.id - 1]} />
                    {:else}
                        <PronoDisplay {fetchedGame} />
                    {/if}
                {/each}
            </ul>
        </div>
    {/if}
</div>
