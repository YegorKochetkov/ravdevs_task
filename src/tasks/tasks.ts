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

export function nextBiggerNumber(n: number) {
	const digits = n.toString().split('');
	let firstDescDigitIndex = -1;
	let smallestDigitGreaterFirstDescDigitIndex = -1;

	if (digits.length === 1) return -1;

	for (let i = digits.length - 1; i >= 0; i--) {
		if (digits[i] > digits[i - 1]) {
			firstDescDigitIndex = i - 1;
			break;
		}
	}

	if (firstDescDigitIndex < 0) {
		return -1;
	}

	for (let j = digits.length - 1; j > firstDescDigitIndex; j--) {
		if (digits[j] > digits[firstDescDigitIndex]) {
			smallestDigitGreaterFirstDescDigitIndex = j;

			const temp = digits[smallestDigitGreaterFirstDescDigitIndex];
			digits[j] = digits[firstDescDigitIndex];
			digits[firstDescDigitIndex] = temp;
			break;
		}
	}

	const tail = digits.slice(firstDescDigitIndex + 1).reverse();
	digits.splice(firstDescDigitIndex + 1, tail.length, ...tail);

	return +digits.join('');
}
