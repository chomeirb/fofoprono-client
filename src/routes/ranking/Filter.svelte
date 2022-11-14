<script>
  export let queryPlayer;
</script>

<div class="flex flex-col gap-3 justify-start w-[90%] shadow-in mt-4 m8:mt-0 px-4 py-5 m8:px-2 m8:py-2 h-min">
  <div class="flex flex-col w-full" title="Vous pouvez entrer plusieurs joueurs en les séparant par une virgule">
    <label for="player">Joueurs</label>
    <input
      id="player"
      type="text"
      class="bg-primary dark:bg-secondary text-secondary dark:text-primary rounded px-3 py-1 w-full h-10"
      bind:value={$queryPlayer} />
  </div>
</div>
