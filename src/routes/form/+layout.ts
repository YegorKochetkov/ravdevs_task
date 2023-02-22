import type { LayoutLoad } from './$types';

export const load = (({ params }) => {
	const stepFromParams = params.step;

	return { stepFromParams };
}) satisfies LayoutLoad;
