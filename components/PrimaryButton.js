import { StyleSheet, TouchableHighlight, Text } from "react-native";


function PrimaryButton({ label, onPress, btnWidth }) {
  return (
    <TouchableHighlight
      style={{ ...styles.container, ...btnWidth }}
      onPress={onPress}
      underlayColor="#608345"
    >
      <Text style={styles.btnText}>{label}</Text>
    </TouchableHighlight>
  );
}

export default PrimaryButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#6A994E",
    borderRadius: "10px",
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    height: 40,
  },
  btnText: {
    color: "white",
    fontFamily: "MontserratSemiBold",
    letterSpacing: ".3%",
  },
});
