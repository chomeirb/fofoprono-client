<script>
  import Match from './Matches.svelte';
  import Welcome from './Welcome.svelte';
</script>

<div class="flex flex-col items-center justify-center mt-10 w-full  h-[80vh]">
  <!-- <Welcome /> -->
  <p class="text-4xl font-bold">MATCHS</p>
  <div class="w-full max-w-7xl mt-4 mb-10 overflow-y-scroll">
    <Match />
  </div>
</div>
