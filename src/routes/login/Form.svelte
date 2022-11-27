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
                    'Content-Type': 'application/json',
                },
                body: body,
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
    <div class="flex flex-col justify-start w-full">
        <p class="font-bold dark:text-secondary text-primary">Pseudo ou adresse email</p>
        <input autocomplete="username" type="text" class="w-full h-10 shadow-lg border rounded px-2" bind:value={id} />
    </div>
    <div class="flex flex-col justify-start w-full">
        <p class="font-bold dark:text-secondary text-primary">Mot de passe</p>
        <input autocomplete="current-password" type="password" class="w-full h-10 shadow-lg border rounded px-2" bind:value={password} />
    </div>
    <div class="flex flex-col items-center w-full gap-5 mt-5">
        <input
            type="submit"
            class="bg-primary dark:bg-secondary text-secondary dark:text-primary px-5 py-2 shadow-xl rounded-3xl m12:w-5/6 hover:translate-x-6 hover:cursor-pointer duration-200"
            value={submitting ? 'Connexion...' : 'Connexion ➔'} />
    </div>
</form>
