<script>
  import { Stage } from '$lib/types/game';
  import { displayStage } from '$lib/utils/display';

  export let queryTeam;
  export let queryStage;
  export let queryFromDate;
  export let queryToDate;
</script>

<div class="flex flex-row gap-3 justify-start w-full">
  <div class="flex flex-col w-[12%]">
    <label for="from">Du</label>
    <input
      id="from"
      type="date"
      class="bg-primary dark:bg-secondary text-secondary dark:text-primary rounded text-center px-3 py-1 w-full"
      bind:value={$queryFromDate} />
  </div>
  <div class="flex flex-col w-[24%]">
    <label for="to">Au</label>
    <input
      id="to"
      type="date"
      class="bg-primary dark:bg-secondary text-secondary dark:text-primary rounded text-center px-3 py-1 w-1/2"
      bind:value={$queryToDate} />
  </div>
  <div class="flex flex-col w-[33%] ml-10">
    <label for="team">Équipe</label>
    <input
      id="team"
      type="text"
      class="bg-primary dark:bg-secondary text-secondary dark:text-primary rounded text-center px-3 py-1 w-1/2"
      bind:value={$queryTeam} />
  </div>
  <div class="flex flex-col w-[10%]">
    <label for="stage">Étape</label>
    <select
      id="stage"
      type="text"
      class="bg-primary dark:bg-secondary text-secondary dark:text-primary rounded text-center px-3 py-1 w-full h-full"
      bind:value={$queryStage}>
      <option value="" />
      <option value={Stage.Group}>{displayStage(Stage.Group)}</option>
      <option value={Stage.Sixteen}>{displayStage(Stage.Sixteen)}</option>
      <option value={Stage.Quarter}>{displayStage(Stage.Quarter)}</option>
      <option value={Stage.Semi}>{displayStage(Stage.Semi)}</option>
      <option value={Stage.Final}>{displayStage(Stage.Final)}</option>
    </select>
  </div>
</div>
