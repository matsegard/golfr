import { Center, ScrollView } from "native-base";
import { StyleSheet, Text, View, Image } from "react-native";
import PrimaryButton from "../inputs/PrimaryButton";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import React, { useEffect, useMemo, useState } from "react";
import { getAuth } from "firebase/auth";

const Notifications = () => {
  const [bookings, setBookings] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;

  async function getBookings() {
    const bookingsFromDb = [];
    if (user) {
      const q = query(
        collection(db, "products"),
        where("booking.pendingBooking", "==", true)
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

  async function acceptBooking() {
    console.log("hej");
  }

  useEffect(() => {
    getBookings();
  }, []);

  console.log(bookings);
  return (
    <View style={styles.container}>
      <ScrollView vertical>
        <View style={styles.adsContainer}>
          <Text style={styles.title}></Text>
          {bookings.map((booking) => (
            <>
              <View style={styles.adsCard}>
                <Text style={styles.cardText}>
                  <Text
                    style={{
                      fontFamily: "montserratMedium",
                      fontWeight: "bold",
                      marginRight: 10,
                    }}
                  >
                    {booking.data.booking.renter}
                  </Text>
                  vill hyra din produkt mellan
                  {booking.data.booking.startDate} -{" "}
                  {booking.data.booking.endDate}
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
                      {booking.data.description}
                    </Text>
                  </View>
                </View>
                <View style={styles.buttonContainer}>
                  <PrimaryButton
                    label="Acceptera"
                    btnWidth={{ width: 130, marginTop: 25 }}
                    onPress={acceptBooking}
                  />
                  <PrimaryButton
                    label="Neka"
                    btnWidth={{
                      width: 130,
                      marginTop: 20,
                      backgroundColor: "#c32f27",
                    }}
                  />
                </View>
              </View>
            </>
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
    width: "80%",
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
  },
  productTitle: {
    marginLeft: 10,
    fontFamily: "MontserratMedium",
  },
  productText: {
    marginLeft: 10,
    marginTop: 10,
    fontFamily: "MontserratRegular",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default Notifications;
