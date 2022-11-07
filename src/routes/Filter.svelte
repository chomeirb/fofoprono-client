<script>
  export let queryTeam;
  export let queryStage;
</script>

<div class="flex flex-row gap-5">
  <input class="bg-col1 text-col4 rounded text-center z-10" bind:value={$queryTeam} />
  <input class="bg-col1 text-col4 rounded text-center z-10" bind:value={$queryStage} />
</div>
