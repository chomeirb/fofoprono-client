<script lang="ts">
    import { games } from '../store';
    import GamesDisplay from '../components/GamesDisplay/GamesDisplay.svelte';
</script>

<div class="flex flex-col items-center justify-center h-full w-full">
    {#if $games.text !== 'OK'}
        <div class="flex flex-row items-center justify-between bg-primary dark:bg-secondary text-secondary dark:text-primary py-2 px-5 rounded">
            <p class="font-bold">Aucun match</p>
            <p>Problème rencontré lors du chargement: {$games.status} {$games.text}</p>
        </div>
    {:else if $games.data.length === 0}
        <div class="flex flex-row items-center justify-between bg-primary dark:bg-secondary text-secondary dark:text-primary py-2 px-5 rounded">
            <p class="font-bold">Aucun match</p>
            <p>Il n'y a aucun match</p>
        </div>
    {:else}
        <GamesDisplay pronoMode={false} displayMode={false} games={$games.data} />
    {/if}
</div>
