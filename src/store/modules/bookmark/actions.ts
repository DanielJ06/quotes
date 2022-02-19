import { Quote } from "../../../types/quote";
import { TYPES } from "./types";

export function addQuote(payload: Quote) {
	return {
		type: TYPES.ADD_QUOTE,
		payload: payload,
	};
}

export function removeQuote(payload: Quote) {
	return {
		type: TYPES.REMOVE_QUOTE,
		payload: payload,
	};
}
