import DateTimePicker from "@react-native-community/datetimepicker";
import { Text, View, Button, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import PrimaryButton from "../inputs/PrimaryButton";
import { doc, updateDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { getAuth, currentUser } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

export default function DatePicker({ price, productId, user, setOpenModal }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const auth = getAuth();
  const navigation = useNavigation();

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const onChangeFirstInput = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(Platform.OS === "ios");
    setStartDate(currentDate);
    setShow(false);
  };

  const onChangeSecondInput = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(Platform.OS === "ios");
    setEndDate(currentDate);
    setShow(false);
  };

  const oneDay = 24 * 60 * 60 * 1000;

  const daysBetween = (startDate, endDate) => {
    const diffDays = Math.round(
      Math.abs((startDate.getTime() - endDate.getTime()) / oneDay)
    );
    return diffDays;
  };

  let totalDays = daysBetween(startDate, endDate);
  let totalPrice = price * daysBetween(startDate, endDate);

  async function updateProduct() {
    if (auth.currentUser) {
      if (user === auth.currentUser.displayName) {
        return Alert.alert("Du kan inte hyra din egna produkt");
      }
      const endDateDb = endDate.toLocaleDateString();
      const startDateDb = startDate.toLocaleDateString();

      const bookingRef = doc(db, "products", productId);
      updateDoc(bookingRef, {
        pendingBooking: true,
        accepted: false,
        startDate: startDateDb,
        endDate: endDateDb,
        totalPrice: totalPrice,
        renter: auth.currentUser.displayName,
        renterEmail: auth.currentUser.email,
        totalDays: totalDays,
        denied: false,
      })
        .then((bookingRef) => {
          console.log("Hyrförfrågan skickad");
          Alert.alert("Hyrförfrågan skickad");
          navigation.navigate("Products");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      navigation.navigate("Products");
    }
  }

  const minimumRentDays = (startDate) => {
    const addOneDay = startDate.getTime() + oneDay;

    return addOneDay;
  };

  let minimumDate = minimumRentDays(startDate);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button onPress={showDatepicker} title={"Startdatum"} />
          {show && (
            <DateTimePicker
              testID="dateTimePicker1"
              value={startDate}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChangeFirstInput}
              minimumDate={new Date()}
              style={{ justifyContent: "center" }}
            />
          )}
        </View>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button onPress={showDatepicker} title={"Slutdatum"} />
          {show && (
            <DateTimePicker
              minimumDate={new Date(minimumDate)}
              testID="dateTimePicker2"
              value={endDate}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChangeSecondInput}
            />
          )}
        </View>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 25,
        }}
      >
        <Text
          style={{
            fontFamily: "MontserratSemiBold",
            marginBottom: 10,
            fontSize: 24,
          }}
        >
          Hyrperiod
        </Text>
        <Text style={{ fontFamily: "MontserratMedium", fontSize: 18 }}>
          {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
        </Text>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Text
            style={{
              fontFamily: "MontserratMedium",
              fontSize: 18,
              marginRight: 10,
              marginBottom: 10,
            }}
          >
            Totalpris:
          </Text>
          <Text
            style={{
              fontFamily: "MontserratSemiBold",
              fontSize: 18,
            }}
          >
            {totalPrice}kr
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <PrimaryButton
            label="Avbryt"
            btnWidth={{ width: 80, margin: 20 }}
            secondaryColor={{ backgroundColor: "gray" }}
            onPress={() => setOpenModal(false)}
          />
          <PrimaryButton
            label="Skicka"
            btnWidth={{ width: 80, margin: 20 }}
            onPress={() => updateProduct()}
          />
        </View>
      </View>
    </View>
  );
}
