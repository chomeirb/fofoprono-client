<script lang="ts">
    import { games } from '../store';
    import GamesDisplay from '../components/GamesDisplay/GamesDisplay.svelte';
</script>

<div class="flex flex-col items-center justify-center h-full w-full">
    <GamesDisplay pronoMode={false} displayMode={false} games={$games} />
</div>
