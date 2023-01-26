import { Divider } from "native-base";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  ScrollView,
  Pressable,
} from "react-native";
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
  const [openMenu1, setOpenMenu1] = useState(true);
  const [openMenu2, setOpenMenu2] = useState(false);
  const [openMenu3, setOpenMenu3] = useState(false);
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
        denied: true,
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

  return (
    <View style={styles.container}>
      <ScrollView vertical>
        <View style={{ marginBottom: 100 }}>
          <View style={styles.adsContainer}>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                marginTop: 25,
              }}
            >
              <Pressable onPress={() => setOpenMenu1(!openMenu1)}>
                <Text style={!openMenu1 ? styles.title : styles.titleActive}>
                  Förfrågningar
                </Text>
              </Pressable>
              {bookings.length != 0 ? (
                <View style={!openMenu1 ? styles.number : styles.activeNumber}>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 11,
                      alignSelf: "center",
                    }}
                  >
                    {bookings.length}
                  </Text>
                </View>
              ) : (
                <View
                  style={!openMenu1 ? styles.numberEmpty : styles.activeNumber}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 11,
                      alignSelf: "center",
                    }}
                  >
                    {bookings.length}
                  </Text>
                </View>
              )}

              <Pressable onPress={() => setOpenMenu2(!openMenu2)}>
                <Text style={!openMenu2 ? styles.title : styles.titleActive}>
                  Uthyrningar
                </Text>
              </Pressable>
              {acceptedBookings.length != 0 ? (
                <View style={!openMenu2 ? styles.number : styles.activeNumber}>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 11,
                      alignSelf: "center",
                    }}
                  >
                    {acceptedBookings.length}
                  </Text>
                </View>
              ) : (
                <View
                  style={!openMenu2 ? styles.numberEmpty : styles.activeNumber}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 11,
                      alignSelf: "center",
                    }}
                  >
                    {acceptedBookings.length}
                  </Text>
                </View>
              )}

              <Pressable onPress={() => setOpenMenu3(!openMenu3)}>
                <Text style={!openMenu3 ? styles.title : styles.titleActive}>
                  Hyrda produkter
                </Text>
              </Pressable>
              {myBookings.length != 0 ? (
                <View style={!openMenu3 ? styles.number : styles.activeNumber}>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 11,
                      alignSelf: "center",
                    }}
                  >
                    {myBookings.length}
                  </Text>
                </View>
              ) : (
                <View
                  style={!openMenu3 ? styles.numberEmpty : styles.activeNumber}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 11,
                      alignSelf: "center",
                    }}
                  >
                    {myBookings.length}
                  </Text>
                </View>
              )}
            </View>

            {openMenu1 && (
              <>
                {bookings.length == 0 && (
                  <Text
                    style={{
                      marginTop: 30,
                      fontFamily: "MontserratMedium",
                      fontSize: 12,
                    }}
                  >
                    Du har inte fått några förfrågningar
                  </Text>
                )}
                {bookings.map((booking) => (
                  <View key={booking.data.id} style={styles.adsCard}>
                    <Text style={styles.cardText}>
                      <Text
                        style={{
                          fontFamily: "MontserratSemiBold",
                          fontSize: 16,
                        }}
                      >
                        {booking.data.renter}{" "}
                      </Text>
                      har skickat en förfrågan att hyra den här produkten
                    </Text>
                    <View style={styles.product}>
                      <View
                        style={{
                          flexDirection: "row-reverse",
                          justifyContent: "space-between",
                        }}
                      >
                        <Image
                          style={styles.image}
                          source={{
                            uri: booking.data.image,
                          }}
                        ></Image>
                        <View style={{ flexDirection: "column" }}>
                          <Text style={styles.productTitle}>
                            {booking.data.title}
                          </Text>
                          <Text style={styles.productText}>
                            Totalpris:{" "}
                            <Text style={{ fontFamily: "MontserratSemiBold" }}>
                              {booking.data.totalPrice}
                            </Text>{" "}
                            /kr
                          </Text>
                          <Text style={styles.productText}>
                            Antal dagar:{" "}
                            <Text style={{ fontFamily: "MontserratSemiBold" }}>
                              {booking.data.totalDays}
                            </Text>
                          </Text>
                        </View>
                      </View>
                      <Text
                        style={{
                          marginTop: 13,
                          fontFamily: "MontserratRegular",
                        }}
                      >
                        Datum:{" "}
                        <Text
                          style={{
                            fontFamily: "MontserratSemiBold",
                          }}
                        >
                          {booking.data.startDate} - {booking.data.endDate}
                        </Text>
                      </Text>
                    </View>
                    <View style={styles.buttonContainer}>
                      <Pressable
                        onPress={() => {
                          declineBooking(booking.id);
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "MontserratSemiBold",
                            fontSize: 18,
                            color: "#6A8E4E",
                            marginRight: 25,
                          }}
                        >
                          Neka
                        </Text>
                      </Pressable>
                      <PrimaryButton
                        label="Acceptera"
                        btnWidth={{ width: 110 }}
                        onPress={() => {
                          acceptBooking(booking.id);
                        }}
                      />
                    </View>
                  </View>
                ))}
              </>
            )}
          </View>
          <View style={styles.adsContainer}>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
              }}
            ></View>
            {openMenu2 && (
              <>
                {acceptedBookings.length == 0 && (
                  <Text
                    style={{
                      marginTop: 30,
                      fontFamily: "MontserratMedium",
                      fontSize: 12,
                    }}
                  >
                    Du har inga uthyrda produkter
                  </Text>
                )}
                {acceptedBookings.map((acceptedBooking) => (
                  <View key={acceptedBooking.id} style={styles.adsCard}>
                    <Text style={styles.cardText}>
                      <Text
                        style={{
                          fontFamily: "MontserratSemiBold",
                          fontSize: 16,
                        }}
                      >
                        Uthyrd produkt
                      </Text>
                    </Text>
                    <Divider
                      my="3"
                      _light={{
                        bg: "muted.300",
                      }}
                      _dark={{
                        bg: "muted.50",
                      }}
                    />
                    <View style={styles.product}>
                      <View
                        style={{
                          flexDirection: "row-reverse",
                          justifyContent: "space-between",
                        }}
                      >
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
                            <Text style={{ fontFamily: "MontserratSemiBold" }}>
                              {" "}
                              {acceptedBooking.data.totalPrice}
                            </Text>{" "}
                            /kr
                          </Text>

                          <Text style={styles.productText}>
                            Antal dagar:{" "}
                            <Text style={{ fontFamily: "MontserratSemiBold" }}>
                              {acceptedBooking.data.totalDays}
                            </Text>
                          </Text>
                        </View>
                      </View>
                      <Text style={styles.productText}>
                        Plats:{" "}
                        <Text style={{ fontFamily: "MontserratSemiBold" }}>
                          {acceptedBooking.data.location}
                        </Text>
                      </Text>
                      <Text style={styles.productText}>
                        Hyrare:{" "}
                        <Text style={{ fontFamily: "MontserratSemiBold" }}>
                          {acceptedBooking.data.renter}
                        </Text>
                      </Text>
                      <Text style={styles.productText}>
                        Datum:
                        <Text style={{ fontFamily: "MontserratSemiBold" }}>
                          {" "}
                          {acceptedBooking.data.startDate} -{" "}
                          {acceptedBooking.data.endDate}
                        </Text>
                      </Text>
                      <Text style={styles.contactInfo}>
                        Nästa steg i processen är att kontakta hyraren via
                        email:{" "}
                        <Text style={{ fontFamily: "MontserratSemiBold" }}>
                          {acceptedBooking.data.renterEmail}
                        </Text>
                      </Text>
                    </View>
                  </View>
                ))}
              </>
            )}
          </View>
          <View style={styles.adsContainer}>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
              }}
            ></View>
            {openMenu3 && (
              <>
                {myBookings.length == 0 && (
                  <Text
                    style={{
                      marginTop: 30,
                      fontFamily: "MontserratMedium",
                      fontSize: 12,
                    }}
                  >
                    Du har inte hyrt några produkter
                  </Text>
                )}
                {myBookings.map((myBooking) => (
                  <View key={myBooking.id} style={styles.adsCard}>
                    {myBooking.data.accepted && (
                      <Text
                        style={{
                          fontFamily: "MontserratSemiBold",
                          fontSize: 16,
                        }}
                      >
                        Hyrd produkt
                      </Text>
                    )}
                    {myBooking.data.pendingBooking && (
                      <Text
                        style={{
                          fontFamily: "MontserratSemiBold",
                          fontSize: 16,
                        }}
                      >
                        Väntar på svar från uthyraren
                      </Text>
                    )}
                    {myBooking.data.denied && (
                      <Text
                        style={{
                          fontFamily: "MontserratSemiBold",
                          fontSize: 15,
                        }}
                      >
                        Hyrförfrågan nekad
                      </Text>
                    )}
                    <Divider
                      my="3"
                      _light={{
                        bg: "muted.300",
                      }}
                      _dark={{
                        bg: "muted.50",
                      }}
                    />
                    <View style={styles.product}>
                      <View
                        style={{
                          flexDirection: "row-reverse",
                          justifyContent: "space-between",
                        }}
                      >
                        <Image
                          style={styles.image}
                          source={{ uri: myBooking.data.image }}
                        ></Image>
                        <View style={{ flexDirection: "column" }}>
                          <Text style={styles.productTitle}>
                            {myBooking.data.title}
                          </Text>
                          <Text style={styles.productText}>
                            Totalpris:{" "}
                            <Text style={{ fontFamily: "MontserratSemiBold" }}>
                              {myBooking.data.totalPrice}
                            </Text>{" "}
                            /kr
                          </Text>
                          <Text style={styles.productText}>
                            Antal dagar:{" "}
                            <Text style={{ fontFamily: "MontserratSemiBold" }}>
                              {myBooking.data.totalDays}
                            </Text>
                          </Text>
                          <Text style={styles.productText}>
                            Plats:{" "}
                            <Text style={{ fontFamily: "MontserratSemiBold" }}>
                              {myBooking.data.location}
                            </Text>
                          </Text>
                        </View>
                      </View>
                      <Text style={styles.productTextBottom}>
                        Uthyrare:{" "}
                        <Text style={{ fontFamily: "MontserratSemiBold" }}>
                          {myBooking.data.user}
                        </Text>
                      </Text>

                      <Text style={styles.productTextBottom}>
                        Datum:{" "}
                        <Text style={{ fontFamily: "MontserratSemiBold" }}>
                          {myBooking.data.startDate} - {myBooking.data.endDate}
                        </Text>
                      </Text>
                      <Text style={styles.contactInfo}>
                        Nästa steg i processen är att kontakta uthyraren via
                        email:{" "}
                        <Text style={{ fontFamily: "MontserratSemiBold" }}>
                          {myBooking.data.userEmail}
                        </Text>
                      </Text>
                    </View>
                  </View>
                ))}
              </>
            )}
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
    fontFamily: "MontserratSemiBold",
    fontSize: 11,
    marginTop: 20,
    marginRight: 3,
    marginLeft: 12,
    color: "#9B9B9B",
  },
  adsCard: {
    backgroundColor: "white",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    width: "90%",
    borderRadius: 10,
    marginTop: 30,
    padding: 20,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  cardText: {
    fontFamily: "MontserratMedium",
  },
  product: {
    flexDirection: "column",
    marginTop: 7,
  },
  productTitle: {
    fontFamily: "MontserratSemiBold",
    fontSize: 15,
  },
  productText: {
    marginTop: 15,
    fontFamily: "MontserratRegular",
    flexWrap: "wrap",
  },
  productTextBottom: {
    marginTop: 11,
    width: 400,
    fontFamily: "MontserratRegular",
    flexWrap: "wrap",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 35,
  },
  contactInfo: {
    fontSize: 16,
    marginTop: 11,
    fontFamily: "MontserratRegular",
  },
  titleActive: {
    fontFamily: "MontserratSemiBold",
    fontSize: 11,
    marginTop: 20,
    marginRight: 3,
    marginLeft: 12,
    color: "#94C949",
    textDecorationLine: "underline",
  },
  number: {
    backgroundColor: "#6A994E",
    width: 17,
    height: 17,
    borderRadius: "100%",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: -20,
  },
  activeNumber: {
    backgroundColor: "#94C949",
    width: 17,
    height: 17,
    borderRadius: "100%",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: -20,
  },
  numberEmpty: {
    backgroundColor: "#9B9B9B",
    width: 17,
    height: 17,
    borderRadius: "100%",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: -20,
  },
});

export default Notifications;
