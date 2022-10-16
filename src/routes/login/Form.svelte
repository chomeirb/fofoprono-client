<script>
  // import { API_URL } from '$env/static/private';
  import { onDestroy } from "svelte";
  import { connecting, result, cleanResult } from "./store";

  let name = "";
  let mail = "";
  let password = "";

  let connectingContent = false;

  connecting.subscribe((value) => {
    connectingContent = value;
  });

  const submit = async () => {
    if (!(name && password)) {
      result.set("Veuillez remplir tous les champs !");
      return;
    }

    connecting.set(true);
    try {
      let token = window.btoa(`${name}:${password}`);

      const body = JSON.stringify({ name, mail, password });
      console.log(body);
      const res = await fetch("/api/login", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          Authorization: `Basic ${token}`,
        },
      });

      if (res.ok) {
        window.location.href = "/prono";
      } else {
        result.set("Mot de passe ou pseudo incorrect !");
      }
    } catch (err) {
      result.set("Une erreur est survenue !");
    }

    connecting.set(false);
  };

  onDestroy(() => {
    connecting.set(false);
  });
</script>

<form class="flex flex-col gap-5" on:submit|preventDefault={submit}>
  <div class="flex flex-col justify-start w-full">
    <p class="font-bold">Pseudo</p>
    <input
      type="text"
      class="w-full h-10 shadow-lg border rounded px-2"
      bind:value={name}
      on:change={cleanResult}
    />
  </div>
  <div class="flex flex-col justify-start w-full">
    <p class="font-bold">Mot de passe</p>
    <input
      type="password"
      class="w-full h-10 shadow-lg border rounded px-2"
      bind:value={password}
      on:change={cleanResult}
    />
  </div>
  <div class="flex flex-col items-center w-full gap-5">
    <input
      type="submit"
      class="bg-col1 text-col4 px-5 py-2 shadow-xl rounded w-1/2 hover:translate-x-6 hover:cursor-pointer duration-200"
      value={connectingContent ? "Connection..." : "Connexion ➔"}
    />
  </div>
</form>
