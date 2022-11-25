<script>
    import { darkMode } from './store';
    import DiscordIcon from './components/icons/Discord.svelte';
    import GitHubIcon from './components/icons/GitHub.svelte';
    import ChomeirbIcon from './components/icons/Chomeirb.svelte';
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
    <div class="flex flex-row justify-start items-center gap-6">
        <a class="group" href="https://discord.gg/Derk9YVE" title="Rejoingnez-nous sur discord !" alt="discord" target="_blank">
            <DiscordIcon style="group-hover:-translate-y-1 duration-100" color={$darkMode ? '#FBFFF1' : '#3C3744'} width={40} />
        </a>
        <div class="flex flex-row justify-start items-center gap-x-px">
            <a class="group" href="https://github.com/chomeirb/fofoprono-server" title="Code source du serveur" alt="github back" target="_blank">
                <GitHubIcon style="group-hover:-translate-y-1 duration-100" color={$darkMode ? '#FBFFF1' : '#3C3744'} width={18} viewBox="0 0 12 24" />
            </a>
            <a class="group" href="https://github.com/chomeirb/fofoprono-client" title="Code source du client" alt="github front" target="_blank">
                <GitHubIcon style="group-hover:-translate-y-1 duration-100" color={$darkMode ? '#FBFFF1' : '#3C3744'} width={18} viewBox="12 0 12 24" />
            </a>
        </div>
        <a class="group" href="https://www.chomeirb.com" title="Chomeirb Corp." alt="chomeirb" target="_blank">
            <ChomeirbIcon style="group-hover:-translate-y-1 duration-100" width={60} />
        </a>
    </div>
</div>
