<script lang="ts">
	import { PUBLIC_API_URL } from '$env/static/public';

	export let hideFunction: () => void;

	const logout = async () => {
		try {
			const res = await fetch(`${PUBLIC_API_URL}/logout`, {
				method: 'POST',
				credentials: 'include'
			});

			if (res.ok) {
				window.location.href = '/prono';
			}
		} catch (err) {
			console.error(err);
		}
	};

	// add a listener to the window to close the popup if the user clicks outside of it
	window.addEventListener('click', (e) => {
		if (e.target === document.getElementById('window') && e.target !== document.getElementById('popup')) {
			hideFunction();
		}
	});
</script>

<div id="window" class="fixed bottom-0 left-0 z-50 flex h-[100vh] w-[100vw] flex-row items-center justify-center bg-primary bg-opacity-50 text-3xl text-secondary m12:text-xl">
	<div
		id="popup"
		class="flex gap-20 mx-4 flex-col justify-between rounded-3xl border-4 border-primary bg-secondary bg-opacity-100 p-10 text-center text-primary shadow-xl dark:border-secondary dark:bg-primary dark:text-secondary">
		<p>Êtes-vous sûr de vouloir vous déconnecter&nbsp;?</p>
		<div class="flex flex-row justify-between">
			<button class="button" on:click={logout}>Oui</button>
			<button class="button" on:click={hideFunction}>Annuler</button>
		</div>
	</div>
</div>
