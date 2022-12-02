<script lang="ts">
	import { PUBLIC_API_URL } from '$env/static/public';

	import { GamesDisplay, pronos } from '../components/Games';
	import { getGames } from '../fetchGames';
	import { games } from '../store';

    let inputs: Record<number, [number, number]> = {};
    games.subscribe(({data}) => {
        data.forEach(([, game]) => inputs[game.id] = [null!, null!]);
    })
    
	const submit = async () => {
		const submitPronos = Object.values($pronos);
		submitPronos.forEach((prediction) => (inputs[prediction.game_id] = null!));

		if (submitPronos.length > 0) {
			await fetch(`${PUBLIC_API_URL}/prono`, {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(submitPronos)
			});

            $games = await getGames();
		} else {
            $games = $games
        }
	};
</script>

<form class="h-full" id="Pronos" on:submit|preventDefault={submit}>
	<GamesDisplay pronoMode={true} games={$games} bind:inputs />
</form>
