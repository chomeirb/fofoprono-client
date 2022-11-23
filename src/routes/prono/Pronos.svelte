<script lang="ts">
    import type { Game } from '$lib/types/game';
    import type { Prediction, PronoResult } from '$lib/types/prono';
    import GamesDisplay from '../components/GamesDisplay/GamesDisplay.svelte';

    import { games } from '../store';
    import { PUBLIC_API_URL } from '$env/static/public';
    import { isPassed } from '$lib/utils/display';
    import type { ResponseResult } from '$lib/types/returnable';

    let submitPronos: Prediction[] = [];

    games.subscribe((value: ResponseResult<[PronoResult, Game][]>) => {
        submitPronos = value.data.map(() => null!);
    });

    const submit = async () => {
        const toSubmit = submitPronos.filter((element, index) => {
            return element !== null && !isPassed($games.data[index][1].time);
        });

        if (toSubmit.length > 0) {
            const response = await fetch(`${PUBLIC_API_URL}/prono`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(toSubmit),
            });

            if (response.ok) {
                window.location.href = '/prono';
            }
        }
    };
</script>

<form class="h-full" id="Pronos" on:submit|preventDefault={submit}>
    <div class="flex flex-col items-center justify-center h-full w-full">
        <GamesDisplay pronoMode={true} displayMode={false} response={$games} bind:pronos={submitPronos} />
    </div>
</form>
