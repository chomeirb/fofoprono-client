<script>
  import Standing from "./Ranking.svelte";
  import StandingBanner from "./RankingBanner.svelte";
</script>

<div class="flex flex-col items-center justify-center mt-10 w-full  h-[80vh]">
  <div
    class="text-4xl flex flex-row justify-between items-center w-full max-w-7xl"
  >
    <p class="font-bold">CLASSEMENT</p>
  </div>
  <div
    class="w-full max-w-7xl mt-5 bg-col1 text-col4 flex flex-col items-center"
  >
    <StandingBanner />
  </div>
  <div
    class="flex flex-col justify-start overflow-y-scroll w-full max-w-7xl mb-10 shadow-in"
  >
    <Standing />
  </div>
</div>
