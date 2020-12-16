import * as React from "react";
import {
  View,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";

export default class Welcome extends React.Component<
  { next: any; code: string },
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
            <Text style={{ textAlign: "center", color: "white", fontSize: 30, marginBottom: 25 }}>
              {"Hi Jeff,"}
              {"\n"}
              {"You have personal goals, but sticking to them can be hard!"}
              {"\n"}
              {"CommitPool is here to help :)"}
            </Text>
            <Text style={{ textAlign: "center", color: "white", fontSize: 20, marginBottom: 25 }}>
              {"Here's how it works:"}
              {"\n"}
              {"1. Set a goal and make a commitment to yourself"}
              {"\n"}
              {"2. Stake some money on your commitment"}
              {"\n"}
              {"3. Get going!"}
              {"\n"}
              {
                "4. When you complete your goal, you get your money back. But if you come up short of your goal, you lose your money."
              }
            </Text>
            <Text
              style={{
                fontStyle: "italic",
                textAlign: "center",
                color: "white",
                fontSize: 20,
                marginBottom: 25
              }}
            >
              {"For example:"}
              {"\n"}
              {"I’m going to bike 50 miles in the next week"}
              {"\n"}
              {"and I'm staking $10 on my succes"}
            </Text>
          </View>
          <TouchableOpacity
            style={{ alignItems: "center" }}
            onPress={() => this.props.next(2)}
          >
            <Image
              style={{ width: 200, height: 200 }}
              source={require("./assets/commit.png")}
            />
            <Text style={{ color: "#D45353", fontSize: 50 }}>
              Ready to commit? 
            </Text>
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
