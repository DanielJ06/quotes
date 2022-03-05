import React from "react";
import QuoteIcon from "@expo/vector-icons/FontAwesome";
import { View } from "react-native";
import { Quote } from "../../types/quote";

interface IQuoteCard {
	quote: Quote;
	longPressCb?: (quote: Quote) => any;
}

import * as S from "./styles";

const QuoteCard: React.FC<IQuoteCard> = ({ quote, longPressCb }) => {
	return (
		<S.Container onLongPress={() => (longPressCb ? longPressCb(quote) : {})}>
			<QuoteIcon size={15} color="#15a691" name="quote-left" />
			<View style={{ marginStart: 10 }}>
				<S.Quote numberOfLines={1}>{quote.quote}</S.Quote>
				<S.Author>{quote.author}</S.Author>
			</View>
		</S.Container>
	);
};

export default QuoteCard;
