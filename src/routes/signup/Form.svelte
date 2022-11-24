<script>
    import { PUBLIC_API_URL } from '$env/static/public';

    export let result;
    let submitting = false;

    let name = '';
    let mail = '';
    let password = '';

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
                    'Content-Type': 'application/json',
                },
                body: body,
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
    <div class="flex flex-col justify-start w-full">
        <p class="font-bold dark:text-secondary text-primary">Pseudo</p>
        <input autocomplete="username" type="text" class="w-full h-10 shadow-lg border rounded px-2" bind:value={name} />
    </div>
    <div class="flex flex-col justify-start w-full">
        <p class="font-bold dark:text-secondary text-primary">Email</p>
        <input autocomplete="email" type="email" class="w-full h-10 shadow-lg border rounded px-2" bind:value={mail} />
    </div>
    <div class="flex flex-col justify-start w-full">
        <p class="font-bold dark:text-secondary text-primary">Mot de passe</p>
        <input autocomplete="new-password" type="password" class="w-full h-10 shadow-lg border rounded px-2" bind:value={password} />
    </div>
    <div class="flex flex-col items-center w-full gap-5 mt-5">
        <input
            type="submit"
            class="bg-primary dark:bg-secondary text-secondary dark:text-primary px-5 py-2 shadow-xl rounded m12:w-5/6 hover:translate-x-6 hover:cursor-pointer duration-200"
            value={submitting ? 'Envoie...' : "M'inscrire ➔"} />
    </div>
</form>
