import DateTimePicker from "@react-native-community/datetimepicker";
import { Text, View, Button, TextInput } from "react-native";
import React, { useState } from "react";

function useInput() {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  const showDatepicker = () => {
    showMode("date");
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    setShow(false);
  };
  return {
    date,
    showDatepicker,
    show,
    mode,
    onChange,
  };
}

// const daysBetween = (input.date, input2.date) => {
//   const oneDay = 24 * 60 * 60 * 1000;
//   const diffDays = Math.round(
//     Math.abs((startDate.getTime() - endDate.getTime()) / oneDay)
//   );
//   return diffDays;
// };

export default function DatePicker({ price }) {
  const input = useInput(new Date());
  const input2 = useInput(new Date());
  const totalPrice = price * 3;

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
          <Button onPress={input.showDatepicker} title={"Startdatum"} />
          {input.show && (
            <DateTimePicker
              testID="dateTimePicker1"
              value={input.date}
              mode={input.mode}
              is24Hour={true}
              display="default"
              onChange={input.onChange}
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
          <Button onPress={input2.showDatepicker} title={"Slutdatum"} />
          {input2.show && (
            <DateTimePicker
              // minimumDate={moment(new Date()).add(1, "h")}
              testID="dateTimePicker2"
              value={input2.date}
              mode={input2.mode}
              is24Hour={true}
              display="default"
              onChange={input2.onChange}
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
          {input.date.toLocaleDateString()} - {input2.date.toLocaleDateString()}
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
            {totalPrice}kr
          </Text>
        </View>
      </View>
    </View>
  );
}
