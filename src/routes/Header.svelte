<script>
  import logo from '$lib/images/fplogo.png';
  import { onMount } from 'svelte';
  import logoutPic from '$lib/images/logout.png';
  import { disableCurtain, enableCurtain } from './store';
  let connected = false;
  let name = '';

  onMount(async () => {
    try {
      const res = await fetch(`/api/user`, {
        method: 'GET',
        credentials: "same-origin",
      });

      if (res.ok) {
        const data = await res.json();
        name = data.name;
        connected = true;
      }
    } catch (err) {
      connected = false;
    }
  });

  const logout = async () => {
    try {
      const res = await fetch(`/api/logout`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: null,
      });

      if (res.ok) {
        connected = false;
      }
    } catch (err) {
      connected = true;
    }
  };
</script>

<header class="flex flex-row shadow-lg justify-center text-3xl text-col4 w-full h-[90px]">
  <div class="w-full h-full max-w-7xl flex flex-row justify-center gap-5 items-center">
    <a href="/home" class="h-[50%] hover:-rotate-12 duration-200" on:click={enableCurtain}>
      <img src={logo} alt="logo" class="h-full" />
    </a>
    <nav class="flex flex-row items-center justify-center w-full h-[90%]">
      <ul class="flex flex-row justify-between w-full gap-5 h-full items-center">
        <div class="flex flex-row gap-5 h-full items-center">
          <li class="hover:translate-y-2 duration-200">
            <a class="bg-col1 rounded px-5 py-2 hover:translate-y-10 duration-200" on:click={disableCurtain} href="/home">Accueil</a>
          </li>
          <li class="hover:translate-y-2 duration-200">
            <a class="bg-col1 rounded px-5 py-2 hover:translate-y-10 duration-200" href="/prono">Pronostics</a>
          </li>
          <li class="hover:translate-y-2 duration-200">
            <a class="bg-col1 rounded px-5 py-2" href="/standing">Classement</a>
          </li>
          <li class="hover:translate-y-2 duration-200">
            <a class="bg-col1 rounded px-5 py-2" href="/rules">Règles</a>
          </li>
        </div>
        <div class="text-col1 text-xl flex flex-row">
          <li class="flex flex-row items-center gap-6">
            {#if connected}
              <p class="px-2 font-bold text-4xl border shadow-xl">{name}</p>
              <img src={logoutPic} class="hover:opacity-70 hover:cursor-pointer h-10" alt="logout" on:click={logout} />
            {:else}
              <a class="px-2 hover:opacity-70 underline" href="/login">Connexion</a>
            {/if}
          </li>
        </div>
      </ul>
    </nav>
  </div>
</header>
