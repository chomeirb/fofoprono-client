<script lang="ts">
	import PlayersDisplay from '../components/GamesDisplay/PlayersDisplay.svelte';
	import { players } from '../store';
</script>

<div class="h-full">
	<PlayersDisplay players={$players} />
</div>
