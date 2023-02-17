import { describe, expect, it } from "vitest";
import { sortString } from "./tasks/tasks";

describe('sort string', () => {
	it('should return empty string for empty input', () => {
		expect(sortString('')).toBe('');
	});

	it('sorts string by number in the word', () => {
		expect(sortString('g5et ski3lls on6 use1 your2 to4 7top')).toBe(
			'use1 your2 ski3lls to4 g5et on6 7top'
		);
		expect(sortString('practic3 h4rder yo1u 2hould')).toBe(
			'yo1u 2hould practic3 h4rder'
		);
	});
});
