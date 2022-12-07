<script lang="ts">
	import { PUBLIC_API_URL } from '$env/static/public';
	import ClosedEye from '../components/icons/ClosedEye.svelte';
	import OpenedEye from '../components/icons/OpenedEye.svelte';

	export let result;
	let submitting = false;

	let id = '';
	let password = '';

	let showPassword: boolean = false;

	$: showPassword ? document.getElementById('password')?.setAttribute('type', 'text') : document.getElementById('password')?.setAttribute('type', 'password');

	const submit = async () => {
		if (!(id && password)) {
			result = 'Veuillez remplir tous les champs !';
			return;
		}

		submitting = true;

		try {
			const body = JSON.stringify([id.trim(), password]);
			const res = await fetch(`${PUBLIC_API_URL}/login`, {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				},
				body: body
			});

			if (res.ok) {
				window.location.href = '/prono';
			} else {
				result = 'Mot de passe ou pseudo incorrect !';
			}
		} catch (err) {
			result = 'Une erreur est survenue !';
		}

		submitting = false;
	};
</script>

<form class="flex flex-col gap-5 text-primary" on:submit|preventDefault={submit} on:input={() => (result = '')}>
	<div class="flex w-full flex-col justify-start">
		<p class="font-bold text-primary dark:text-secondary">Pseudo ou adresse email</p>
		<input
			autocomplete="username"
			type="text"
			class="h-10 w-full rounded border border-primary bg-primary bg-opacity-20 px-2 shadow-lg dark:border-secondary dark:bg-white dark:bg-opacity-10 dark:text-secondary"
			bind:value={id} />
	</div>
	<div class="flex w-full flex-col justify-start">
		<p class="font-bold text-primary dark:text-secondary">Mot de passe</p>
		<div class="flex-rox flex rounded border border-primary shadow-lg dark:border-secondary">
			<input
				autocomplete="current-password"
				type="password"
				id="password"
				class="h-10 w-full bg-primary bg-opacity-20 px-2 dark:bg-white dark:bg-opacity-10 dark:text-secondary "
				bind:value={password} />
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
			class="button"
			value={submitting ? 'Connexion...' : 'Connexion ➔'} />
	</div>
</form>
