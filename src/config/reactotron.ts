import { Alert, Dimensions, NativeModules, Platform } from "react-native";
import reactotron from "reactotron-react-native";
import { reactotronRedux } from "reactotron-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Device from "expo-device";

const { scriptURL } = NativeModules.SourceCode;
const hostName = scriptURL.split("://")[1].split(":")[0];

reactotron.setAsyncStorageHandler!!(AsyncStorage)
	.configure({ host: hostName })
	.useReactNative()
	.use(reactotronRedux());

reactotron.onCustomCommand({
	command: "Mostrar alert",
	handler: () => {
		Alert.alert("Disparado do reactotron");
	},
});

reactotron.onCustomCommand({
	command: "Get device info",
	handler: () => {
		const { width, height } = Dimensions.get("window");
		reactotron.display({
			name: "Get device info",
			value: {
				width: width,
				height: height,
				OS: Platform.OS,
				OsVersion: Device.osVersion,
				Brand: Device.brand,
				DeviceName: Device.deviceName,
			},
			important: true,
		});
	},
});

export default reactotron;
