import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Alert,
  Pressable,
  ScrollView,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons/faLocationDot";

const product = {
  title: "Taylormade M4",
  price: 400,
  description:
    "Denna tunna träffytan tillsammans med den väldigt tunna framkanten levererar klubbhuvudet hög bollhastighet.",
  location: "Göteborg, Majorna",
  clubs: "5 - 6 - 7 - 8 - 9 - PW - Driver - Putter - 3 wood",
};

export default function ProductDetails() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={require("../assets/test.jpg")} />
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.TopInfoContainer}>
          <Text style={styles.titleText}>{product.title}</Text>
          <View style={styles.location}>
            <FontAwesomeIcon style={styles.locationIcon} icon={faLocationDot} />
            <Text>{product.location}</Text>
          </View>
        </View>
        <View style={styles.specsContainer}>
          <Text>Icons</Text>
          <Text>Icons</Text>
          <Text>Icons</Text>
          <Text>Icons</Text>
        </View>
        <View style={styles.subHeadingContainer}>
          <Text style={styles.subHeadingText}>Klubbor</Text>
          <Text style={styles.bodyText}>{product.clubs}</Text>
        </View>
        <View style={styles.subHeadingContainer}>
          <Text style={styles.subHeadingText}>Beskrivning</Text>
          <Text style={styles.bodyText}>{product.description}</Text>
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.bodyText}>{product.price}kr /dag</Text>
          <Pressable
            style={styles.button}
            onPress={() => Alert.alert("Hyrförfrågan skickad")}
          >
            <Text style={styles.buttonText}>Sicka hyrförfrågan</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: "1",
    backgroundColor: "white",
  },
  titleText: {
    fontSize: 20,
    fontFamily: "MontserratSemiBold",
  },
  subHeadingText: {
    fontSize: 18,
    fontFamily: "MontserratSemiBold",
    marginBottom: "1.5%",
  },
  locationIcon: {
    color: "#6A994E",
    alignItems: "center",
  },

  infoContainer: {
    flex: 2.5,
    backgroundColor: "white",
    borderTopLeftRadius: "20%",
    borderTopRightRadius: "20%",
    borderRadius: "20%",
    flexDirection: "column",
    padding: "4%",
  },
  TopInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "10%",
  },
  imageContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    resizeMode: "contain",
    width: "100%",
  },
  location: {
    flexDirection: "row",
    fontFamily: "MontserratRegular",
  },
  button: {
    backgroundColor: "#6A994E",
    paddingTop: 10,
    width: "50%",
    paddingBottom: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffff",
    fontFamily: "MontserratSemiBold",
  },

  bodyText: {
    fontFamily: "MontserratRegular",
  },
  specsContainer: {
    height: "20%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  },

  subHeadingContainer: {
    padding: "2%",
  },

  bottomContainer: {
    flexDirection: "row",
    marginTop: "6%",
    justifyContent: "space-between",
    padding: "2%",
    alignItems: "center",
  },
});
