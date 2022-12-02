<script lang="ts">
	import { games } from '../store';
	import GamesDisplay from '../components/Games/GamesDisplay.svelte';
</script>

<div class="flex h-full w-full flex-col items-center justify-center">
	<GamesDisplay pronoMode={false} games={$games} />
</div>
