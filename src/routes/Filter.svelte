<script>
  import { Stage } from '$lib/types/game';
  import { displayStage } from '$lib/utils/display';

  export let queryTeam;
  export let queryStage;
  export let queryFromDate;
  export let queryToDate;
</script>

<div class="flex flex-col gap-3 justify-start w-[90%] shadow-in mt-4 px-4 py-5 h-min">
  <div class="flex flex-col w-full">
    <label for="from">Du</label>
    <input
      id="from"
      type="date"
      class="bg-primary dark:bg-secondary text-secondary dark:text-primary rounded py-1 w-full"
      bind:value={$queryFromDate} />
  </div>
  <div class="flex flex-col w-full">
    <label for="to">Au</label>
    <input
      id="to"
      type="date"
      class="bg-primary dark:bg-secondary text-secondary dark:text-primary rounded py-1 w-1/2"
      bind:value={$queryToDate} />
  </div>
  <div class="flex flex-col w-full">
    <label for="team">Équipe</label>
    <input
      id="team"
      type="text"
      class="bg-primary dark:bg-secondary text-secondary dark:text-primary rounded px-1 py-1 w-1/2"
      bind:value={$queryTeam} />
  </div>
  <div class="flex flex-col w-full">
    <label for="stage">Étape</label>
    <select
      id="stage"
      type="text"
      class="bg-primary dark:bg-secondary text-secondary dark:text-primary rounded py-1 w-full h-full"
      bind:value={$queryStage}>
      <option value="">Tous</option>
      {#each Object.values(Stage) as stage}
        <option value={stage}>{displayStage(stage)}</option>
      {/each}
    </select>
  </div>
</div>
