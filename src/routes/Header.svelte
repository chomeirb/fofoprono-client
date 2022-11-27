<script lang="ts">
    import FofoPronoLogo from './components/icons/Fofoprono.svelte';
    import { onMount } from 'svelte';
    import { disableCurtain, enableCurtain, session, darkMode } from './store';
    import LogoutIcon from './components/icons/Logout.svelte';
    import ThemeIcon from './components/icons/Theme.svelte';
    import PopupConfirmLogout from './components/Popup/ConfirmLogout.svelte';

    let hamIsOpen = false;
    let confirmLogout = false;

    onMount(async () => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
            darkMode.set(true);
        } else {
            document.documentElement.classList.remove('dark');
            darkMode.set(false);
        }
    });

    function toggleDarkMode() {
        if (document.documentElement.classList.contains('dark')) {
            localStorage.theme = 'light';
            document.documentElement.classList.remove('dark');
            darkMode.set(false);
        } else {
            localStorage.theme = 'dark';
            document.documentElement.classList.add('dark');
            darkMode.set(true);
        }
    }

    function toggleHam() {
        hamIsOpen = !hamIsOpen;
    }

    function showLogoutConfirm() {
        confirmLogout = true;
    }

    function hideLogoutConfirm() {
        confirmLogout = false;
    }

    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1);
    const date = currentDate.toISOString().split('T')[0];
    
    const home = 'home?from=' + date;
    const prono = 'prono?from=' + date;
</script>

<header class="flex flex-row shadow-lg justify-center text-3xl text-secondary dark:text-primary w-full h-[90px] m8:h-[60px]">
    <ul
        class={`z-40 m12:flex overflow-y-auto flex-col justify-center w-[100vw] shadow-in pt-10 bg-secondary dark:bg-primary text-primary dark:text-secondary fixed hidden m8 gap-10 h-[calc(100vh_-_180px)] m8:h-[calc(100vh_-_90px)] ${
            !hamIsOpen ? 'translate-x-[100vw]' : ''
        } duration-500 mt-[90px] m8:mt-[60px] items-center`}>
        <li class="w-4/6 py-2 flex flex-col items-center rounded-2xl border-primary dark:border-secondary border-[3px]">
            <a on:click={() => (hamIsOpen = false)} href="/{home}">Accueil</a>
        </li>
        <li class="w-4/6 py-2 flex flex-col items-center rounded-2xl border-primary dark:border-secondary border-[3px]">
            <a on:click={() => (hamIsOpen = false)} href="/{prono}">Pronostics</a>
        </li>
        <li class="w-4/6 py-2 flex flex-col items-center rounded-2xl border-primary dark:border-secondary border-[3px]">
            <a on:click={() => (hamIsOpen = false)} href="/ranking">Classement</a>
        </li>
        <li class="w-4/6 py-2 flex flex-col items-center rounded-2xl border-primary dark:border-secondary border-[3px]">
            <a on:click={() => (hamIsOpen = false)} href="/rules">Règles</a>
        </li>
        <div alt="night-light" on:click={toggleDarkMode}>
            <ThemeIcon style="hover:opacity-70 hover:cursor-pointer" color={$darkMode ? '#FBFFF1' : '#3C3744'} width={40} />
        </div>
    </ul>

    <div class="w-full h-full max-w-8xl px-3 flex flex-row justify-center m12:justify-between gap-5 items-center">
        <a href="/{home}" class="h-[50%] w-[50px] m8:w-[35px] hover:-rotate-12 duration-200" on:click={enableCurtain}>
            <FofoPronoLogo color={$darkMode ? '#FBFFF1' : '#3C3744'} />
        </a>
        <nav class="flex flex-row items-center justify-center w-full h-[90%] m12:w-auto">
            <ul class="flex flex-row justify-between w-full gap-5 h-full items-center">
                <div class="flex flex-row gap-5 h-full items-center m12:hidden">
                    <li class="hover:translate-y-2 duration-200">
                        <a class="bg-primary dark:bg-secondary rounded-2xl px-5 py-2" on:click={disableCurtain} href="/{home}">Accueil</a>
                    </li>
                    <li class="hover:translate-y-2 duration-200">
                        <a class="bg-primary dark:bg-secondary rounded-2xl px-5 py-2" href="/{prono}">Pronostics</a>
                    </li>
                    <li class="hover:translate-y-2 duration-200">
                        <a class="bg-primary dark:bg-secondary rounded-2xl px-5 py-2" href="/ranking">Classement</a>
                    </li>
                    <li class="hover:translate-y-2 duration-200">
                        <a class="bg-primary dark:bg-secondary rounded-2xl px-5 py-2" href="/rules">Règles</a>
                    </li>
                </div>
                <div class="text-primary dark:text-secondary text-xl flex flex-row items-center gap-5">
                    <div alt="night-light" on:click={toggleDarkMode}>
                        <ThemeIcon style="hover:opacity-70 hover:cursor-pointer m12:hidden" color={$darkMode ? '#FBFFF1' : '#3C3744'} width={40} />
                    </div>
                    <li class="flex flex-row items-center gap-6">
                        {#if $session.data}
                            <p class="px-2 font-bold text-4xl border-[3px] rounded-xl border-primary dark:border-secondary shadow-xl w-min max-w-lg m12:max-w-[185px] m12:text-xl truncate text-center">
                                {$session.data}
                            </p>
                            <div alt="logout" on:click={showLogoutConfirm}>
                                <LogoutIcon style="hover:opacity-70 hover:cursor-pointer" color={$darkMode ? '#FBFFF1' : '#3C3744'} width={40} />
                            </div>
                        {:else}
                            <a class="px-2 hover:opacity-70 bg-primary dark:bg-secondary text-secondary dark:text-primary rounded-3xl py-2 px-5" on:click={() => (hamIsOpen = false)} href="/login">Connexion</a>
                        {/if}
                    </li>
                    <div class="select-none flex-col hidden m12:flex gap-2 h-full justify-center cursor-pointer" on:click={toggleHam}>
                        <hr
                            class={`bg-primary dark:bg-secondary h-1 rounded-full w-8 duration-500 ${hamIsOpen ? 'rotate-405 translate-y-3' : ''}`}
                            id="ham-hr-1" />
                        <hr
                            class={`bg-primary dark:bg-secondary h-1 rounded-full w-8 duration-500 ${hamIsOpen ? 'translate-x-4 opacity-0' : ''}`}
                            id="ham-hr-2" />
                        <hr
                            class={`bg-primary dark:bg-secondary h-1 rounded-full w-8 duration-500 ${hamIsOpen ? '-rotate-405 -translate-y-3' : ''}`}
                            id="ham-hr-3" />
                    </div>
                </div>
            </ul>
        </nav>
    </div>
</header>

{#if confirmLogout}
    <PopupConfirmLogout hideFunction={hideLogoutConfirm} />
{/if}
