<script>
  const players = [
    { name: "Hugo", points: 10, exact: 2, good: 3 },
    { name: "Benjamin", points: 9, exact: 2, good: 3 },
    { name: "Raphaël", points: 8, exact: 2, good: 3 },
    { name: "Samuel", points: 7, exact: 2, good: 3 },
    { name: "Lucas", points: 6, exact: 2, good: 3 },
    { name: "Paul", points: 5, exact: 2, good: 3 },
    { name: "Ngolo", points: 4, exact: 2, good: 3 },
    { name: "Antoine", points: 3, exact: 2, good: 3 },
    { name: "Olivier", points: 2, exact: 2, good: 3 },
    { name: "Killian", points: 1, exact: 2, good: 3 },
    { name: "Blaise", points: 0, exact: 2, good: 3 },
    { name: "Hugo", points: 10, exact: 2, good: 3 },
    { name: "Benjamin", points: 9, exact: 2, good: 3 },
    { name: "Raphaël", points: 8, exact: 2, good: 3 },
    { name: "Samuel", points: 7, exact: 2, good: 3 },
    { name: "Lucas", points: 6, exact: 2, good: 3 },
    { name: "Paul", points: 5, exact: 2, good: 3 },
    { name: "Ngolo", points: 4, exact: 2, good: 3 },
    { name: "Antoine", points: 3, exact: 2, good: 3 },
    { name: "Olivier", points: 2, exact: 2, good: 3 },
    { name: "Killian", points: 1, exact: 2, good: 3 },
    { name: "Blaise", points: 0, exact: 2, good: 3 },
  ];
</script>

<div class="flex flex-col items-center justify-center mb-3 w-full">
  <ul class="w-[95%] flex flex-col gap-3 pt-4">
    {#each players as player, i}
      <li
        class="flex flex-row justify-between items-center w-full h-[50px] px-5 shadow-xl border"
      >
        <div class="w-1/4 flex flex-row justify-between">
          <p class="text-col1 w-1/6 text-left text-xl">{i + 1}</p>
          <p class="text-col1 w-5/6 text-left text-xl">{player.name}</p>
        </div>
        <div class="w-1/2 flex flex-row justify-between">
          <p class="text-col1 text-xl text-left w-1/4">{player.exact}</p>
          <p class="text-col1 text-xl text-center w-1/4">{player.good}</p>
          <p class="text-col1 text-xl text-right font-bold w-1/4">
            {player.points}
          </p>
        </div>
      </li>
    {/each}
  </ul>
</div>
