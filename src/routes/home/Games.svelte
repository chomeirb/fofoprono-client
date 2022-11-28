<script lang="ts">
	import { games } from '../store';
	import GamesDisplay from '../components/GamesDisplay/GamesDisplay.svelte';
</script>

<div class="flex h-full w-full flex-col items-center justify-center">
	<GamesDisplay pronoMode={false} displayMode={false} games={$games} />
</div>
