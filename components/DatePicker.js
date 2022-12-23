import DateTimePicker from "@react-native-community/datetimepicker";
import { Text, View, Button, TextInput } from "react-native";
import React, { useState } from "react";

export default function DatePicker({ price }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

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

  const daysBetween = (startDate, endDate) => {
    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.round(
      Math.abs((startDate.getTime() - endDate.getTime()) / oneDay)
    );
    return diffDays;
  };

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
              // minimumDate={}
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
          marginTop: 70,
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
            {price * daysBetween(startDate, endDate)}kr
          </Text>
        </View>
      </View>
    </View>
  );
}
