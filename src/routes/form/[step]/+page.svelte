<script lang="ts">
	import InputField from '$lib/inputField.svelte';
	import OrderInfo from '$lib/orderInfo.svelte';
	import { toast } from '@zerodevx/svelte-toast';
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	import { steps, useFormValidation, type Order } from '../../../hooks.client';

	const formData = {
		id: '',
		carBrand: '',
		zipCode: '',
		firstName: '',
		lastName: '',
		carModel: '',
		firstRegistration: ''
	};

	export let data: PageData;

	$: stepFromParams = data.stepFromParams || steps[0];
	$: currStepIndex = steps.findIndex((step) => step === stepFromParams);
	let form = useFormValidation({}, stepFromParams);

	const handleProgress = (stepIncrement: number) => {
		form = useFormValidation(formData, steps[currStepIndex]);

		if (form.success) {
			currStepIndex += stepIncrement;
			goto(`/form/${steps[currStepIndex]}`);
		} else if (stepIncrement < 0) {
			currStepIndex += stepIncrement;
			goto(`/form/${steps[currStepIndex]}`);
		} else {
			toast.push(form.error.issues[0].message);
		}
	};
</script>

<form class="form" on:submit|preventDefault>
	{#if steps[currStepIndex] === steps[0]}
		<InputField
			label={'Car brand*'}
			name="carBrand"
			type="text"
			minlength="1"
			maxlength="64"
			bind:value={formData.carBrand}
			placeholder="Nissan"
			required
		/>
		<InputField
			label={'Zip code*'}
			name="zipCode"
			type="text"
			minlength="5"
			maxlength="5"
			pattern="^[0-9]+$"
			aria-label="5-digit postal code"
			title="5-digit postal code"
			bind:value={formData.zipCode}
			placeholder="61000"
			required
		/>
	{/if}
	{#if steps[currStepIndex] === steps[1]}
		<InputField
			label={'First name*'}
			name="firstName"
			type="text"
			minlength="1"
			maxlength="64"
			bind:value={formData.firstName}
			placeholder="John"
			required
		/>
		<InputField
			label={'Last name*'}
			name="lastName"
			type="text"
			minlength="1"
			maxlength="64"
			bind:value={formData.lastName}
			placeholder="Doe"
			required
		/>
		<InputField
			label={'Car model*'}
			name="carModel"
			type="text"
			minlength="1"
			maxlength="64"
			bind:value={formData.carModel}
			placeholder="X-trail"
			required
		/>
		<fieldset class="fieldset">
			<legend>First registration?</legend>
			<label>
				<input
					name="firstRegistration*"
					type="radio"
					value="true"
					bind:group={formData.firstRegistration}
					required
					checked={formData.firstRegistration === 'true'}
				/>
				Yes
			</label>
			<label>
				<input
					name="firstRegistration"
					type="radio"
					value="false"
					bind:group={formData.firstRegistration}
					required
					checked={formData.firstRegistration === 'false'}
				/>
				No
			</label>
		</fieldset>
	{/if}
	{#if steps[currStepIndex] === steps[steps.length - 1]}
		<OrderInfo info={form} />
	{/if}

	<div class="steps-button">
		<button
			class="btn"
			on:click={() => handleProgress(-1)}
			disabled={currStepIndex === 0}
		>
			Prev
		</button>

		<button
			class="btn"
			on:click={() => handleProgress(1)}
			disabled={currStepIndex === steps.length - 1}
		>
			Next
		</button>
	</div>
</form>

<style lang="scss">
	.form {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.fieldset {
		text-align: left;
		border-radius: 0.25rem;
	}

	.btn {
		display: inline-block;
		width: 100%;
		padding: 0.5rem 0;
		margin-top: 0.5rem;

		font-family: inherit;
		font-size: 14px;

		background-color: #3498db;
		color: #fff;

		border: 0;
		border-radius: 0.25rem;

		cursor: pointer;

		&:active {
			transform: scale(0.98);
		}

		&:disabled {
			background-color: #e0e0e0;
			cursor: not-allowed;
		}
	}

	.steps-button {
		margin-top: 1rem;
		text-align: center;
	}
</style>
