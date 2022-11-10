<script lang="ts">
    import type { Other, Current, UserScore } from "$lib/types/player";

    export let player: Current | Other;
    export let rank: number;

</script>

<li class="flex flex-row justify-between items-center w-full h-[50px] px-5 shadow-xl border">
    <p class="text-primary dark:text-secondary w-1/6 text-xl">{rank}</p>
    <p class="text-primary dark:text-secondary w-5/6 text-xl">{player.name}</p>
    <p class="text-primary dark:text-secondary w-1/4 text-xl text-right">{player.results_perfect}</p>
    <p class="text-primary dark:text-secondary w-1/4 text-xl text-right">{player.results_good}</p>
    <p class="text-primary dark:text-secondary w-1/4 text-xl text-right">{player.score}</p>
  </li>