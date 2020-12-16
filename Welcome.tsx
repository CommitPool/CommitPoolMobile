import * as React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";

export default class Welcome extends React.Component<
  { stravaOAuth: any; next: any; code: string },
  {}
> {
  render() {
    return (
      <LinearGradient
        colors={["#D45353", "#D45353", "white"]}
        style={styles.linearGradient}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Image
              style={{ width: 200, height: 200 }}
              source={require("./assets/commit.png")}
            />
            <Text style={{ color: "white", fontSize: 50 }}>
              This is the welcome
            </Text>
          </View>
          <TouchableOpacity onPress={() => this.props.next(2)}>
            <Image
              style={{ width: 300, height: 50 }}
              source={require("./assets/strava.svg")}
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width,
    height,
    borderRadius: 5,
  },
});