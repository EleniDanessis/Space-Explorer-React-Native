import { createStackNavigator } from "react-navigation-stack";
import { Text, View } from "react-native";
import { createAppContainer } from "react-navigation";
import Home from "../screens/Home";
import ImageDetails from "../screens/ImageDetails";

const screens = {
  Home: {
    screen: Home,
    navigationOptions: { headerShown: false, title: " " },
  },
  ImageDetails: {
    screen: ImageDetails,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => {
          return (
            <View>
              <Text
                style={{
                  color: "#202A41",
                  fontSize: 22,
                  fontWeight: "700",
                  fontStyle: "normal",
                  fontFamily: "SpaceMono-Regular",
                }}
              >
                {navigation.getParam("date").substring(0, 25)}
              </Text>
            </View>
          );
        },
      };
    },
  },
};

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
