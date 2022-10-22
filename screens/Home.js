import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  FlatList,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Keyboard,
} from "react-native";
import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function App({ navigation }) {
  // UseStatessssssssss...
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [renderItems, setRenderItems] = useState(false);
  const [textStart, setTextStart] = useState();
  const [textEnd, setTextEnd] = useState();
  const [hasTextStart, setHasTextStart] = useState();
  const [hasTextEnd, setHasTextEnd] = useState();

  // API call APOD NASA
  const searchDateRange = async () => {
    const api = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&start_date=${startDate}&end_date=${endDate}`
    );
    const data = await api.json();
    setData(data);
    setIsloading(false);
    setRenderItems(!renderItems);
    console.log(data);
  };

  //Experimenting with clearing Data - having issues on a second API call!

  // const doesIt = () => {
  //   setData(data) ?
  //   console.log('data exists')
  //   :
  //   console.log('it doesnt')
  // }

  // //image grid "shenanigans" lol
  const numberOfCols = 3;
  const WIDTH = Dimensions.get("screen").width;
  const HEIGHT = Dimensions.get("screen").height;
  const square = WIDTH / numberOfCols;

  //Date validation error handling
  const submitSearch = () => {
    const date_regex = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
    if (!date_regex.test(startDate)) {
      Alert.alert(
        "Oopss!",
        "Start Date and End date must follow the YYYY-MM-DD format",
        [{ text: "ok" }]
      );
      return;
    }

    if (!date_regex.test(endDate)) {
      Alert.alert(
        "Oopss!",
        "Start Date and End date must follow the YYYY-MM-DD format",
        [{ text: "ok" }]
      );
      return;
    }
    getContent();
    setIsloading(true);
    searchDateRange();
    {
      Keyboard.dismiss();
    }
  };

  //Activity Indicator for Image grid
  const getContent = () => {
    if (isLoading) {
      return <ActivityIndicator size="large" />;
    }
  };

  //Onchange/OnBlur/OnFocus set text state - ideally I'd like it to bounce back when input is empty (still developing)
  //Start Date
  const formulaStart = () => {
    if (hasTextStart === " ") {
      setTextStart(false);
    } else {
      setTextStart(true);
    }
  };
  //End Date
  const formulaEnd = () => {
    if (hasTextEnd === " ") {
      setTextEnd(false);
    } else {
      setTextEnd(true);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/star-back.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.mainTitle}>
          <Text style={styles.mainTitleText}>
            {" "}
            <MaterialCommunityIcons
              name="rocket-launch"
              size={24}
              color="white"
            />{" "}
            Space Explorer
          </Text>
        </View>
        <View style={styles.searchBox}>
          <Text style={styles.secondTitle}>
            Space Image Gallery - Content from APO NASA
          </Text>
          <Text style={styles.thirdTitle}>
            Search for Space pictures. Enter a date range (Format: YYYY-MM-DD)
          </Text>
          <View
            style={{
              width: "100%",
              height: 64,
              marginVertical: 16,
              padding: 20,
              borderRadius: 5,
              backgroundColor: "#F7F9FC",
            }}
          >
            <Text
              style={{
                position: "absolute",
                left: 20,
                top: !textStart ? 20 : 4,
                fontSize: !textStart ? 18 : 14,
                color: !textStart ? "#5F6E91" : "#5F6E91",
                fontWeight: !textStart ? "400" : "600",
                fontStyle: "normal",
                fontFamily: "SpaceMono-Regular",
              }}
            >
              Start Date
            </Text>

            <TextInput
              value={setHasTextStart}
              style={{ fontSize: 18, height: 30 }}
              onFocus={() => setTextStart(true)}
              onBlur={formulaStart}
              onChangeText={setStartDate}
            />
          </View>

          <View
            style={{
              width: "100%",
              height: 64,
              marginVertical: 16,
              padding: 20,
              borderRadius: 5,
              backgroundColor: "#F7F9FC",
            }}
          >
            <Text
              style={{
                position: "absolute",
                left: 20,
                top: !textEnd ? 20 : 4,
                fontSize: !textEnd ? 18 : 14,
                color: !textEnd ? "#5F6E91" : "#5F6E91",
                fontWeight: !textEnd ? "400" : "600",
                fontStyle: "normal",
                fontFamily: "SpaceMono-Regular",
              }}
            >
              End Date
            </Text>

            <TextInput
              value={setHasTextEnd}
              style={{ fontSize: 18, height: 30 }}
              onFocus={() => setTextEnd(true)}
              onBlur={formulaEnd}
              onChangeText={setEndDate}
            />
          </View>

          <View style={styles.buttonSearch}>
            <Button
              fontWeight="600"
              fontStyle="normal"
              fontFamily="SpaceMono-Regular"
              color="#2B3855"
              fontSize="16"
              title="Search"
              onPress={submitSearch}
            />
          </View>
        </View>

        <View style={styles.results}>
          <Text style={styles.resultsText}>Results ({data.length})</Text>
        </View>
        {/* Conditional render */}
        {data.length === 0 && (
          <Text style={styles.conditionalRender}>
            Enter a date range above to start!
          </Text>
        )}
        <View style={styles.imageGrid}>
          {renderItems && (
            <FlatList
              style={{
                height: HEIGHT / 3.6,
                backgroundColor: "rgba(64, 64, 64, 0.5)",
              }}
              data={data}
              keyExtractor={(item) => {
                return item.date;
              }}
              numColumns={numberOfCols}
              renderItem={({ item }) => (
                <View style={styles.viewpic}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("ImageDetails", item)}
                  >
                    {item.copyright ? (
                      <Image
                        style={{
                          height: 104,
                          width: square - 20,
                          margin: 10,
                          borderWidth: 1,
                          borderColor: "white",
                          borderRadius: 2,
                        }}
                        source={require("../assets/error-pic.jpg")}
                      />
                    ) : (
                      <Image
                        style={{
                          height: 104,
                          width: square - 20,
                          margin: 10,
                          borderWidth: 1,
                          borderColor: "white",
                          borderRadius: 2,
                        }}
                        source={{ uri: item.url }}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              )}
            />
          )}

          <View style={styles.activityInd}>{getContent()}</View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginBottom: 200,
    // justifyContent: 'center',
  },
  mainTitle: {
    marginTop: 50,
    alignItems: "center",
    marginBottom: 10,
  },
  mainTitleText: {
    fontSize: 22,
    fontWeight: "700",
    fontStyle: "normal",
    fontFamily: "SpaceMono-Bold",
    color: "white",
    padding: 10,
    marginBottom: 20,
  },
  searchBox: {
    margin: 10,
  },
  secondTitle: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "600",
    fontStyle: "normal",
    fontFamily: "SpaceMono-Bold",
    color: "white",
  },
  thirdTitle: {
    fontSize: 14,
    fontWeight: "400",
    fontStyle: "normal",
    fontFamily: "SpaceMono-Bold",
    color: "white",
    marginVertical: 5,
  },

  buttonSearch: {
    color: "#2B3855",
    fontSize: 16,
    fontWeight: "600",
    fontStyle: "normal",
    fontFamily: "SpaceMono-Bold",
    backgroundColor: "#F7F9FC",
    borderColor: "#5F6E91",
    borderWidth: 2,
    borderRadius: 8,
    height: 48,
    width: "100%",
    padding: 2,
    marginBottom: 10,
  },
  imageGrid: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 500,
  },
  results: {
    marginBottom: 10,
    margin: 10,
  },
  resultsText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    fontStyle: "normal",
    fontFamily: "SpaceMono-Bold",
  },

  conditionalRender: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    fontStyle: "normal",
    fontFamily: "SpaceMono-Bold",
    marginLeft: 10,
  },
  activityInd: {
    display: "flex",
    alignItems: "center",
    marginTop: 70,
  },
});
