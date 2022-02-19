import React from "react";
import { FlatList } from "react-native";
import { useSelector } from "react-redux";
import QuoteCard from "../../components/QuoteCard";
import { RootState } from "../../types/RootState";

import * as S from "./styles";

const Favorites: React.FC = () => {
	const { quotes } = useSelector((state: RootState) => state.bookmark);

	return (
		<S.Container>
			<FlatList
				data={quotes}
				keyExtractor={(q) => q.quote}
				renderItem={({ item }) => <QuoteCard quote={item} />}
			/>
		</S.Container>
	);
};

export default Favorites;
