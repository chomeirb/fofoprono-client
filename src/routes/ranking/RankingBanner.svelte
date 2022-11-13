<script lang="ts">
  export let sortingFunction: (label: string) => void;
  export let currentSortLabel: string;
  export let currentSortOrder: string;
</script>

<div class="flex flex-row justify-between items-center w-full px-10 py-3 shadow-xl border">
  <p
    class="text-primary dark:text-secondary w-[10%] h-full text-xl hover:underline hover:opacity-70 hover:cursor-pointer"
    on:click={() => sortingFunction('rank')}>
    Rg{currentSortLabel === 'rank' ? (currentSortOrder === 'desc' ? '▲' : '▼') : ''}
  </p>
  <p
    class="text-primary dark:text-secondary w-[52%] h-full text-xl hover:underline hover:opacity-70 hover:cursor-pointer"
    on:click={() => sortingFunction('name')}>
    Nom{currentSortLabel === 'name' ? (currentSortOrder === 'asc' ? '▲' : '▼') : ''}
  </p>
  <p
    class="text-primary dark:text-secondary w-[15%] h-full text-xl hover:underline hover:opacity-70 hover:cursor-pointer text-left"
    title="Scores exacts trouvé"
    on:click={() => sortingFunction('perfect')}>
    Sc. exacts{currentSortLabel === 'perfect' ? (currentSortOrder === 'asc' ? '▲' : '▼') : ''}
  </p>
  <p
    class="text-primary dark:text-secondary w-[15%] h-full text-xl hover:underline hover:opacity-70 hover:cursor-pointer text-left"
    title="Bon résulats de matchs trouvés, avec score inexact"
    on:click={() => sortingFunction('good')}>
    Résultats{currentSortLabel === 'good' ? (currentSortOrder === 'asc' ? '▲' : '▼') : ''}
  </p>
  <p
    class="text-primary dark:text-secondary w-[8%] h-full text-xl hover:underline hover:opacity-70 hover:cursor-pointer text-left"
    on:click={() => sortingFunction('score')}>
    Points{currentSortLabel === 'score' ? (currentSortOrder === 'asc' ? '▲' : '▼') : ''}
  </p>
</div>
