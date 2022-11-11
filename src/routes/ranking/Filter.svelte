<script>
  export let queryPlayer;
</script>

<div class="flex flex-col gap-3 justify-start w-[90%] shadow-in mt-4 px-4 py-5 h-min">
  <div class="flex flex-col w-full">
    <label for="player">Joueurs</label>
    <input
      title="Vous pouvez entrer plusieurs joueurs en les séparant par une virgule"
      id="player"
      type="text"
      class="bg-primary dark:bg-secondary text-secondary dark:text-primary rounded px-3 py-1 w-full h-10"
      bind:value={$queryPlayer} />
  </div>
</div>
