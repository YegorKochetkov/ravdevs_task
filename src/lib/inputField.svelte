<script lang="ts">
	export let value: FormDataEntryValue | string | number;
	export let label: string;
</script>

<label class="label">
	<span>{label}:</span>
	<input class="input" bind:value {...$$restProps} />
</label>

<style lang="scss">
	.label {
		display: flex;
		flex-direction: column;
		text-align: left;
	}

	.input {
		display: block;
		padding: 0.5rem;
		margin-top: 0.5rem;
		border-width: 1px;
		border-radius: 0.25rem;
	}
</style>
