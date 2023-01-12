import { Center, ScrollView } from "native-base";
import { StyleSheet, Text, View, Image, Alert } from "react-native";
import PrimaryButton from "../inputs/PrimaryButton";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import React, { useEffect, useMemo, useState } from "react";
import { getAuth } from "firebase/auth";
import { useFocusEffect } from "@react-navigation/native";

const Notifications = () => {
  const [bookings, setBookings] = useState([]);
  const [acceptedBookings, setAcceptedBookings] = useState([]);
  const [myBookings, setMyBookings] = useState([]);
  const [update, setUpdate] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;

  async function getBookings() {
    const bookingsFromDb = [];
    if (user) {
      const q = query(
        collection(db, "products"),
        where("pendingBooking", "==", true),
        where("user", "==", user.displayName)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        bookingsFromDb.push({ data: doc.data(), id: doc.id });
      });
      setBookings(bookingsFromDb);
      // console.log(bookings);
      return;
    } else {
    }
  }

  async function getBookingsRentedOut() {
    const acceptedBookingsFromDb = [];
    if (user) {
      const q = query(
        collection(db, "products"),
        where("accepted", "==", true),
        where("user", "==", user.displayName)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        acceptedBookingsFromDb.push({ data: doc.data(), id: doc.id });
      });
      setAcceptedBookings(acceptedBookingsFromDb);
      return;
    }
  }

  async function acceptBooking(id) {
    if (user) {
      const acceptBookingRef = doc(db, "products", id);
      updateDoc(acceptBookingRef, {
        pendingBooking: false,
        accepted: true,
      })
        .then((acceptBookingRef) => {
          console.log("Hyrförfrågan Accepterad");
          Alert.alert("Hyrförfrågan Accepterad");
          setUpdate(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  async function declineBooking(id) {
    if (user) {
      const acceptBookingRef = doc(db, "products", id);
      updateDoc(acceptBookingRef, {
        pendingBooking: false,
        accepted: false,
      })
        .then((acceptBookingRef) => {
          console.log("Hyrförfrågan Nekad");
          Alert.alert("Hyrförfrågan Nekad");
          setUpdate(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  async function getMyBookings() {
    const myBookingsFromDb = [];
    if (user) {
      const q = query(
        collection(db, "products"),
        where("renter", "==", user.displayName)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        myBookingsFromDb.push({ data: doc.data(), id: doc.id });
      });
      setMyBookings(myBookingsFromDb);
      console.log(myBookings);
      return;
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      getBookings();
      getBookingsRentedOut();
      getMyBookings();
    }, [update])
  );

  // useEffect(() => {
  //   getBookings();
  //   getBookingsRentedOut();
  //   getMyBookings();
  // }, [update]);

  return (
    <View style={styles.container}>
      <ScrollView vertical>
        <View style={styles.adsContainer}>
          <Text style={styles.title}>Förfrågningar</Text>
          {bookings.map((booking) => (
            <>
              <View key={booking.id} style={styles.adsCard}>
                <Text style={styles.cardText}>
                  <Text
                    style={{
                      fontFamily: "MontserratSemiBold",
                      fontSize: 15,
                    }}
                  >
                    {booking.data.renter}{" "}
                  </Text>
                  har skickat en förfrågan att hyra den här produkten
                </Text>
                <View style={styles.product}>
                  <Image
                    style={styles.image}
                    source={{
                      uri: booking.data.image,
                    }}
                  ></Image>
                  <View>
                    <Text style={styles.productTitle}>
                      {booking.data.title}
                    </Text>
                    <Text style={styles.productText}>
                      Totalpris:{" "}
                      <Text style={{ fontFamily: "montserratSemiBold" }}>
                        {booking.data.totalPrice}
                      </Text>{" "}
                      /kr
                    </Text>
                    <Text style={styles.productText}>
                      Datum:{" "}
                      <Text style={{ fontFamily: "montserratSemiBold" }}>
                        {booking.data.startDate} - {booking.data.endDate}
                      </Text>
                    </Text>
                    <Text style={styles.productText}>
                      Antal dagar:{" "}
                      <Text style={{ fontFamily: "montserratSemiBold" }}>
                        {booking.data.totalDays}
                      </Text>
                    </Text>
                  </View>
                </View>
                <View style={styles.buttonContainer}>
                  <PrimaryButton
                    label="Acceptera"
                    btnWidth={{ width: 130, marginTop: 25 }}
                    onPress={() => {
                      acceptBooking(booking.id);
                    }}
                  />
                  <PrimaryButton
                    label="Neka"
                    btnWidth={{
                      width: 130,
                      marginTop: 20,
                      backgroundColor: "#a5a5a5",
                    }}
                    onPress={() => {
                      declineBooking(booking.id);
                    }}
                  />
                </View>
              </View>
            </>
          ))}
        </View>
        <View style={styles.adsContainer}>
          <Text style={styles.title}>Uthyrda produkter</Text>
          {acceptedBookings.map((acceptedBooking) => (
            <View key={acceptedBooking.id} style={styles.adsCard}>
              <Text style={styles.cardText}>
                <Text
                  style={{
                    fontFamily: "MontserratSemiBold",
                    fontSize: 15,
                  }}
                ></Text>
                Uthyrd produkt
              </Text>
              <View style={styles.product}>
                <Image
                  style={styles.image}
                  source={{ uri: acceptedBooking.data.image }}
                ></Image>
                <View>
                  <Text style={styles.productTitle}>
                    {acceptedBooking.data.title}
                  </Text>
                  <Text style={styles.productText}>
                    Totalpris:
                    <Text style={{ fontFamily: "montserratSemiBold" }}>
                      {" "}
                      {acceptedBooking.data.totalPrice}
                    </Text>{" "}
                    /kr
                  </Text>
                  <Text style={styles.productText}>
                    Datum:
                    <Text style={{ fontFamily: "montserratSemiBold" }}>
                      {" "}
                      {acceptedBooking.data.startDate} -{" "}
                      {acceptedBooking.data.endDate}
                    </Text>
                  </Text>
                  <Text style={styles.productText}>
                    Antal dagar:{" "}
                    <Text style={{ fontFamily: "montserratSemiBold" }}>
                      {acceptedBooking.data.totalDays}
                    </Text>
                  </Text>
                  <Text style={styles.productText}>
                    Hyrare:{" "}
                    <Text style={{ fontFamily: "montserratSemiBold" }}>
                      {acceptedBooking.data.renter}
                    </Text>
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
        <View style={styles.adsContainer}>
          <Text style={styles.title}>Hyrda produkter</Text>
          {myBookings.map((myBooking) => (
            <View key={myBooking.id} style={styles.adsCard}>
              {myBooking.data.accepted ? (
                <Text
                  style={{
                    fontFamily: "MontserratSemiBold",
                    fontSize: 15,
                  }}
                >
                  Hyrd produkt
                </Text>
              ) : (
                <Text
                  style={{
                    fontFamily: "MontserratSemiBold",
                    fontSize: 15,
                  }}
                >
                  Väntar på svar från uthyraren
                </Text>
              )}
              <View style={styles.product}>
                <Image
                  style={styles.image}
                  source={{ uri: myBooking.data.image }}
                ></Image>
                <View>
                  <Text style={styles.productTitle}>
                    {myBooking.data.title}
                  </Text>
                  <Text style={styles.productText}>
                    Totalpris:{" "}
                    <Text style={{ fontFamily: "montserratSemiBold" }}>
                      {myBooking.data.totalPrice}
                    </Text>{" "}
                    /kr
                  </Text>
                  <Text style={styles.productText}>
                    Datum:{" "}
                    <Text style={{ fontFamily: "montserratSemiBold" }}>
                      {myBooking.data.startDate} - {myBooking.data.endDate}
                    </Text>
                  </Text>
                  <Text style={styles.productText}>
                    Antal dagar:{" "}
                    <Text style={{ fontFamily: "montserratSemiBold" }}>
                      {myBooking.data.totalDays}
                    </Text>
                  </Text>
                  <Text style={styles.productText}>
                    Uthyrare:{" "}
                    <Text style={{ fontFamily: "montserratSemiBold" }}>
                      {myBooking.data.user}
                    </Text>
                  </Text>
                </View>
              </View>
              {/* <PrimaryButton
                label="Avbryt"
                btnWidth={{
                  width: 130,
                  marginTop: 20,
                  backgroundColor: "#a5a5a5",
                }}
                onPress={() => {}}
              /> */}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  adsContainer: {
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontFamily: "MontserratMedium",
    fontSize: 20,
    marginTop: 20,
  },
  adsCard: {
    backgroundColor: "white",
    width: "90%",
    height: 260,
    borderRadius: 10,
    marginTop: 20,
    padding: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  cardText: {
    fontFamily: "MontserratMedium",
  },
  product: {
    flexDirection: "row",
    marginTop: 20,
    // backgroundColor: "blue",

    maxHeight: 100,
  },
  productTitle: {
    marginLeft: 10,
    fontFamily: "MontserratMedium",
  },
  productText: {
    marginLeft: 10,
    marginTop: 10,
    width: 240,
    fontFamily: "MontserratRegular",
    maxHeight: 100,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default Notifications;
