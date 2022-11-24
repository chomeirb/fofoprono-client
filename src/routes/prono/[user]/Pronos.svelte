<script lang="ts">
    import { page } from '$app/stores';
    import type { Game } from '$lib/types/game';
    import type { PronoResult } from '$lib/types/prono';
    import type { ResponseResult } from '$lib/types/returnable';
    import { onMount } from 'svelte';
    import GamesDisplay from '../../components/GamesDisplay/GamesDisplay.svelte';
    import { getGames } from './fetchPronos';

    let response: ResponseResult<[PronoResult, Game][]> = {
        status: undefined!,
        text: 'LOADING',
        data: [],
    };
    
    onMount(async () => {
        const user = $page.params.user;
        response = await getGames(user);
    });
</script>

<form class="h-full">
    <div class="flex flex-col items-center justify-center h-full w-full">
        <GamesDisplay pronoMode={true} displayMode={true} {response} />
    </div>
</form>
