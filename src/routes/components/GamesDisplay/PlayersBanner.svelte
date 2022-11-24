<script lang="ts">
    import { SortType } from '$lib/types/sort';

    export let sortType: SortType;
    export let sortAsc: boolean;

    function setSort(type: SortType) {
        if (sortType == type) {
            sortAsc = !sortAsc;
        } else {
            sortType = type;
        }
    }
</script>

<div class="flex flex-row justify-between items-center w-full px-10 m12:px-[5%] py-3 shadow-in border h-min">
    <p class="text-primary dark:text-secondary w-[10%] m6:text-base m12:w-[25%] text-xl" title="rang">Rang</p>
    <p
        class="text-primary dark:text-secondary w-[60%] m6:text-base text-xl hover:underline hover:opacity-70 hover:cursor-pointer"
        on:click={() => setSort(SortType.Name)}>
        Nom {sortType == SortType.Name ? (sortAsc ? '▲' : '▼') : ''}
    </p>
    <p
        class="text-primary dark:text-secondary w-[17%] m6:text-base text-xl hover:underline hover:opacity-70 hover:cursor-pointer text-left m12:hidden"
        title="Scores exacts trouvé"
        on:click={() => setSort(SortType.Perfect)}>
        Exact {sortType == SortType.Perfect ? (sortAsc ? '▲' : '▼') : ''}
    </p>
    <p
        class="text-primary dark:text-secondary w-[16%] m6:text-base text-xl hover:underline hover:opacity-70 hover:cursor-pointer text-left m12:hidden"
        title="Bon résulats de matchs trouvés, avec score inexact"
        on:click={() => setSort(SortType.Correct)}>
        Partiel {sortType == SortType.Correct ? (sortAsc ? '▲' : '▼') : ''}
    </p>
    <p
        class="text-primary dark:text-secondary w-[7%] m6:text-base m12:w-[30%] text-xl hover:underline hover:opacity-70 hover:cursor-pointer m12:text-right text-left"
        title="Points"
        on:click={() => setSort(SortType.Score)}>
        Pts {sortType == SortType.Score ? (sortAsc ? '▲' : '▼') : ''}
    </p>
</div>
