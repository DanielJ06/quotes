import produce from "immer";
import { Quote } from "../../../types/quote";
import { TYPES } from "./types";

interface BookmarkProps {
	quotes: Quote[];
}

const INITIAL_STATE: BookmarkProps = {
	quotes: [],
};

interface ActionProps {
	type: string;
	payload?: any;
}

export default function bookmarkReducer(
	state = INITIAL_STATE,
	action: ActionProps | undefined
) {
	switch (action?.type) {
		case TYPES.ADD_QUOTE: {
			return produce(state, (draft) => {
				draft.quotes.push(action.payload);
			});
		}

		case TYPES.REMOVE_QUOTE: {
			return produce(state, (draft) => {
				const index = draft.quotes.findIndex(
					(c) => c.quote === action.payload.quote
				);
				if (index >= 0) {
					draft.quotes.splice(index, 1);
				}
			});
		}

		default:
			return state;
	}
}
