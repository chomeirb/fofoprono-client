<script lang="ts">
	import FofoPronoLogo from './components/icons/Fofoprono.svelte';
	import { session } from './store';
	import LogoutIcon from './components/icons/Logout.svelte';
	import ThemeIcon from './components/icons/Theme.svelte';
	import PopupConfirmLogout from './components/Popup/ConfirmLogout.svelte';
	import Footer from './Footer.svelte';

	let hamIsOpen = false;
	let confirmLogout = false;

	function toggleDarkMode() {
		if (document.documentElement.classList.contains('dark')) {
			localStorage.theme = 'light';
			document.documentElement.classList.remove('dark');
		} else {
			localStorage.theme = 'dark';
			document.documentElement.classList.add('dark');
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
</script>

<header class="flex h-[90px] w-full flex-row justify-center text-3xl text-secondary shadow-lg dark:text-primary m8:h-[60px]">
	<div class="flex h-full w-full max-w-8xl flex-row items-center justify-center gap-5 px-3 m12:justify-between">
		<a href="/prono" class="h-[50%] w-[50px] duration-200 hover:-rotate-12 m8:w-[35px]">
			<FofoPronoLogo />
		</a>
		<nav class="flex h-[90%] w-full flex-row items-center justify-center m12:w-auto">
			<ul class="flex h-full w-full flex-row items-center justify-between gap-5 dark:text-secondary">
				<div class="flex h-full flex-row items-center gap-5 m12:hidden">
					<li>
						<a class="button" href="/prono">Pronostics</a>
					</li>
					<li>
						<a class="button" href="/ranking">Classement</a>
					</li>
					<li>
						<a class="button" href="/rules">Règles</a>
					</li>
					<li>
						<a class="button" href="/contact">Contact</a>
					</li>
				</div>
				<div class="flex flex-row items-center gap-5 text-xl text-primary dark:text-secondary">
					<button alt="night-light" on:click={toggleDarkMode}>
						<ThemeIcon style="hover:opacity-70 hover:cursor-pointer m12:hidden" width={40} />
					</button>
					<li class="flex flex-row items-center gap-6">
						{#if $session.data}
							<p class="w-min max-w-lg truncate rounded-xl border-[3px] border-primary px-2 text-center text-4xl font-bold shadow-xl dark:border-secondary m12:max-w-[185px] m12:text-xl">
								{$session.data}
							</p>
							<button class="hover:opacity-70" alt="logout" on:click={showLogoutConfirm}>
								<LogoutIcon width={40} />
							</button>
						{:else}
							<a class="button" on:click={() => (hamIsOpen = false)} href="/login">Connexion</a>
						{/if}
					</li>
					<button class="hidden h-full cursor-pointer select-none flex-col justify-center gap-2 m12:flex" on:click={toggleHam}>
						<hr class={`h-1 w-8 rounded-full bg-primary duration-500 dark:bg-secondary ${hamIsOpen ? 'translate-y-3 rotate-405' : ''}`} id="ham-hr-1" />
						<hr class={`h-1 w-8 rounded-full bg-primary duration-500 dark:bg-secondary ${hamIsOpen ? 'translate-x-4 opacity-0' : ''}`} id="ham-hr-2" />
						<hr class={`h-1 w-8 rounded-full bg-primary duration-500 dark:bg-secondary ${hamIsOpen ? '-translate-y-3 -rotate-405' : ''}`} id="ham-hr-3" />
					</button>
				</div>
			</ul>
		</nav>
	</div>
	<ul
		class={`fixed z-40 hidden w-[100vw] flex-col items-center justify-center gap-10 overflow-y-auto bg-secondary text-primary shadow-in duration-500 dark:bg-primary dark:text-secondary m12:flex top-[90px] m8:top-[60px] h-[calc(100%_-_60px)] ${
			!hamIsOpen ? 'translate-x-[100vw]' : ''
		}`}>
		<li class="button flex w-4/6 flex-col items-center hover:cursor-pointer">
			<a on:click={() => (hamIsOpen = false)} href="/prono">Pronostics</a>
		</li>
		<li class="button flex w-4/6 flex-col items-center hover:cursor-pointer">
			<a on:click={() => (hamIsOpen = false)} href="/ranking">Classement</a>
		</li>
		<li class="button flex w-4/6 flex-col items-center hover:cursor-pointer">
			<a on:click={() => (hamIsOpen = false)} href="/rules">Règles</a>
		</li>
		<li class="button flex w-4/6 flex-col items-center hover:cursor-pointer">
			<a on:click={() => (hamIsOpen = false)} href="/contact">Contact</a>
		</li>
		<button alt="night-light" on:click={toggleDarkMode}>
			<ThemeIcon style="hover:opacity-70 hover:cursor-pointer" width={40} />
		</button>
		<div>
			<Footer />
		</div>
	</ul>
</header>

{#if confirmLogout}
	<PopupConfirmLogout hideFunction={hideLogoutConfirm} />
{/if}
