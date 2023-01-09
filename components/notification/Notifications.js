import { StyleSheet, Text, View } from "react-native";

const Notifications = () => {
  return (
    <View style={styles.container}>
      <Text>Notis</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Notifications;
