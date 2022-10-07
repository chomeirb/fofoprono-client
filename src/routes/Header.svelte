<script>
  import logo from '$lib/images/fplogo.png';
</script>


<header class="flex flex-row shadow-lg justify-center text-3xl text-col4 w-full h-[90px]">
  <div class="w-full h-full max-w-7xl flex flex-row justify-center gap-5 items-center">
    <a href="/home" class="h-[50%] hover:-rotate-12 duration-200">
      <img src={logo} alt="logo" class="h-full" />
    </a>
    <nav class="flex flex-row items-center justify-center w-full h-[90%]">
      <ul class="flex flex-row justify-between w-full gap-5 h-full items-center">
        <div class="flex flex-row gap-5 h-full items-center">
          <li class="hover:translate-y-2 duration-200">
            <a class="bg-col1 rounded px-5 py-2 hover:translate-y-10 duration-200" href="/home">Accueil</a>
          </li>
          <li class="hover:translate-y-2 duration-200">
            <a class="bg-col1 rounded px-5 py-2 hover:translate-y-10 duration-200" href="/prono">Pronostiques</a>
          </li>
          <li class="hover:translate-y-2 duration-200">
            <a class="bg-col1 rounded px-5 py-2" href="/standing">Classement</a>
          </li>
        </div>
        <div class="text-col1 text-xl underline flex flex-row">
          <li>
            <a class="px-2 hover:opacity-70" href="/home">Règles</a>
          </li>
          <li>
            <a class="px-2 hover:opacity-70" href="/home">Connexion/Inscription</a>
          </li>
        </div>
      </ul>
    </nav>
  </div>
</header>