<script>
    import discordLogo from '$lib/images/discord.png';
    import discordLogoDark from '$lib/images/discord-dark.png';
    import githubFrontLogo from '$lib/images/github-front.png';
    import githubFrontLogoDark from '$lib/images/github-front-dark.png';
    import githubBackLogo from '$lib/images/github-back.png';
    import githubBackLogoDark from '$lib/images/github-back-dark.png';
    import chomeirbLogo from '$lib/images/chomeirb-logo.svg';
    import { darkMode } from './store';
</script>

<div class="flex flex-row m8:flex-col items-center justify-around h-[90px] text-primary dark:text-secondary shadow-top w-full">
    <div class="m8:w-full flex flex-row justify-end m8:justify-center m8:text-center m6:flex-col items-center">
        <div class="flex flex-row">
            <p>© 2022&nbsp;</p>
            <a href="https://github.com/fboitel" class="underline" target="_blank">fboitel</a>/<a
                href="https://github.com/canleskis"
                class="underline"
                target="_blank">canleskis</a
            >/<a href="https://github.com/theogom" class="underline" target="_blank">theogom</a>.&nbsp;
        </div>
        <p>All Rights Reserved.</p>
    </div>
    <div class="flex flex-row justify-start items-center">
        <a href="https://discord.gg/Derk9YVE" class="hover:-translate-y-1 duration-100" title="Rejoingnez-nous sur discord !" target="_blank">
            <img src={$darkMode ? discordLogoDark : discordLogo} alt="discord" class="h-8 m8:h-6" />
        </a>
        <a href="https://github.com/chomeirb/fofoprono-server" class="ml-5 hover:-translate-y-1 duration-100" title="Code source du serveur" target="_blank">
            <img src={$darkMode ? githubBackLogoDark : githubBackLogo} alt="github back" class="h-8 m8:h-6" />
        </a>
        <a href="https://github.com/chomeirb/fofoprono-client" class="ml-[1px] hover:-translate-y-1 duration-100" title="Code source du client" target="_blank">
            <img src={$darkMode ? githubFrontLogoDark : githubFrontLogo} alt="github front" class="h-8 m8:h-6" />
        </a>
        <a href="https://www.chomeirb.com" class="ml-5 hover:-translate-y-1 duration-100" title="Chomeirb Corp." target="_blank">
            <img src={chomeirbLogo} alt="chomeirb" class="h-8 m8:h-6 m3:h-8" />
        </a>
    </div>
</div>
