<script>
  // import { API_URL } from '$env/static/private';
  import { onDestroy } from 'svelte';
  import { submiting, result, cleanResult } from './store';

  let name = '';
  let mail = '';
  let password = '';

  let submitContent = false;

  submiting.subscribe((value) => {
    submitContent = value;
  });

  const submit = async () => {
    if (!(name && mail && password)) {
      result.set('Veuillez remplir tous les champs !');
      return;
    }

    submiting.set(true);
    try {
      const body = JSON.stringify({ name, mail, password });
      console.log(body);
      const res = await fetch(`/api/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      });

      if (res.ok) {
        result.set('Un lien de vérification a été envoyé à votre adresse mail !');
      } else {
        result.set('Une erreur est survenue, veuillez réessayer !');
      }
    } catch (err) {
      result.set('Une erreur est survenue !');
    }

    submiting.set(false);
  };

  onDestroy(() => {
    submiting.set(false);
  });
</script>

<form class="flex flex-col gap-5" on:submit|preventDefault={submit}>
  <div class="flex flex-col justify-start w-full">
    <p class="font-bold">Pseudo</p>
    <input type="text" class="w-full h-10 shadow-lg border rounded px-2" bind:value={name} on:change={cleanResult} />
  </div>
  <div class="flex flex-col justify-start w-full">
    <p class="font-bold">Email</p>
    <input type="email" class="w-full h-10 shadow-lg border rounded px-2" on:change={cleanResult} bind:value={mail} />
  </div>
  <div class="flex flex-col justify-start w-full">
    <p class="font-bold">Mot de passe</p>
    <input type="password" class="w-full h-10 shadow-lg border rounded px-2" bind:value={password} on:change={cleanResult} />
  </div>
  <div class="flex flex-col items-center w-full gap-5">
    <input
      type="submit"
      class="bg-col1 text-col4 px-5 py-2 shadow-xl rounded w-1/2 hover:translate-x-6 hover:cursor-pointer duration-200"
      value={submitContent ? 'Envoie...' : "M'incrire ➔"} />
  </div>
</form>
