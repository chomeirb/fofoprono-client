<script>
  import { onDestroy } from 'svelte';
  import { connecting, result, cleanResult } from './store';
  import { PUBLIC_API_URL } from '$env/static/public';

  let id = '';
  let name = '';
  let mail = '';
  let password = '';

  let connectingContent = false;

  connecting.subscribe((value) => {
    connectingContent = value;
  });

  const submit = async () => {
    if (!(id && password)) {
      result.set('Veuillez remplir tous les champs !');
      return;
    }

    if (/\@/.test(id)) {
      name = '';
      mail = id;
    } else {
      name = id;
      mail = '';
    }

    connecting.set(true);
    
    try {
      const body = JSON.stringify({ name, mail, password });
      const res = await fetch(`${PUBLIC_API_URL}/login`, {
        method: 'POST',
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });

      if (res.ok) {
        window.location.href = '/prono';
      } else {
        result.set('Mot de passe ou pseudo incorrect !');
      }
    } catch (err) {
      result.set('Une erreur est survenue !');
    }

    connecting.set(false);
  };

  onDestroy(() => {
    connecting.set(false);
  });
</script>

<form class="flex flex-col gap-5 text-primary" on:submit|preventDefault={submit}>
  <div class="flex flex-col justify-start w-full">
    <p class="font-bold dark:text-secondary text-primary">Pseudo ou adresse email</p>
    <input autocomplete="username" type="text" class="w-full h-10 shadow-lg border rounded px-2" bind:value={id} on:change={cleanResult} />
  </div>
  <div class="flex flex-col justify-start w-full">
    <p class="font-bold dark:text-secondary text-primary">Mot de passe</p>
    <input autocomplete="current-password" type="password" class="w-full h-10 shadow-lg border rounded px-2" bind:value={password} on:change={cleanResult} />
  </div>
  <div class="flex flex-col items-center w-full gap-5 mt-5">
    <input
      type="submit"
      class="bg-primary dark:bg-secondary text-secondary dark:text-primary px-5 py-2 shadow-xl rounded m12:w-5/6 hover:translate-x-6 hover:cursor-pointer duration-200"
      value={connectingContent ? 'Connexion...' : 'Connexion ➔'} />
  </div>
</form>
