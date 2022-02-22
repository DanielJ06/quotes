import { StatusBar } from "expo-status-bar";
import { Provider as StoreProvider } from "react-redux";
import reactotron from "./src/config/reactotron";

import Routes from "./src/routes/index.routes";
import store from "./src/store";

if (__DEV__) reactotron.connect();

export default function App() {
	return (
		<StoreProvider store={store}>
			<Routes />
			<StatusBar style="auto" />
		</StoreProvider>
	);
}
