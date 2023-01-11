import {
  Menu,
  Button,
  VStack,
  Select,
  CheckIcon,
  Center,
  NativeBaseProvider,
  View,
  Text,
  Pressable,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import PrimaryButton from "../inputs/PrimaryButton";

function HelpInfo() {
  const navigation = useNavigation();
  const [changeArrow, setChangeArrow] = useState(false);
  // const [changeArrow1, setChangeArrow1] = useState(true);
  // const [changeArrow2, setChangeArrow2] = useState(true);
  const [shouldOverlapWithTrigger] = React.useState(false);

  const QnA = [
    {
      question: "Pineapple?",
      answer: "100% Pure pineapple juice from concentrate",
      id: 123,
    },
    {
      question: "Apple?",
      answer: "100% Pure apple juice from concentrate",
      id: 456,
    },
    {
      question: "Banan?",
      answer: "100% Pure banana juice from concentrate",
      id: 789,
    },
  ];

  const handleOpenQuestion = (id) => {
    const item = QnA?.map((qa) => {
      if (qa?.id === id) {
        setChangeArrow(!changeArrow);
      }
      return item;
    });
  };

  return (
    <View height="100%">
      <Text
        style={{
          fontSize: 20,
          fontFamily: "Montserrat",
          fontWeight: "bold",

          marginTop: 10,
          marginBottom: 15,
        }}
        marginX="auto"
      >
        Hjälpcenter
      </Text>
      {QnA.map((c) => (
        <VStack
          key={c.id}
          alignSelf="flex-start"
          w="100%"
          margin="2"
          marginBottom="10"
        >
          <Pressable
            style={{
              backgroundColor: "#EAEAEA",
              height: 70,
              width: "80%",
              alignSelf: "center",
              borderRadius: "10",
            }}
            onPress={() => handleOpenQuestion(c.id)}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
              marginY="auto"
            >
              <Text
                style={{
                  fontFamily: "MontserratBold",
                  fontWeight: "bold",
                  fontSize: 20,
                  color: "#6E6E6E",
                  letterSpacing: "-1%",
                }}
              >
                {c.question}
              </Text>
              <View justifyContent="end">
                {!changeArrow ? (
                  <FontAwesomeIcon
                    backgroundColor="black"
                    icon={faChevronDown}
                    color="#6E6E6E"
                    size={22}
                  />
                ) : (
                  <>
                    <FontAwesomeIcon
                      icon={faChevronUp}
                      color="#6E6E6E"
                      size={22}
                    />
                    <View
                      width="90%"
                      shouldOverlapWithTrigger={shouldOverlapWithTrigger}
                    >
                      <Text>{c.answer}</Text>
                    </View>
                  </>
                )}
              </View>
            </View>
          </Pressable>
        </VStack>
      ))}
      <View marginX="auto" marginTop="5" alignItems="center">
        <Text marginBottom="5">Hittade du inte det du letade efter?</Text>
        <PrimaryButton
          label="Kontakta oss"
          onPress={() => navigation.navigate("Kontakt")}
        />
      </View>
    </View>
  );
}

export default HelpInfo;
