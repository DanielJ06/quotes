import React from "react";
import { FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import QuoteCard from "../../components/QuoteCard";

import { removeQuote } from "../../store/modules/bookmark/actions";
import { Quote } from "../../types/quote";
import { RootState } from "../../types/RootState";

import * as S from "./styles";

const Favorites: React.FC = () => {
	const dispatch = useDispatch();
	const { quotes } = useSelector((state: RootState) => state.bookmark);

	const handleRemoveBookmark = (quote: Quote) => {
		dispatch(removeQuote(quote));
	};

	return (
		<S.Container>
			<FlatList
				data={quotes}
				keyExtractor={(q) => q.quote}
				renderItem={({ item }) => (
					<QuoteCard
						longPressCb={(q) => handleRemoveBookmark(q)}
						quote={item}
					/>
				)}
			/>
		</S.Container>
	);
};

export default Favorites;
