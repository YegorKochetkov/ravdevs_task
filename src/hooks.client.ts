import { z } from 'zod';

const carBrands = ['Audi', 'BMW', 'Nissan'];
const zipCodes = [65000, 66000, 67000, 68000];
export const steps = ['order_info', 'order_details', 'confirmation'];

const orderSchema = z.object({
	id: z.string(),
	carBrand: z
		.string()
		.trim()
		.refine(
			(value) =>
				carBrands.some((brand) => brand.toLowerCase() === value.toLowerCase()),
			{ message: 'the brand is unfortunately not serviced' }
		),
	zipCode: z
		.string()
		.trim()
		.transform((value) => Number(value))
		.refine((value) => !isNaN(value), {
			message: 'wrong postal code format'
		})
		.refine((value) => zipCodes.includes(value), {
			message: 'the postal code is unfortunately not serviced'
		})
		.transform((value) => String(value)),
	firstName: z
		.string()
		.min(1, { message: 'first name is required' })
		.max(64, { message: 'first name must be less than is 64 characters' })
		.trim(),
	lastName: z
		.string()
		.min(1, { message: 'last name is required' })
		.max(64, { message: 'first name must be less than is 64 characters' })
		.trim(),
	carModel: z
		.string()
		.min(1, { message: 'car model is required' })
		.max(64, { message: 'first name must be less than is 64 characters' })
		.trim(),
	firstRegistration: z.string({
		required_error: 'is first registration is required'
	})
});
const formOrderInfoSchema = orderSchema.pick({ carBrand: true, zipCode: true });
const formOrderDetailsSchema = orderSchema.omit({
	carBrand: true,
	zipCode: true
});

export type Order = z.infer<typeof orderSchema>;
export type FormData = Partial<Order>;

export const useFormValidation = (data: FormData, step: string) => {
	let result;

	switch (true) {
		case step === steps[0]:
			result = formOrderInfoSchema.safeParse(data);
			break;

		case step === steps[1]:
			result = formOrderDetailsSchema.safeParse(data);
			break;

		default:
			result = orderSchema.safeParse(data);
	}

	return result;
};
