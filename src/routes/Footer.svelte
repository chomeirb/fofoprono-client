<script>
	import DiscordIcon from './components/icons/Discord.svelte';
	import GitHubIcon from './components/icons/GitHub.svelte';
	import ChomeirbIcon from './components/icons/Chomeirb.svelte';
</script>

<div class="flex h-[90px] m12:pt-20 m12:h-min w-full flex-row items-center justify-around text-primary shadow-top m12:shadow-none dark:text-secondary m12:flex-col m12:gap-5">
	<div class="m12:text-xl m6:text-lg flex flex-row items-center justify-end m8:w-full m8:justify-center m8:text-center m6:flex-col">
		<div class="flex flex-row">
			<p>© 2022&nbsp;</p>
			<a href="https://github.com/fboitel" class="underline" target="_blank" rel="noreferrer">fboitel</a>/<a href="https://github.com/canleskis" class="underline" target="_blank" rel="noreferrer"
				>canleskis</a
			>/<a href="https://github.com/theogom" class="underline" target="_blank" rel="noreferrer">theogom</a>.&nbsp;
		</div>
		<p>All Rights Reserved.</p>
	</div>
	<div class="flex flex-row items-center justify-start gap-6">
		<a class="group" href="https://discord.gg/Derk9YVE" title="Rejoingnez-nous sur discord !" alt="discord" target="_blank" rel="noreferrer">
			<DiscordIcon style="group-hover:-translate-y-1 duration-100" width={40} />
		</a>
		<div class="flex flex-row items-center justify-start gap-x-px">
			<a class="group" href="https://github.com/chomeirb/fofoprono-server" title="Code source du serveur" alt="github back" target="_blank" rel="noreferrer">
				<GitHubIcon style="group-hover:-translate-y-1 duration-100" width={18} viewBox="0 0 12 24" />
			</a>
			<a class="group" href="https://github.com/chomeirb/fofoprono-client" title="Code source du client" alt="github front" target="_blank" rel="noreferrer">
				<GitHubIcon style="group-hover:-translate-y-1 duration-100" width={18} viewBox="12 0 12 24" />
			</a>
		</div>
		<a class="group" href="https://www.chomeirb.com" title="Chomeirb Corp." alt="chomeirb" target="_blank" rel="noreferrer">
			<ChomeirbIcon style="group-hover:-translate-y-1 duration-100" width={60} />
		</a>
	</div>
</div>
