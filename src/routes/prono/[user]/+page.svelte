<script lang="ts">
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import type { Game } from '$lib/types/game';
    import type { PronoResult } from '$lib/types/prono';
    import type { ResponseResult } from '$lib/types/returnable';
    import { onMount } from 'svelte';
    import { getGames } from './fetchPronos';
    import Pronos from './Pronos.svelte';

    let response: ResponseResult<[PronoResult, Game][]> = {
        status: undefined!,
        text: 'LOADING',
        data: undefined!,
    };

    onMount(async () => {
        const user = $page.params.user;
        response = await getGames(user);
        goto(window.location.href);
    });
</script>

<div class="flex flex-col items-center justify-start pt-3 m8:pt-0 w-full h-full">
    <div class="text-4xl m12:text-xl flex flex-row justify-between items-center w-full h-[10%] m8:h-[8%] max-w-8xl px-3 m12:px-3">
        <p class="font-bold m12:text-xl">PRONOSTIQUER</p>
    </div>
    {#if response.text === 'LOADING'}
        <pre>Loading...</pre>
    {:else}
        <div class="w-full max-w-8xl px-3 m12:px-0 m12:mt-2 m8:mt-0  h-[83%]">
            <Pronos {response} />
        </div>
    {/if}
</div>
