<script>
  import { Stage } from '$lib/types/game';
  import { displayStage } from '$lib/utils/display';

  export let queryTeam;
  export let queryStage;
  export let queryFromDate;
  export let queryToDate;
</script>

<div class="flex flex-col m12:flex-row gap-3 justify-start m12:justify-around w-[90%] m12:w-full shadow-in mt-4 m12:mt-0 px-4 m12:px-1 py-5 m12:py-2 m12:text-base h-min">
  <div class="flex flex-col w-full m12:w-[20%]">
    <label for="from">Du</label>
    <input
      id="from"
      type="date"
      class="bg-primary dark:bg-secondary text-secondary dark:text-primary rounded px-3 py-1 w-full h-10"
      bind:value={$queryFromDate} />
  </div>
  <div class="flex flex-col w-full m12:w-[20%]">
    <label for="to">Au</label>
    <input
      id="to"
      type="date"
      class="bg-primary dark:bg-secondary text-secondary dark:text-primary rounded px-3 py-1 w-full h-10"
      bind:value={$queryToDate} />
  </div>
  <div class="flex flex-col w-full m12:w-[20%]">
    <label for="team">Équipe</label>
    <input
      id="team"
      type="text"
      class="bg-primary dark:bg-secondary text-secondary dark:text-primary rounded px-3 py-1 w-full h-10"
      bind:value={$queryTeam} />
  </div>
  <div class="flex flex-col w-full m12:w-[20%]">
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
