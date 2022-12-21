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
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    setShow(false);
    console.log(selectedDate);
  };
  return {
    date,
    showDatepicker,
    show,
    mode,
    onChange,
  };
}

export default function DatePicker() {
  const input = useInput(new Date());
  const input2 = useInput(new Date());
  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "center",
        // alignItems: "center",
        flex: "1",
      }}
    >
      <Button
        onPress={input.showDatepicker}
        title={input.date.toLocaleDateString()}
      />
      {input.show && (
        <DateTimePicker
          testID="dateTimePicker1"
          value={input.date}
          mode={input.mode}
          is24Hour={true}
          display="default"
          onChange={input.onChange}
        />
      )}

      <Button
        onPress={input2.showDatepicker}
        title={input2.date.toLocaleDateString()}
      />
      {input2.show && (
        <DateTimePicker
          testID="dateTimePicker2"
          value={input2.date}
          mode={input2.mode}
          is24Hour={true}
          display="default"
          onChange={input2.onChange}
        />
      )}
      <Text></Text>
    </View>
  );
}
