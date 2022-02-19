import React, { useEffect, useState } from "react";
import QuoteIcon from "@expo/vector-icons/FontAwesome";
import Icon from "@expo/vector-icons/Feather";
import BookmarkIcon from "@expo/vector-icons/MaterialIcons";
import { Pressable, Share, View } from "react-native";

import * as S from "./styles";
import api from "../../services/quotes";
import { Quote } from "../../types/quote";
import { useDispatch, useSelector } from "react-redux";
import { addQuote, removeQuote } from "../../store/modules/bookmark/actions";
import { RootState } from "../../types/RootState";

const Home: React.FC = () => {
	const { quotes } = useSelector((state: RootState) => state.bookmark);
	const dispatch = useDispatch();
	const [randomQuote, setQuote] = useState<Quote>();

	const loadQuote = async () => {
		const res = await api.get("random");
		if (res.data) {
			setQuote({
				author: res.data[0].a,
				quote: res.data[0].q,
			});
		}
	};

	const handleShare = async (quote: Quote) => {
		await Share.share({
			message: `"${quote.quote}" - ${quote.author}`,
		});
	};

	const isBookmarked = (quote: Quote) => {
		const exists = quotes.findIndex((q) => q.quote === quote.quote);
		if (exists >= 0) {
			return true;
		} else {
			return false;
		}
	};

	const handleBookmark = (quote: Quote) => {
		dispatch(addQuote(quote));
	};

	const handleRemoveBookmark = (quote: Quote) => {
		dispatch(removeQuote(quote));
	};

	useEffect(() => {
		(() => {
			loadQuote();
		})();
	}, []);

	return (
		<S.Container>
			{randomQuote && (
				<>
					<View />
					<View>
						<QuoteIcon size={25} color="#15a691" name="quote-left" />
						<S.Quote>{randomQuote.quote}</S.Quote>
						<S.Author>{randomQuote.author}</S.Author>
					</View>
					<S.Actions>
						{isBookmarked(randomQuote) ? (
							<Pressable onPress={() => handleRemoveBookmark(randomQuote)}>
								<BookmarkIcon color="#15a691" name="bookmark" size={30} />
							</Pressable>
						) : (
							<Pressable onPress={() => handleBookmark(randomQuote)}>
								<BookmarkIcon name="bookmark-outline" size={30} />
							</Pressable>
						)}
						<S.RefreshBtn onPress={() => loadQuote()}>
							<Icon color="#FFF" name="refresh-ccw" size={32} />
						</S.RefreshBtn>
						<Pressable onPress={() => handleShare(randomQuote)}>
							<Icon name="share" size={25} />
						</Pressable>
					</S.Actions>
				</>
			)}
		</S.Container>
	);
};

export default Home;
