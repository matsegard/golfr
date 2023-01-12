import { VStack, ScrollView, View, Text, Pressable } from "native-base";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import PrimaryButton from "../inputs/PrimaryButton";

function HelpInfo() {
  const navigation = useNavigation();
  const [changeArrow, setChangeArrow] = useState(false);
  const [openQuestion, setOpenQuestion] = useState(false);
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
        setOpenQuestion(!openQuestion);
      }
      return item;
    });
  };

  return (
    <ScrollView vertical showsVerticalScrollIndicator={false} height="100%">
      <View marginBottom="150">
        <Text
          style={{
            fontSize: 20,
            fontFamily: "MontserratBold",
            fontWeight: "bold",
            marginTop: 50,
            marginBottom: 55,
          }}
          marginX="auto"
        >
          Hjälpcenter
        </Text>
        {QnA.map((c) => (
          <>
            {!openQuestion ? (
              <VStack
                style={{
                  margin: 1,
                  marginBottom: 50,
                }}
                width="100%"
                key={c.id}
                alignSelf="flex-start"
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
                      justifyContent: "space-around",
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
                    <FontAwesomeIcon
                      backgroundColor="black"
                      icon={faChevronDown}
                      color="#6E6E6E"
                      size={22}
                    />
                  </View>
                </Pressable>
              </VStack>
            ) : (
              <VStack
                style={{
                  margin: 1,
                  marginBottom: 50,
                }}
                width="100%"
                key={c.id}
                alignSelf="flex-start"
              >
                <Pressable
                  style={{
                    backgroundColor: "#EAEAEA",
                    height: 150,
                    width: "80%",
                    alignSelf: "center",
                    borderRadius: "10",
                  }}
                  onPress={() => handleOpenQuestion(c.id)}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                      marginTop: 26,
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

                    <FontAwesomeIcon
                      icon={faChevronUp}
                      color="#6E6E6E"
                      size={22}
                    />
                  </View>
                  <View
                    style={{
                      bottom: 52,
                    }}
                  >
                    <Text textAlign="center">{c.answer}</Text>
                  </View>
                </Pressable>
              </VStack>
            )}
          </>
        ))}
        <View marginX="auto" marginTop="10" alignItems="center">
          <Text marginBottom="5" fontFamily="MontserratRegular">
            Hittade du inte det du letade efter?
          </Text>
          <PrimaryButton
            label="Kontakta oss"
            onPress={() => navigation.navigate("Kontakt")}
          />
        </View>
      </View>
    </ScrollView>
  );
}

export default HelpInfo;
