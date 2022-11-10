<script lang="ts">
  import logo from '$lib/images/fplogo.png';
  import logoDark from '$lib/images/fplogo-dark.png';
  import nightLight from '$lib/images/night-light.png';
  import nightLightDark from '$lib/images/night-light-dark.png';
  import logoutPic from '$lib/images/logout.png';
  import logoutPicDark from '$lib/images/logout-dark.png';
  import { onMount } from 'svelte';
  import { disableCurtain, enableCurtain, fetchLoggedIn } from './store';

  // let connected: Boolean = false;
  let name: String = '';
  let loggedIn = false;
  let darkMode = false;
  fetchLoggedIn.subscribe((value: boolean) => {
    loggedIn = value;
  });

  onMount(async () => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      darkMode = true;
    } else {
      document.documentElement.classList.remove('dark');
      darkMode = false;
    }

    try {
      const res = await fetch(`/api/user`, {
        method: 'GET',
        credentials: 'same-origin',
      });

      if (res.ok) {
        const data = await res.json();
        name = data.name;
        fetchLoggedIn.set(true);
      }
    } catch (err) {
      console.error(err);
    }
  });

  const logout = async () => {
    try {
      const res = await fetch(`/api/logout`, {
        method: 'POST',
      });

      if (res.ok) {
        fetchLoggedIn.set(false);
        window.location.href = '/home';
      }
    } catch (err) {
      console.error(err);
    }
  };

  function toggleDarkMode() {
    if (document.documentElement.classList.contains('dark')) {
      localStorage.theme = 'light';
      document.documentElement.classList.remove('dark');
      darkMode = false;
    } else {
      localStorage.theme = 'dark';
      document.documentElement.classList.add('dark');
      darkMode = true;
    }
  }
</script>

<header class="flex flex-row shadow-lg justify-center text-3xl text-secondary dark:text-primary w-full h-[90px]">
  <div class="w-full h-full max-w-8xl flex flex-row justify-center gap-5 items-center">
    <a href="/home" class="h-[50%] hover:-rotate-12 duration-200" on:click={enableCurtain}>
      <img src={darkMode ? logoDark : logo} alt="logo" class="h-full" />
    </a>
    <nav class="flex flex-row items-center justify-center w-full h-[90%]">
      <ul class="flex flex-row justify-between w-full gap-5 h-full items-center">
        <div class="flex flex-row gap-5 h-full items-center">
          <li class="hover:translate-y-2 duration-200">
            <a class="bg-primary dark:bg-secondary rounded px-5 py-2 hover:translate-y-10 duration-200" on:click={disableCurtain} href="/home">Accueil</a>
          </li>
          <li class="hover:translate-y-2 duration-200">
            <a class="bg-primary dark:bg-secondary rounded px-5 py-2 hover:translate-y-10 duration-200" href="/prono">Pronostics</a>
          </li>
          <li class="hover:translate-y-2 duration-200">
            <a class="bg-primary dark:bg-secondary rounded px-5 py-2" href="/ranking">Classement</a>
          </li>
          <li class="hover:translate-y-2 duration-200">
            <a class="bg-primary dark:bg-secondary rounded px-5 py-2" href="/rules">Règles</a>
          </li>
        </div>
        <div class="text-primary dark:text-secondary text-xl flex flex-row gap-5">
          <img
            src={darkMode ? nightLightDark : nightLight}
            id="night-light"
            class="h-8 hover:opacity-70 hover:cursor-pointer"
            alt="night-light"
            on:click={toggleDarkMode} />
          <li class="flex flex-row items-center gap-6">
            {#if loggedIn}
              <p class="px-2 font-bold text-4xl border shadow-xl">{name}</p>
              <img src={darkMode ? logoutPicDark : logoutPic} class="hover:opacity-70 hover:cursor-pointer h-10" alt="logout" on:click={logout} />
            {:else}
              <a class="px-2 hover:opacity-70 underline" href="/login">Connexion</a>
            {/if}
          </li>
        </div>
      </ul>
    </nav>
  </div>
</header>
