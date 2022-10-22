import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  ImageBackground,
} from "react-native";

export default function ImageDetails({ navigation }) {
  const WIDTH = Dimensions.get("screen").width;

  return (
    <ScrollView>
      <ImageBackground
        source={require("../assets/details-background.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <View>
          {navigation.getParam("copyright") ? (
            <Image
              style={{
                height: 363,
                width: WIDTH,
              }}
              source={require("../assets/error-pic.jpg")}
            />
          ) : (
            <Image
              style={{
                height: 363,
                width: WIDTH,
              }}
              source={{ uri: navigation.getParam("url") }}
            />
          )}

          <View style={styles.descriptionBox}>
            <Text style={styles.imagetitle}>
              {navigation.getParam("title")}
            </Text>
            <Text style={styles.imageDet}>
              Description: {navigation.getParam("explanation")}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  descriptionBox: {
    display: "flex",
    padding: 5,
    paddingTop: 16,
    marginTop: 8,
    width: "100%",
    marginBottom: 100,
  },
  imagetitle: {
    color: "white",
    textAlign: "center",
    marginBottom: 10,
    fontSize: 25,
    fontWeight: "400",
    fontStyle: "normal",
    fontFamily: "SpaceMono-Bold",
  },
  imageDet: {
    fontSize: 16,
    fontWeight: "400",
    fontStyle: "normal",
    fontFamily: "SpaceMono-Regular",
    color: "white",
    textAlign: "center",
  },
});
