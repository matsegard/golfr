import React, { useState } from "react";
import DatePickerModal from "../modals/DatePickerModal";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  Pressable,
  Dimensions,
} from "react-native";
import { Divider } from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faRightLeft } from "@fortawesome/free-solid-svg-icons";
import { faWeightHanging } from "@fortawesome/free-solid-svg-icons";
import { faBarsProgress } from "@fortawesome/free-solid-svg-icons";
import { useRoute } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

export default function ProductDetails() {
  const [openModal, setOpenModal] = useState(false);
  const auth = getAuth();
  const navigation = useNavigation();
  const route = useRoute();
  const {
    title,
    price,
    location,
    description,
    shaft,
    clubs,
    hcp,
    difficulty,
    hand,
    gender,
    image,
    user,
    id,
    category,
  } = route.params;

  const openDatePickerModal = () => {
    if (auth.currentUser) {
      setOpenModal(!openModal);
    } else {
      Alert.alert("Du måste logga in för att skicka en hyrförfrågan");
      navigation.navigate("Login");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: image }} />
        <View
          style={{
            flexDirection: "row",
            position: "absolute",
            bottom: 30,
          }}
        ></View>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.topInfoContainer}>
          <Text style={styles.titleText}>{title}</Text>
        </View>
        <View style={styles.test}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingBottom: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                marginLeft: 10,
              }}
            >
              <FontAwesomeIcon style={styles.icons} icon={faUser} />
              <Text
                style={{
                  marginLeft: 5,
                  marginBottom: 10,
                }}
              >
                {user}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginRight: 10,
              }}
            >
              <FontAwesomeIcon
                style={styles.locationIcon}
                icon={faLocationDot}
              />
              <Text>{location}</Text>
            </View>
          </View>
          {category === "Golfset" && (
            <View style={styles.specsContainer}>
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <View style={styles.iconsText}>
                  <FontAwesomeIcon style={styles.icons} icon={faBarsProgress} />
                </View>
                <Text style={{ fontWeight: "700" }}>Nivå</Text>
                <Divider
                  my="1"
                  _light={{
                    bg: "muted.800",
                  }}
                  _dark={{
                    bg: "muted.50",
                  }}
                />
                <Text>{difficulty}</Text>
              </View>
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <View style={styles.iconsText}>
                  <FontAwesomeIcon
                    style={styles.icons}
                    icon={faWeightHanging}
                  />
                </View>
                <Text style={{ fontWeight: "700" }}>Styvhet</Text>
                <Divider
                  my="1"
                  _light={{
                    bg: "muted.800",
                  }}
                  _dark={{
                    bg: "muted.50",
                  }}
                />
                <Text>{shaft}</Text>
              </View>

              <View
                style={{
                  alignItems: "center",
                }}
              >
                <View style={styles.iconsText}>
                  <FontAwesomeIcon style={styles.icons} icon={faRightLeft} />
                </View>
                <Text style={{ fontWeight: "700" }}>Hand</Text>
                <Divider
                  my="1"
                  _light={{
                    bg: "muted.800",
                  }}
                  _dark={{
                    bg: "muted.50",
                  }}
                />
                <Text>{hand}</Text>
              </View>
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <View style={styles.iconsText}>
                  <FontAwesomeIcon style={styles.icons} icon={faUser} />
                </View>
                <Text style={{ fontWeight: "700" }}>Kön</Text>
                <Divider
                  my="1"
                  _light={{
                    bg: "muted.800",
                  }}
                  _dark={{
                    bg: "muted.50",
                  }}
                />
                <Text>{gender}</Text>
              </View>
            </View>
          )}
          {category === "Golfset" && (
            <View style={styles.subHeadingContainer}>
              <Text style={styles.subHeadingText}>Klubbor</Text>
              <Text style={styles.bodyText}>{clubs}</Text>
            </View>
          )}
          <View style={styles.subHeadingContainer}>
            <Text style={styles.subHeadingText}>Beskrivning</Text>
            <Text style={styles.bodyText}>{description}</Text>
          </View>
          {openModal && (
            <DatePickerModal
              productId={id}
              openModal={openModal}
              setOpenModal={setOpenModal}
              price={price}
              user={user}
            />
          )}
          <View style={styles.bottomContainer}>
            <Text style={{ fontFamily: "MontserratSemiBold" }}>
              {price}kr
              <Text style={{ fontFamily: "MontserratMedium" }}> /dag</Text>
            </Text>
            <Pressable style={styles.button} onPress={openDatePickerModal}>
              <Text style={styles.buttonText}>Skicka hyrförfrågan</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "white",
  },
  titleText: {
    fontSize: 20,
    fontFamily: "MontserratSemiBold",
    flexShrink: 1,
    marginLeft: 10,
  },
  subHeadingText: {
    fontSize: 18,
    fontFamily: "MontserratSemiBold",
    marginBottom: "1.5%",
  },
  locationIcon: {
    color: "#6A994E",
    alignItems: "center",
    marginRight: 10,
  },
  infoContainer: {
    flex: 2,
    backgroundColor: "white",
    borderTopLeftRadius: "20%",
    borderTopRightRadius: "20%",
    borderRadius: "20%",
    flexDirection: "column",
    padding: "4%",
  },
  topInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "10%",
    marginBottom: 8,
  },
  imageContainer: {
    flex: 1.5,
    marginBottom: -20,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    resizeMode: "cover",
    width: Dimensions.get("window").width,
    height: "100%",
  },
  location: {
    flexDirection: "row",
    fontFamily: "MontserratBold",
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
    marginBottom: 22,
    marginTop: 10,
  },
  subHeadingContainer: {
    padding: "2%",
    marginTop: 1,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "2%",
    alignItems: "center",
  },
  icons: {
    color: "#6A994E",
    zIndex: 2,
    width: 50,
    height: 50,
  },
  iconsText: {
    backgroundColor: "rgba(131, 124, 128, 0.14)",
    width: 40,
    height: 40,
    borderRadius: 100,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  pagingActive: {
    color: "white",
    margin: 6,
    opacity: 0.9,
  },
  paging: {
    margin: 6,
    opacity: 0.7,
    color: "#e0e0e0",
  },
  test: {
    minHeight: "40%",
    flexDirection: "column",
    justifyContent: "space-around",
  },
});
