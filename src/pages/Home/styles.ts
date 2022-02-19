import styled from "styled-components/native";

export const Container = styled.View`
	flex: 1;
	padding: 20px;
	justify-content: space-around;
`;

export const Quote = styled.Text`
	font-size: 25px;
	font-weight: 500;
	margin-left: 25px;
`;

export const Author = styled.Text`
	font-size: 18px;
	margin-left: 25px;
	margin-top: 15px;
	color: #15a691;
	font-weight: bold;
`;

export const Actions = styled.View`
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
`;

export const RefreshBtn = styled.TouchableOpacity`
	background-color: #15a691;
	border-radius: 50px;
	padding: 15px;
`;
