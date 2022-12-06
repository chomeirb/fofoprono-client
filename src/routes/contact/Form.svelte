<script lang="ts">
	import { PUBLIC_API_URL } from '$env/static/public';
	import { session } from '../store';

	export let result: string;
	let submitting = false;

	let name: string = '';
	let mail: string = '';
	let message: string = '';

	const submit = async () => {
		if (!$session.data) {
			if (!(name && mail && message)) {
				result = 'Veuillez remplir tous les champs !';
				return;
			}
		} else {
			if (!message) {
				result = 'Veuillez saisir un message !';
				return;
			}
		}

		submitting = true;

		try {
			const body = JSON.stringify([name, mail, message]);
			const res = await fetch(`${PUBLIC_API_URL}/contact`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: body
			});

			if (res.ok) {
				result = 'Votre message a été transmis, il sera traité dès que possible, merci&nbsp;!';
			} else {
				result = 'Une erreur est survenue, veuillez réessayer !';
			}
		} catch (err) {
			result = 'Une erreur est survenue !';
		}

		submitting = false;
	};
</script>

<form class="flex w-full flex-col text-primary m8:h-full" on:submit|preventDefault={submit} on:input={() => (result = '')}>
	{#if !$session.data}
		<div class="mb-5 flex flex-row gap-5 m8:flex-col">
			<div class="flex w-full flex-col justify-start">
				<p class="font-bold text-primary dark:text-secondary">Nom</p>
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
		</div>
	{/if}
	<div class="flex w-full flex-col justify-between gap-5 m8:h-full">
		<div class="flex flex-col m8:h-full">
			<p class="font-bold text-primary dark:text-secondary">Message</p>
			<div class="flex-rox flex rounded border border-primary shadow-lg dark:border-secondary m8:h-full">
				<textarea type="text" class="h-40 w-full bg-primary bg-opacity-20 px-2 dark:bg-white dark:bg-opacity-10 dark:text-secondary m8:h-full " bind:value={message} />
			</div>
		</div>
		<div class="flex w-full flex-col items-center">
			<button type="submit" class="button m12:w-5/6">{submitting ? 'Envoie...' : 'Envoyer ➔'} </button>
		</div>
	</div>
</form>
