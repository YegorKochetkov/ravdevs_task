<script lang="ts">
	import ProgressBar from '$lib/progressBar.svelte';
	import { SvelteToast } from '@zerodevx/svelte-toast';

	import type { LayoutData } from './$types';
	import { steps } from '../../hooks.client';

	export let data: LayoutData;

	$: currStepIndex =
		steps.findIndex((step) => step === data.stepFromParams) || 0;

	const options = {
		duration: 4000,
		intro: { y: -50 }
	};
</script>

<div class="toast">
	<SvelteToast {options} />
</div>
<main class="main">
	<div class="container">
		<ProgressBar {steps} activeStep={currStepIndex} />

		<div class="form-container">
			<slot />
		</div>
	</div>
</main>

<style lang="scss">
	* {
		box-sizing: border-box;
	}

	:global(body) {
		margin: 0;
	}

	.main {
		display: grid;
		place-items: center;

		height: 100vh;
		margin: 0;

		overflow: hidden;

		& .container {
			display: flex;
			flex-direction: column;

			width: 100%;
			max-width: 30rem;
			min-width: fit-content;

			& .form-container {
				display: flex;
				flex-direction: column;

				min-width: fit-content;
				padding: 2rem 1rem;

				background-color: #fff;
				border-radius: 10px;
				box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.1);

				text-align: center;
			}
		}
	}

	.toast {
		display: contents;
		--toastContainerLeft: calc(50% - var(--toastWidth) / 2);
		--toastWidth: 16rem;
		--toastBackground: #ffc7c7;
		--toastColor: #000;
		font-size: larger;
	}
</style>
