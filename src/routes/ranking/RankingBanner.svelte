<script lang="ts">
  export let sortingFunction: (label: string) => void;
  export let currentSortLabel: string;
  export let currentSortOrder: string;
</script>

<div class="flex flex-row justify-between items-center w-full px-10 m12:px-[5%] py-3 shadow-in border h-min">
  <p
    class="text-primary dark:text-secondary w-[10%] m6:text-base m12:w-[25%] text-xl hover:underline hover:opacity-70 hover:cursor-pointer"
    title="rang"
    on:click={() => sortingFunction('rank')}>
    Rg. {currentSortLabel === 'rank' ? (currentSortOrder === 'desc' ? '▲' : '▼') : ''}
  </p>
  <p
    class="text-primary dark:text-secondary w-[52%] m6:text-base text-xl hover:underline hover:opacity-70 hover:cursor-pointer"
    on:click={() => sortingFunction('name')}>
    Nom {currentSortLabel === 'name' ? (currentSortOrder === 'asc' ? '▲' : '▼') : ''}
  </p>
  <p
    class="text-primary dark:text-secondary w-[15%] m6:text-base text-xl hover:underline hover:opacity-70 hover:cursor-pointer text-left m12:hidden"
    title="Scores exacts trouvé"
    on:click={() => sortingFunction('perfect')}>
    Exact {currentSortLabel === 'perfect' ? (currentSortOrder === 'asc' ? '▲' : '▼') : ''}
  </p>
  <p
    class="text-primary dark:text-secondary w-[16%] m6:text-base text-xl hover:underline hover:opacity-70 hover:cursor-pointer text-left m12:hidden"
    title="Bon résulats de matchs trouvés, avec score inexact"
    on:click={() => sortingFunction('good')}>
    Partiel {currentSortLabel === 'good' ? (currentSortOrder === 'asc' ? '▲' : '▼') : ''}
  </p>
  <p
    class="text-primary dark:text-secondary w-[7%] m6:text-base m12:w-[30%] text-xl hover:underline hover:opacity-70 hover:cursor-pointer m12:text-right text-left"
    title="Points"
    on:click={() => sortingFunction('score')}>
    Pts {currentSortLabel === 'score' ? (currentSortOrder === 'asc' ? '▲' : '▼') : ''}
  </p>
</div>
