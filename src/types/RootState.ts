import { Quote } from "./quote";

interface BookmarkStateProps {
	quotes: Quote[];
}

export interface RootState {
	bookmark: BookmarkStateProps;
}
