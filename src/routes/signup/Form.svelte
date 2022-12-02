<script lang="ts">
	import { PUBLIC_API_URL } from '$env/static/public';
	import { element } from 'svelte/internal';
	import ClosedEye from '../components/icons/ClosedEye.svelte';
	import OpenedEye from '../components/icons/OpenedEye.svelte';

	export let result;
	let submitting = false;

	let name: string = '';
	let mail: string = '';
	let password: string = '';
	let showPassword: boolean = false;

	$: showPassword ? document.getElementById('password')?.setAttribute('type', 'text') : document.getElementById('password')?.setAttribute('type', 'password');

	const submit = async () => {
		if (!(name && mail && password)) {
			result = 'Veuillez remplir tous les champs !';
			return;
		}

		submitting = true;

		try {
			const body = JSON.stringify({ name, mail, password });
			const res = await fetch(`${PUBLIC_API_URL}/signup`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: body
			});

			if (res.ok) {
				result = 'Un lien de vérification a été envoyé à votre adresse mail !';
			} else {
				result = 'Une erreur est survenue, veuillez réessayer !';
			}
		} catch (err) {
			result = 'Une erreur est survenue !';
		}

		submitting = false;
	};
</script>

<form class="flex flex-col gap-5 text-primary" on:submit|preventDefault={submit} on:input={() => (result = '')}>
	<div class="flex w-full flex-col justify-start">
		<p class="font-bold text-primary dark:text-secondary">Pseudo</p>
		<input
			autocomplete="username"
			type="text"
			class="h-10 w-full rounded border border-primary bg-primary bg-opacity-20 px-2 shadow-lg dark:border-secondary dark:bg-white dark:bg-opacity-10 dark:text-secondary "
			bind:value={name} />
	</div>
	<div class="flex w-full flex-col justify-start">
		<p class="font-bold text-primary dark:text-secondary">Email</p>
		<input
			autocomplete="email"
			type="email"
			class="h-10 w-full rounded border border-primary bg-primary bg-opacity-20 px-2 shadow-lg dark:border-secondary dark:bg-white dark:bg-opacity-10 dark:text-secondary "
			bind:value={mail} />
	</div>
	<div class="flex w-full flex-col justify-start">
		<p class="font-bold text-primary dark:text-secondary">Mot de passe</p>
		<div class="flex-rox flex rounded border border-primary shadow-lg dark:border-secondary">
			<input autocomplete="new-password" type="password" id="password" class="h-10 w-full bg-primary bg-opacity-20 px-2 dark:bg-white dark:bg-opacity-10 dark:text-secondary " bind:value={password} />
			<button
				type="button"
				class="bg-primary bg-opacity-20 px-1 duration-200 hover:shadow-in dark:bg-white dark:bg-opacity-10 dark:text-secondary"
				on:click={() => {
					showPassword = !showPassword;
				}}>
				{#if !showPassword}
					<ClosedEye width={30} />
				{:else}
					<OpenedEye width={30} />
				{/if}
			</button>
		</div>
	</div>
	<div class="mt-5 flex w-full flex-col items-center gap-5">
		<input
			type="submit"
			class="rounded-3xl bg-primary bg-opacity-20 px-5 py-2 text-primary duration-200 hover:translate-x-6 hover:cursor-pointer dark:bg-secondary dark:bg-opacity-20 dark:text-secondary m12:w-5/6"
			value={submitting ? 'Envoie...' : "M'inscrire ➔"} />
	</div>
</form>
