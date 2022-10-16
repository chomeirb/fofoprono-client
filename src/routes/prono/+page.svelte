<script>
  import Match from "./Pronos.svelte";
</script>

<div class="flex flex-col items-center justify-center mt-10 w-full  h-[80vh]">
  <div
    class="text-4xl flex flex-row justify-between items-center w-full max-w-7xl">
    <p class="font-bold">PRONOSTIQUER</p>
    <button
      class="bg-col1 text-col4 py-2 px-5 rounded hover:translate-x-3 duration-300"
      >Soumettre →</button>
  </div>
  <div class="w-full max-w-7xl mt-4 mb-10 overflow-y-scroll shadow-in">
    <Match />
  </div>
</div>
