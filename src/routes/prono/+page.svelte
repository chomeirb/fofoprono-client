<script lang="ts">
    import { session } from '../store';
    import Pronos from './Pronos.svelte';
</script>

<div class="flex flex-col items-center justify-start pt-3 m8:pt-0 w-full h-full">
    {#if !$session.data}
        <div class="flex flex-col items-center justify-center gap-10 h-full">
            <p class="text-4xl font-bold text-center items-center w-2/3">Vous devez vous connecter pour effectuer des pronostics !</p>
            <a href="/login" class="underline text-6xl">Connexion →</a>
        </div>
    {:else}
        <div class="text-4xl m12:text-xl flex flex-row justify-between items-center w-full h-[10%] m8:h-[8%] max-w-8xl px-3 m12:px-3">
            <p class="font-bold m12:text-xl">PRONOSTIQUER</p>
            <button
                type="submit"
                form="Pronos"
                class="m12:hidden bg-primary dark:bg-secondary text-secondary dark:text-primary py-2 px-5 rounded hover:translate-x-3 duration-300"
                >Valider →</button>
            <button
                type="submit"
                form="Pronos"
                class="hidden m12:flex bg-primary dark:bg-secondary text-secondary dark:text-primary py-2 px-5 rounded hover:translate-x-3 duration-300"
                >✔️</button>
        </div>
        <div class="w-full max-w-8xl px-3 m12:px-0 m12:mt-2 m8:mt-0  h-[83%]">
            <Pronos />
        </div>
    {/if}
</div>
