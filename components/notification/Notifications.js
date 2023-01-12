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

const Notifications = () => {
  const [bookings, setBookings] = useState([]);
  const [acceptedBookings, setAcceptedBookings] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;

  async function getBookings() {
    const bookingsFromDb = [];
    if (user) {
      const q = query(
        collection(db, "products"),
        where("pendingBooking", "==", true)
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
        where("accepted", "==", true)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        acceptedBookingsFromDb.push({ data: doc.data(), id: doc.id });
      });
      setAcceptedBookings(acceptedBookingsFromDb);

      return;
    } else {
    }
  }

  async function acceptBooking(id) {
    const acceptBookingRef = doc(db, "products", id);
    updateDoc(acceptBookingRef, {
      pendingBooking: false,
      accepted: true,
    })
      .then((bookingRef) => {
        console.log("Hyrförfrågan Accepterad");
        Alert.alert("Hyrförfrågan Accepterad");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function declineBooking(id) {
    const acceptBookingRef = doc(db, "products", id);
    updateDoc(acceptBookingRef, {
      pendingBooking: false,
      accepted: false,
    })
      .then((bookingRef) => {
        console.log("Hyrförfrågan Accepterad");
        Alert.alert("Hyrförfrågan Accepterad");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getBookings();
    getBookingsRentedOut();
  }, []);

  console.log(acceptedBookings);
  return (
    <View style={styles.container}>
      <ScrollView vertical>
        <View style={styles.adsContainer}>
          <Text style={styles.title}>Förfrågningar</Text>
          {bookings.map((booking) => (
            <>
              <View style={styles.adsCard}>
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
            <View style={styles.adsCard}>
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
                    Totalpris: {acceptedBooking.data.totalPrice}
                    <Text
                      style={{ fontFamily: "montserratSemiBold" }}
                    ></Text>{" "}
                    /kr
                  </Text>
                  <Text style={styles.productText}>
                    Slutdatum: {acceptedBooking.data.endDate}
                    <Text style={{ fontFamily: "montserratSemiBold" }}></Text>
                  </Text>
                  <Text style={styles.productText}>
                    Antal dagar: {acceptedBooking.data.totalDays}
                    <Text style={{ fontFamily: "montserratSemiBold" }}></Text>
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
        <View style={styles.adsContainer}>
          <Text style={styles.title}>Kommer snart</Text>
          <View style={styles.adsCard}>
            <Text style={styles.cardText}>
              <Text
                style={{
                  fontFamily: "MontserratSemiBold",
                  fontSize: 15,
                }}
              ></Text>
              Hyrda produkter
            </Text>
            <View style={styles.product}>
              <Image style={styles.image} source={{}}></Image>
              <View>
                <Text style={styles.productTitle}></Text>
                <Text style={styles.productText}>
                  Totalpris:{" "}
                  <Text style={{ fontFamily: "montserratSemiBold" }}></Text> /kr
                </Text>
                <Text style={styles.productText}>
                  Datum:{" "}
                  <Text style={{ fontFamily: "montserratSemiBold" }}></Text>
                </Text>
                <Text style={styles.productText}>
                  Antal dagar:{" "}
                  <Text style={{ fontFamily: "montserratSemiBold" }}></Text>
                </Text>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <PrimaryButton
                label="Acceptera"
                btnWidth={{ width: 130, marginTop: 25 }}
                onPress={() => {}}
              />
              <PrimaryButton
                label="Neka"
                btnWidth={{
                  width: 130,
                  marginTop: 20,
                  backgroundColor: "#a5a5a5",
                }}
                onPress={() => {}}
              />
            </View>
          </View>
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
    height: "auto",
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
    width: 230,
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
