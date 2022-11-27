<script lang="ts">
    import Form from './Form.svelte';

    let result = '';
</script>

<div class="flex flex-col items-center justify-start h-full pt-[3%] w-full">
    <div class="text-4xl flex flex-row h-[10%] m12:justify-center items-center w-full max-w-xl">
        <p class="font-bold">CONNEXION</p>
    </div>
    <div class="flex flex-col overflow-auto items-center w-full max-w-xl shadow-in text-2xl gap-5 py-8 px-20 m12:px-5 m12:w-full rounded-xl">
        <Form bind:result />
        <p class="text-3xl px-5 rounded text-center font-bold">{result}</p>
        <a href="/signup" class="text-xl px-5 rounded underline text-center hover:opacity-70">Pas encore de compte ?</a>
    </div>
</div>
