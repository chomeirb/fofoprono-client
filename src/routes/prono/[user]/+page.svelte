<script lang="ts">
    import { page } from '$app/stores';
    import Pronos from './Pronos.svelte';
</script>

<div class="flex flex-col items-center justify-start pt-3 m8:pt-0 w-full h-full">
    <div class="text-4xl m12:text-xl flex flex-row justify-between items-center w-full h-[10%] m8:h-[8%] max-w-8xl px-3 m12:px-3">
        <p class="font-bold m12:text-xl">PRONOSTIQUES DE {$page.params.user.toUpperCase()}</p>
    </div>
    <div class="w-full max-w-8xl px-3 m12:px-0 m12:mt-2 m8:mt-0  h-[83%]">
        <Pronos />
    </div>
</div>
