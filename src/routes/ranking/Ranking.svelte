<script lang="ts">
	import PlayersDisplay from '../components/Ranking/PlayersDisplay.svelte';
	import { players } from '../store';

	export let showFilter: boolean;

</script>

<div class="h-full">
	<PlayersDisplay bind:showFilter players={$players} />
</div>
