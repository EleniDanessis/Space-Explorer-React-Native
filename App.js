import {} from "react-native";
import Navigator from "./routes/homeStack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

export default function App() {
  //Fonts
  const [fontsLoaded] = useFonts({
    "SpaceMono-Regular": require("./assets/fonts/SpaceMono-Regular.ttf"),
    "SpaceMono-Bold": require("./assets/fonts/SpaceMono-Bold.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return;
    undefined;
  } else {
    SplashScreen.hideAsync();
  }

  return <Navigator />;
}
