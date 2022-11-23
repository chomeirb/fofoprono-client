<script>
    import Ranking from './Ranking.svelte';
</script>

<div class="flex flex-col items-center justify-start w-full pt-3 m8:pt-0 h-full">
    <div class="text-4xl m6:text-3xl h-[10%] m8:h-[8%] flex flex-row justify-between m12:justify-center items-center w-full max-w-8xl px-3">
        <p class="font-bold m12:text-center ">CLASSEMENT</p>
    </div>
    <div class="w-full max-w-8xl px-3 m12:px-0 h-[83%]">
        <Ranking />
    </div>
</div>
