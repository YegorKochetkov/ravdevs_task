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
