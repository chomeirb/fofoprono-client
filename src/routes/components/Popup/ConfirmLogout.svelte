<script lang="ts">
    import { PUBLIC_API_URL } from "$env/static/public";
    import { fetchLoggedIn } from "../../../routes/store";


    export let hideFunction: () => void;

  const logout = async () => {
    try {
      const res = await fetch(`${PUBLIC_API_URL}/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      if (res.ok) {
        fetchLoggedIn.set(false);
        window.location.href = '/home';
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




<div id="window" class="z-50 w-[100vw] h-[100vh] fixed text-3xl m12:text-xl text-secondary bg-primary bg-opacity-50 flex flex-row items-center justify-center">
  <div id="popup" class="w-[50vw] m12:w-[90vw] h-[30vh] p-10 m12:p-3 text-center bg-primary flex flex-col justify-around bg-opacity-100 border rounded shadow-xl">
    <p>
      Êtes-vous sûr de vouloir vous déconnecter ?
    </p>
    <div class="flex flex-row justify-between">
      <button class="bg-secondary text-primary rounded p-2 m-2 w-60 hover:opacity-60" on:click={logout}>Oui</button>
      <button class="bg-secondary text-primary rounded p-2 m-2 w-60 hover:opacity-60" on:click={hideFunction}>Annuler</button>
    </div>
  </div>
</div>