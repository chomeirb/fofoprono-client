<script lang="ts">
    import type { Game } from '$lib/types/game';
    import type { PronoResult } from '$lib/types/prono';
    import type { ResponseResult } from '$lib/types/returnable';
    import GamesDisplay from '../../components/GamesDisplay/GamesDisplay.svelte';

    export let response: ResponseResult<[PronoResult, Game][]>;
</script>

<form class="h-full">
    <div class="flex flex-col items-center justify-center h-full w-full">
        {#if response.text !== 'OK'}
            <div class="justify-between bg-primary dark:bg-secondary text-secondary dark:text-primary py-2 px-5 rounded">
                <p class="font-bold">Aucun pronostique</p>
                <p>
                    Problème rencontré lors du chargement: Code {response.status}<br />
                    {response.text}
                </p>
            </div>
        {:else}
            <GamesDisplay pronoMode={true} displayMode={true} {response} />
        {/if}
    </div>
</form>
