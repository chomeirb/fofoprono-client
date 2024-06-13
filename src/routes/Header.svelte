<script lang="ts">
	import FofoPronoLogo from './components/icons/Fofoprono.svelte';
	import { session, competitions, selected_competition } from './store';
	import LogoutIcon from './components/icons/Logout.svelte';
	import ThemeIcon from './components/icons/Theme.svelte';
	import PopupConfirmLogout from './components/Popup/ConfirmLogout.svelte';
	import Footer from './Footer.svelte';
	import { browser } from '$app/environment';

	let hamIsOpen = false;
	let confirmLogout = false;

	if ($competitions.data.length > 0) {
		selected_competition.set(parseInt(localStorage.competition) || lastCompetition());
		selected_competition.subscribe((value) => {
			if (browser && value) {
				localStorage.setItem('competition', value.toString());
			}
		});
	}

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

	function lastCompetition() {
		const data = $competitions.data;
		return data[data.length - 1]?.id;
	}
</script>

<header class="flex h-[90px] w-full flex-row justify-center text-3xl text-secondary shadow-lg dark:text-primary m8:h-[60px] overflow-hidden">
	<div class="flex h-full w-full max-w-8xl flex-row items-center justify-center gap-5 px-3 m12:justify-between">
		<a href="/prono" class="h-[50%] w-[50px] duration-200 hover:-rotate-12 m8:w-[35px]">
			<FofoPronoLogo />
		</a>
		<nav class="flex h-[90%] w-full flex-row items-center justify-center m12:w-auto">
			<ul class="flex h-full w-full flex-row items-center justify-between gap-5 dark:text-secondary">
				<div class="box-border flex h-full flex-row items-center gap-5 m12:hidden">
					<li>
						<select class="button inline-block h-14 w-[200px] truncate" name="competition" id="" bind:value={$selected_competition}>
							{#each $competitions.data as competition}
								<option class="dark:bg-primary" value={competition.id}>{competition.name}</option>
							{/each}
						</select>
					</li>
					<li>
						<a class="button inline-block h-14" href="/prono">Pronostics</a>
					</li>
					<li>
						<a class="button inline-block h-14" href="/ranking">Classement</a>
					</li>
					<li>
						<a class="button inline-block h-14" href="/rules">Règles</a>
					</li>
					<li>
						<a class="button inline-block h-14" href="/contact">Contact</a>
					</li>
				</div>
				<div class="flex flex-row items-center gap-5 text-xl text-primary dark:text-secondary">
					<button on:click={toggleDarkMode}>
						<ThemeIcon style="hover:opacity-70 m12:hidden" width={40} />
					</button>
					<li class="flex flex-row items-center gap-6">
						{#if $session.data}
							<p class="w-min max-w-lg truncate rounded-xl border-[3px] border-primary px-2 text-center text-4xl font-bold shadow-xl dark:border-secondary m12:max-w-[185px] m12:text-xl">
								{$session.data}
							</p>
							<button class="hover:opacity-70" on:click={showLogoutConfirm}>
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
	<div
		class={`fixed top-[90px] z-40 hidden h-[calc(100%_-_60px)] w-[100vw] flex-col items-center 
        justify-between overflow-y-auto bg-secondary text-primary shadow-in duration-500 gap-1 py-8
        dark:bg-primary dark:text-secondary m12:flex m8:top-[60px] ${!hamIsOpen ? 'translate-x-[100vw]' : ''}`}>
		<!-- <div class="gap-10"> -->
		<!-- <li class=""> -->
		<select class="button inline-block h-14 w-4/6 truncate text-center" name="competition" id="" bind:value={$selected_competition}>
			{#each $competitions.data as competition}
				<option class="dark:bg-primary" value={competition.id}>{competition.name}</option>
			{/each}
		</select>
		<a class="button inline-block h-14 w-4/6 truncate text-center" on:click={() => (hamIsOpen = false)} href="/prono">Pronostics</a>
		<a class="button inline-block h-14 w-4/6 truncate text-center" on:click={() => (hamIsOpen = false)} href="/ranking">Classement</a>
		<a class="button inline-block h-14 w-4/6 truncate text-center" on:click={() => (hamIsOpen = false)} href="/rules">Règles</a>
		<a class="button inline-block h-14 w-4/6 truncate text-center" on:click={() => (hamIsOpen = false)} href="/contact">Contact</a>
		<button on:click={toggleDarkMode}>
			<ThemeIcon style="hover:opacity-70" width={40} />
		</button>
		<div>
			<Footer />
		</div>
	</div>
</header>

{#if confirmLogout}
	<PopupConfirmLogout hideFunction={hideLogoutConfirm} />
{/if}
