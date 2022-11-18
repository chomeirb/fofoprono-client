<script lang="ts">
  import groups from '../../../data/groups.json';


  export let queryPlayers;
</script>

<div class="flex w-1/6 m12:w-full">
  <div class="flex flex-col m12:flex-row gap-3 justify-start w-[90%] m12:w-full shadow-in mt-4 m12:mt-0 px-4 m12:-px-6 py-5 m12:px-2 m12:py-2 h-min">
    <div class="flex flex-col w-full" title="Vous pouvez entrer plusieurs joueurs en les séparant par une virgule">
      <label for="player m6:text-sm">Joueurs</label>
      <input
        id="player"
        type="text"
        class="bg-primary dark:bg-secondary text-secondary dark:text-primary rounded px-3 py-1 w-full h-10 m6:text-sm m6:h-6"
        bind:value={$queryPlayers} />
    </div>
    <div class="flex flex-col w-full">
      <label for="stage">Groupe</label>
      <select
        id="stage"
        type="text"
        class="bg-primary dark:bg-secondary text-secondary dark:text-primary rounded px-3 py-1 w-full h-10 m6:text-sm m6:h-6"
        bind:value={$queryPlayers}>
        <option value="">Tous</option>
        {#each groups as group}
          <option value={group.queryUsers}>{group.label}</option>
        {/each}
      </select>
    </div>
  </div>
</div>
