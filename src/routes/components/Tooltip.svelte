<script lang="ts">
	// This is just here to show how it could be used in any component
	// with zero dependency once the styles are in your stylesheet

	export let tooltip: string = 'false'; // prevent blank tooltips
</script>

<div data-tooltip-bottom={tooltip}>
	<slot />
</div>
