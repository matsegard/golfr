import { StyleSheet, TouchableHighlight, Text } from "react-native";

function PrimaryButton({ label, onPress, btnWidth, disabled }) {
  return (
    <TouchableHighlight
      style={{ ...styles.container, ...btnWidth, opacity: disabled ? 0.5 : 1 }}
      onPress={onPress}
      underlayColor="#608345"
    >
      <Text style={styles.btnText}>{label}</Text>
    </TouchableHighlight>
  );
}

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

export default PrimaryButton;
