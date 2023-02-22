<script lang="ts">
	import type { Order } from '../hooks.client';

	export let info;
	const form = { ...info } satisfies Order;
	$: car = form.data.carBrand + ' ' + form.data.carModel;
	$: fullname = form.data.firstName + ' ' + form.data.lastName;
	const random = Math.random() < 0.5;
</script>

<div class="info">
	{#if random}
		<p>
			<span>Car brand:</span>
			{form.data.carBrand}
		</p>
		<p>
			<span>Car model:</span>
			{form.data.carModel}
		</p>
		<p>
			<span>First name:</span>
			{form.data.firstName}
		</p>
		<p>
			<span>Last name:</span>
			{form.data.lastName}
		</p>
	{:else}
		<p>
			<span>Car:</span>
			{car}
		</p>
		<p>
			<span>Fullname:</span>
			{fullname}
		</p>
	{/if}
	<p>
		<span>Zip code:</span>
		{form.data.zipCode}
	</p>
	<p>
		<span>First registration:</span>
		{form.data.firstRegistration}
	</p>
</div>

<style lang="scss">
	.info {
		display: flex;
		flex-direction: column;
		justify-content: center;

		margin: 0 3rem;

		& p {
			width: fit-content;
			font-size: large;
		}

		& span {
			font-weight: bolder;
		}
	}
</style>
