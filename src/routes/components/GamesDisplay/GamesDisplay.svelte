<script lang="ts">
    import { getQueryParamsStore } from '../../queryParamsStore';
    import type { Game } from '$lib/types/game';
    import type { Prediction, PronoResult } from '$lib/types/prono';
    import { sysTimeToDate } from '$lib/utils/display';
    import PronoDisplay from './Game.svelte';
    import Filter from './Filter.svelte';
    import { onDestroy } from 'svelte';
    import type { ResponseResult } from '$lib/types/returnable';
    import { goto } from '$app/navigation';

    export let response: ResponseResult<[PronoResult, Game][]>;
    export let pronos: Prediction[] = response.data.map(() => null!);

    $: if (response) {
        goto(window.location.href);
    }

    export let pronoMode: boolean;
    export let displayMode: boolean;

    let teamFilter: boolean[] = [];
    let stageFilter: boolean[] = [];
    let fromDateFilter: boolean[] = [];
    let toDateFilter: boolean[] = [];

    let startDate = new Date();
    startDate.setDate(startDate.getDate() - 1);

    let endDate = new Date();
    endDate.setDate(endDate.getDate() + 10);

    let queryTeam = getQueryParamsStore('team');
    let queryStage = getQueryParamsStore('stage');
    let queryFromDate = getQueryParamsStore('from', startDate.toISOString().split('T')[0]);
    let queryToDate = getQueryParamsStore('to', endDate.toISOString().split('T')[0]);

    const unsubscribeTeam = queryTeam.subscribe((team: string) => {
        teamFilter = response.data.map(([, game]) => game.team_home.concat(' ', game.team_away).toUpperCase().includes(team.toUpperCase()));
    });

    const unsubscribeStage = queryStage.subscribe((stage: string) => {
        stageFilter = response.data.map(([, game]) => game.stage == stage || stage == '');
    });

    const unsubscribeFromDate = queryFromDate.subscribe((date: string) => {
        if (date == '') {
            fromDateFilter = response.data.map(() => true);
        } else {
            fromDateFilter = response.data.map(([, game]) => sysTimeToDate(game.time) >= new Date(date));
        }
    });

    const unsubscribeToDate = queryToDate.subscribe((date: string) => {
        if (date == '') {
            toDateFilter = response.data.map(() => true);
        } else {
            toDateFilter = response.data.map(([, game]) => sysTimeToDate(game.time) <= new Date(date));
        }
    });

    onDestroy(() => {
        unsubscribeTeam();
        unsubscribeStage();
        unsubscribeFromDate();
        unsubscribeToDate();
    });
</script>

<div class="w-full grid grid-cols-20-80 m12:flex m12:flex-col m12:items-center h-full">
    <Filter bind:queryTeam bind:queryStage bind:queryFromDate bind:queryToDate />
    {#if response.text === 'LOADING'}
        <div class="w-full h-full m12:overflow-x-hidden mt-4 m8:mt-0 m8:border-t overflow-y-auto shadow-in items-center flex place-content-center">
            <pre>Loading...</pre>
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
                    {#if teamFilter[index] && stageFilter[index] && fromDateFilter[index] && toDateFilter[index]}
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
