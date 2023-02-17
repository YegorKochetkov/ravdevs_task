export function sortString(str: string) {
	const result = [];
	let word = '';
	let index = 0;

	for (const char of str) {
		if (char !== ' ' && !isNaN(+char)) {
			index = +char;
		}

		if (char === ' ') {
			result[index - 1] = word;
			word = '';
		} else {
			word += char;
		}
	}

	result[index - 1] = word;

	return result.join(' ');
}

export function queueTime(customers: number[], machines: number) {
	if (customers.length < 1) {
		return 0;
	}

	const queues = customers.slice(0, machines);
	const queue = customers.slice(machines);

	while (queue.length > 0) {
		const customer = queue.shift();

		queues.sort((a, b) => a - b);

		if (customer) {
			queues[0] += customer;
		}
	}

	return Math.max(...queues);
}
