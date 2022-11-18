<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import Form from './Form.svelte';
  import { result, cleanResult } from './store';

  let resultContent: String = '';

  const unsubscribeResult = result.subscribe((value) => {
    resultContent = value;
  });

  onDestroy(() => {
    cleanResult();
    unsubscribeResult();
  });
</script>

<div class="flex flex-col items-center justify-center w-full  h-full pt[-3%]">
  <div class="text-4xl flex flex-row h-[10%] m12:justify-center items-center w-full max-w-xl">
    <p class="font-bold">INSCRIPTION</p>
  </div>
  <div class="flex flex-col justify-start items-center w-full max-w-xl h-[70%] shadow-in text-2xl gap-5 py-8 px-20 m12:px-5 max-h-[60vh] overflow-y-auto">
    <Form />
    <p class="text-3xl px-5 rounded text-center font-bold">{resultContent}</p>
    <a href="/login" class="text-xl px-5 rounded underline hover:opacity-70 text-center">Déjà un compte ?</a>
  </div>
</div>
