<script>
    import { Stage } from '$lib/types/game';
    import { displayStage } from '$lib/utils/display';

    export let queryTeam;
    export let queryStage;
    export let queryFrom;
    export let queryTo;
</script>

<div
    class="flex flex-col m12:flex-row gap-3 justify-start m12:justify-around w-[90%] m12:w-full shadow-in mt-4 m12:mt-0 px-4 m12:px-1 py-5 m12:py-2 m12:text-base h-min">
    <div class="flex flex-col w-full i2:w-[20%] i3:w-[20%] m8:w-12 m8:text-xs">
        <label for="from">Du</label>
        <input
            id="from"
            type="date"
            class="bg-primary dark:bg-secondary text-secondary m8:text-lg dark:text-primary rounded px-3 py-1 w-full h-10"
            bind:value={$queryFrom} />
    </div>
    <div class="flex flex-col w-full i2:w-[20%] i3:w-[20%] m8:w-12 m8:text-xs">
        <label for="to">Au</label>
        <input
            id="to"
            type="date"
            class="bg-primary dark:bg-secondary text-secondary m8:text-lg dark:text-primary rounded px-3 py-1 w-full h-10"
            bind:value={$queryTo} />
    </div>
    <div class="flex flex-col w-full m12:w-[20%] m8:w-[33%] m8:text-xs">
        <label for="team">Équipe</label>
        <input
            id="team"
            type="text"
            class="bg-primary dark:bg-secondary text-secondary dark:text-primary rounded px-3 py-1 w-full h-10"
            bind:value={$queryTeam} />
    </div>
    <div class="flex flex-col w-full m12:w-[20%] m8:w-[25%] m8:text-xs">
        <label for="stage">Étape</label>
        <select
            id="stage"
            type="text"
            class="bg-primary dark:bg-secondary text-secondary dark:text-primary rounded px-3 py-1 w-full h-10"
            bind:value={$queryStage}>
            <option value="">Tous</option>
            {#each Object.values(Stage) as stage}
                <option value={stage}>{displayStage(stage)}</option>
            {/each}
        </select>
    </div>
</div>
