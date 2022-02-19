import React from "react";
import QuoteIcon from "@expo/vector-icons/FontAwesome";
import { View } from "react-native";
import { Quote } from "../../types/quote";

interface IQuoteCard {
	quote: Quote;
}

import * as S from "./styles";
import { useDispatch } from "react-redux";
import { removeQuote } from "../../store/modules/bookmark/actions";

const QuoteCard: React.FC<IQuoteCard> = ({ quote }) => {
	const dispatch = useDispatch();
	const handleDelete = (quote: Quote) => {
		dispatch(removeQuote(quote));
	};

	return (
		<S.Container onLongPress={() => handleDelete(quote)}>
			<QuoteIcon size={15} color="#15a691" name="quote-left" />
			<View style={{ marginStart: 10 }}>
				<S.Quote numberOfLines={1}>{quote.quote}</S.Quote>
				<S.Author>{quote.author}</S.Author>
			</View>
		</S.Container>
	);
};

export default QuoteCard;
