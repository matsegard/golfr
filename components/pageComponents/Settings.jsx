import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
} from "react-native";

function Settings() {
  return (
    <View style={styles.container}>
      <Image
        style={[
          styles.greenBubble,
          {
            transform: [{ rotate: "180deg" }],
          },
        ]}
        source={require("../../assets/Ellipse.png")}
      />
      <View style={styles.deleteAccount}>
        <Text
          style={{
            fontFamily: "MontserratBold",
            fontWeight: "bold",
            marginBottom: 10,
          }}
        >
          Radera konto
        </Text>
        <Text style={{ fontFamily: "MontserratRegular", marginBottom: 10 }}>
          Vill du radera ditt konto? Yada yada om du raderar konto blabla
        </Text>
        <Pressable onPress={() => console.log("PRESS")}>
          <Text
            style={{
              fontFamily: "MontserratSemiBold",
              fontWeight: 500,
              color: "red",
              textDecorationLine: "underline",
            }}
          >
            Jag vill radera mitt konto
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flex: 1,
  },
  greenBubble: {
    width: Dimensions.get("window").width,
    height: 224,
    top: -55,
  },
  deleteAccount: {
    width: Dimensions.get("window").width - 100,
    marginLeft: 50,
    flex: 3,
  },
});

export default Settings;
