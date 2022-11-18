<script>
  import { onDestroy } from 'svelte';
  import Form from './Form.svelte';
  import { result, cleanResult } from './store';

  let resultContent = '';

  result.subscribe((value) => {
    resultContent = value;
  });

  onDestroy(() => {
    cleanResult();
  });
</script>

<div class="flex flex-col items-center justify-start h-full pt-[3%] w-full">
  <div class="text-4xl flex flex-row h-[10%] m12:justify-center items-center w-full max-w-xl">
    <p class="font-bold">CONNEXION</p>
  </div>
  <div class="flex flex-col h-[70%] overflow-auto justify-start items-center w-full max-w-xl shadow-in text-2xl gap-5 py-8 px-20 m12:px-5 m12:w-full">
    <Form />
    <p class="text-3xl px-5 rounded text-center font-bold">{resultContent}</p>
    <a href="/signup" class="text-xl px-5 rounded underline text-center hover:opacity-70">Pas encore de compte ?</a>
  </div>
</div>
