<script>
	import DiscordIcon from './components/icons/Discord.svelte';
	import GitHubIcon from './components/icons/GitHub.svelte';
	import ChomeirbIcon from './components/icons/Chomeirb.svelte';
</script>

<div class="flex h-[90px] w-full flex-row items-center justify-around text-primary shadow-top dark:text-secondary m12:h-min m12:flex-col m12:gap-5 m12:shadow-none">
	<div class="flex flex-row items-center justify-end m12:text-xl m8:w-full m8:justify-center m8:text-center m6:flex-col m6:text-lg">
		<div class="flex flex-row">
			<p>© 2024&nbsp;</p>
			<a href="https://github.com/fboitel" class="underline" target="_blank" rel="noreferrer">fboitel</a>/<a href="https://github.com/canleskis" class="underline" target="_blank" rel="noreferrer"
				>canleskis</a
			>/<a href="https://github.com/theogom" class="underline" target="_blank" rel="noreferrer">theogom</a>.&nbsp;
		</div>
		<p>All Rights Reserved.</p>
	</div>
	<div class="flex flex-row items-center justify-start gap-6">
		<a class="group" href="https://discord.gg/Derk9YVE" title="Rejoingnez-nous sur discord !" target="_blank" rel="noreferrer">
			<DiscordIcon style="group-hover:-translate-y-1 duration-100" width={40} />
		</a>
		<div class="flex flex-row items-center justify-start gap-x-px">
			<a class="group" href="https://github.com/chomeirb/fofoprono-server" title="Code source du serveur" target="_blank" rel="noreferrer">
				<GitHubIcon style="group-hover:-translate-y-1 duration-100" width={18} viewBox="0 0 12 24" />
			</a>
			<a class="group" href="https://github.com/chomeirb/fofoprono-client" title="Code source du client" target="_blank" rel="noreferrer">
				<GitHubIcon style="group-hover:-translate-y-1 duration-100" width={18} viewBox="12 0 12 24" />
			</a>
		</div>
		<a class="group" href="https://www.chomeirb.com" title="Chomeirb Corp." target="_blank" rel="noreferrer">
			<ChomeirbIcon style="group-hover:-translate-y-1 duration-100" width={60} />
		</a>
	</div>
</div>
