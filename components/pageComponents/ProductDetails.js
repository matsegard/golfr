import React, { useState } from "react";
import DatePickerModal from "../modals/DatePickerModal";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  Pressable,
  ScrollView,
  Dimensions,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faRightLeft } from "@fortawesome/free-solid-svg-icons";
import { faWeightHanging } from "@fortawesome/free-solid-svg-icons";
import { faBarsProgress } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { useRoute } from "@react-navigation/native";

export default function ProductDetails() {
  const [activeImage, setActiveImage] = useState(0);
  const [openModal, setOpenModal] = useState(false);

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
  } = route.params;

  const onScroll = ({ nativeEvent }) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
    );
    if (slide !== activeImage) setActiveImage(slide);
  };

  const openDatePickerModal = () => {
    setOpenModal(!openModal);
  };

  const images = [
    image,
    "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    "https://images.unsplash.com/flagged/photo-1576448438685-9f5e5b283d4f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  ];

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ScrollView
          scrollEventThrottle={400}
          onScroll={onScroll}
          pagingEnabeld
          horizontal
          showsHorizontalScrollIndicator={false}
          decelerationRate={0}
          snapToInterval={Dimensions.get("window").width}
          snapToAlignment={"center"}
        >
          {images.map((image, index) => (
            <Image key={index} style={styles.image} source={{ uri: image }} />
          ))}
        </ScrollView>
        <View
          style={{
            flexDirection: "row",
            position: "absolute",
            bottom: 30,
          }}
        >
          {images.map((i, k) => (
            <FontAwesomeIcon
              key={k}
              style={k == activeImage ? styles.pagingActive : styles.paging}
              icon={faCircle}
            />
          ))}
        </View>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.topInfoContainer}>
          <Text style={styles.titleText}>{title}</Text>
          <View style={styles.location}>
            <FontAwesomeIcon style={styles.locationIcon} icon={faLocationDot} />
            <Text>{location}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <FontAwesomeIcon style={styles.icons} icon={faUser} />
          <Text
            style={{
              marginLeft: 5,
            }}
          >
            {user}
          </Text>
        </View>

        <View style={styles.specsContainer}>
          <View
            style={{
              alignItems: "center",
            }}
          >
            <View style={styles.iconsText}>
              <FontAwesomeIcon style={styles.icons} icon={faBarsProgress} />
            </View>
            <Text>{difficulty}</Text>
          </View>
          <View
            style={{
              alignItems: "center",
            }}
          >
            <View style={styles.iconsText}>
              <FontAwesomeIcon style={styles.icons} icon={faWeightHanging} />
            </View>
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
            <Text>{gender}</Text>
          </View>
        </View>
        <View style={styles.subHeadingContainer}>
          <Text style={styles.subHeadingText}>Klubbor</Text>
          <Text style={styles.bodyText}>{clubs}</Text>
        </View>
        <View style={styles.subHeadingContainer}>
          <Text style={styles.subHeadingText}>Beskrivning</Text>
          <Text style={styles.bodyText}>{description}</Text>
        </View>
        {openModal && (
          <DatePickerModal
            openModal={openModal}
            setOpenModal={setOpenModal}
            price={price}
          />
        )}
        <View style={styles.bottomContainer}>
          <Text style={styles.bodyText}>{price}kr /dag</Text>
          <Pressable style={styles.button} onPress={openDatePickerModal}>
            <Text style={styles.buttonText}>Skicka hyrf??rfr??gan</Text>
          </Pressable>
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
  },
  subHeadingText: {
    fontSize: 18,
    fontFamily: "MontserratSemiBold",
    marginBottom: "1.5%",
  },
  locationIcon: {
    color: "#6A994E",
    alignItems: "center",
    marginRight: 5,
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
    flex: 1.6,
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
  },
  subHeadingContainer: {
    padding: "2%",
    marginTop: 15,
  },
  bottomContainer: {
    flexDirection: "row",
    marginTop: "6%",
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
});
