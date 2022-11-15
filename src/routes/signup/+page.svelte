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

<div class="flex flex-col items-center justify-center mt-10 m12:mt-2 w-full  h-[80vh]">
  <div class="text-4xl flex flex-row justify-between m12:justify-center items-center w-full max-w-xl">
    <p class="font-bold">INSCRIPTION</p>
  </div>
  <div class="flex flex-col justify-start items-center w-full max-w-xl mt-5 mb-10 shadow-in text-2xl gap-5 py-8 px-20 max-h-[60vh] overflow-y-scroll">
    <Form />
    <p class="text-3xl px-5 rounded text-center font-bold">{resultContent}</p>
    <a href="/login" class="text-xl px-5 rounded underline hover:opacity-70 text-center">Déjà un compte ?</a>
  </div>
</div>
