import React, { useEffect, useState } from "react";
import QuoteIcon from "@expo/vector-icons/FontAwesome";
import Icon from "@expo/vector-icons/Feather";
import BookmarkIcon from "@expo/vector-icons/MaterialIcons";
import { Dimensions, Pressable, Share, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
import LottieView from "lottie-react-native";

import * as S from "./styles";
import api from "../../services/quotes";
import { Quote } from "../../types/quote";
import { useDispatch, useSelector } from "react-redux";
import { addQuote, removeQuote } from "../../store/modules/bookmark/actions";
import { RootState } from "../../types/RootState";

const Home: React.FC = () => {
	const { width: WIDTH } = Dimensions.get("window");
	const { quotes } = useSelector((state: RootState) => state.bookmark);
	const dispatch = useDispatch();
	const [randomQuote, setQuote] = useState<Quote>();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(true);
	const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

	const loadQuote = async () => {
		setError(false);
		setLoading(true);
		try {
			const res = await api.get("random");
			if (res.data) {
				setQuote({
					author: res.data[0].a,
					quote: res.data[0].q,
				});
			}
			setLoading(false);
		} catch (err) {
			setLoading(false);
			setError(true);
		}
	};

	const handleShare = async (quote: Quote) => {
		await AsyncStorage.getItem("@app/quote").then(async (data) => {
			if (data) {
				await AsyncStorage.removeItem("@app/quote");
				await AsyncStorage.setItem("@app/quote", quote.quote);
			} else {
				await AsyncStorage.setItem("@app/quote", quote.quote);
			}
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
			{randomQuote && !error ? (
				<>
					<View />
					<View>
						<QuoteIcon size={25} color="#15a691" name="quote-left" />
						{loading ? (
							<View>
								<ShimmerPlaceholder
									style={{
										marginVertical: 5,
										borderRadius: 10,
										marginLeft: 25,
									}}
									width={WIDTH * 0.8}
									height={25}
								/>
								<ShimmerPlaceholder
									width={WIDTH * 0.6}
									style={{
										marginVertical: 5,
										borderRadius: 10,
										marginLeft: 25,
									}}
									height={25}
								/>
								<ShimmerPlaceholder
									style={{
										marginVertical: 5,
										borderRadius: 10,
										marginLeft: 25,
									}}
									width={WIDTH * 0.7}
									height={25}
								/>
							</View>
						) : (
							<>
								<S.Quote>{randomQuote.quote}</S.Quote>
								<S.Author>{randomQuote.author}</S.Author>
							</>
						)}
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
			) : (
				<LottieView
					source={require("../../assets/error_dog.json")}
					autoPlay
					loop
				/>
			)}
		</S.Container>
	);
};

export default Home;
