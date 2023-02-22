import { redirect } from "@sveltejs/kit";
import { steps } from "../hooks.client";

export function load() {
	throw redirect(307, `/form/${steps[0]}`);
}
