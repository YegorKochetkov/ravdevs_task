<script lang="ts">
	export let activeStep = 1;
	export let steps: string[];
</script>

<div class="progress-container">
	<div
		class="progress"
		style="width: {(activeStep / (steps.length - 1)) * 100 + '%'}"
	/>
	{#each steps as step, i}
		<div
			class="circle {i <= activeStep ? 'active' : ''}"
			data-title={step.split('_').join(' ')}
		>
			{i + 1}
		</div>
	{/each}
</div>

<style lang="scss">
	.progress-container {
		display: flex;
		justify-content: space-between;
		position: relative;

		margin-bottom: 2rem;
		min-width: fit-content;

		&::before {
			content: '';
			position: absolute;
			top: 50%;
			left: 0;

			height: 4px;
			width: 100%;

			background-color: #e0e0e0;

			transform: translateY(-50%);
			z-index: -1;
		}
	}

	.progress {
		position: absolute;
		top: 50%;
		left: 0;

		height: 4px;
		width: 0%;

		background-color: #3498db;

		transform: translateY(-50%);
		transition: 0.4s ease;
		z-index: -1;
	}

	.circle {
		display: flex;
		align-items: center;
		justify-content: center;

		height: 2rem;
		width: 2rem;

		background-color: #fff;
		color: #999;
		text-transform: capitalize;

		border-radius: 50%;
		border: 3px solid #e0e0e0;

		transition: 0.4s ease;

		&::after {
			content: attr(data-title) ' ';
			position: absolute;
			bottom: 3rem;

			color: #999;
			transition: 0.4s ease;
		}

		&.active::after {
			color: #3498db;
		}

		&.active {
			border-color: #3498db;
		}
	}
</style>
