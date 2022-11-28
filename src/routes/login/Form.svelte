<script>
	import { PUBLIC_API_URL } from '$env/static/public';

	export let result;
	let submitting = false;

	let id = '';
	let password = '';

	const submit = async () => {
		if (!(id && password)) {
			result = 'Veuillez remplir tous les champs !';
			return;
		}

		submitting = true;

		try {
			const body = JSON.stringify([id, password]);
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
		<input autocomplete="username" type="text" class="h-10 w-full rounded border px-2 shadow-lg" bind:value={id} />
	</div>
	<div class="flex w-full flex-col justify-start">
		<p class="font-bold text-primary dark:text-secondary">Mot de passe</p>
		<input autocomplete="current-password" type="password" class="h-10 w-full rounded border px-2 shadow-lg" bind:value={password} />
	</div>
	<div class="mt-5 flex w-full flex-col items-center gap-5">
		<input
			type="submit"
			class="rounded-3xl bg-primary px-5 py-2 text-secondary shadow-xl duration-200 hover:translate-x-6 hover:cursor-pointer dark:bg-secondary dark:text-primary m12:w-5/6"
			value={submitting ? 'Connexion...' : 'Connexion ➔'} />
	</div>
</form>
