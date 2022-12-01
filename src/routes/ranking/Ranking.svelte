<script lang="ts">
	import PlayersDisplay from '../components/Ranking/PlayersDisplay.svelte';
	import { players } from '../store';
</script>

<div class="h-full">
	<PlayersDisplay players={$players} />
</div>
