import { describe, expect, it } from "vitest";
import { queueTime, sortString } from "./tasks";

describe('sort string by number in the word', () => {
	it('should return empty string for empty input', () => {
		expect(sortString('')).toBe('');
	});

	it('sorts string', () => {
		expect(sortString('g5et ski3lls on6 use1 your2 to4 7top')).toBe(
			'use1 your2 ski3lls to4 g5et on6 7top'
		);
		expect(sortString('practic3 h4rder yo1u 2hould')).toBe(
			'yo1u 2hould practic3 h4rder'
		);
	});
});

describe('calculate time required to serve a queue at the supermarket', () => {
	it('should return zero for no customers', () => {
		expect(queueTime([], 1)).toBe(0);
	});

	it('should return minutes for 1 self-checkout machine', () => {
		expect(queueTime([5, 3, 4], 1)).toBe(12);
		expect(
			queueTime(
				[26, 42, 13, 18, 48, 38, 39, 25, 39, 6, 35, 11, 7, 38, 19, 14],
				1
			)
		).toBe(418);
	});

	it('should return minutes for 2 self-checkout machines', () => {
		expect(queueTime([10, 2, 3, 3], 2)).toBe(10);
		expect(queueTime([10, 2, 30, 3], 2)).toBe(32);
	});

	it('should return minutes for multiple self-checkout machines', () => {
		expect(queueTime([19, 1, 27, 35, 16, 4, 45, 49, 41, 25], 5)).toBe(65);
		expect(
			queueTime(
				[
					34, 31, 40, 30, 48, 2, 19, 32, 37, 13, 30, 49, 3, 13, 12, 43, 39, 22,
					47
				],
				4
			)
		).toBe(162);
	});
});
