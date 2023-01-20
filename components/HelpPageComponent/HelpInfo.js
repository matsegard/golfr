import { VStack, ScrollView, View, Text, Pressable } from "native-base";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import PrimaryButton from "../inputs/PrimaryButton";
import { Linking } from "react-native";

function HelpInfo() {
  const [openQuestion, setOpenQuestion] = useState(false);
  const [openQuestion2, setOpenQuestion2] = useState(false);
  const [openQuestion3, setOpenQuestion3] = useState(false);

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

        {!openQuestion ? (
          <VStack
            style={{
              margin: 1,
              marginBottom: 50,
            }}
            width="100%"
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
              onPress={() => setOpenQuestion(!openQuestion)}
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
                    fontSize: 19,
                    color: "#6E6E6E",
                    letterSpacing: "-1%",
                  }}
                >
                  Hur hyr jag en produkt?
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
            alignSelf="flex-start"
          >
            <Pressable
              style={{
                backgroundColor: "#EAEAEA",
                height: 150,
                width: "80%",
                height: 262, // ÄNDRAR HÖJD PÅ SVARSDELEN
                alignSelf: "center",
                borderRadius: "10",
              }}
              onPress={() => setOpenQuestion(!openQuestion)}
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
                    fontSize: 19,
                    color: "#6E6E6E",
                    letterSpacing: "-1%",
                  }}
                >
                  Hur hyr jag en produkt?
                </Text>
                <FontAwesomeIcon icon={faChevronUp} color="#6E6E6E" size={22} />
              </View>
              <View
                style={{
                  bottom: 0,
                }}
              >
                <Text textAlign="center" padding="3">
                  Inne på annonsen för produkt du önskar hyra finns en knapp där
                  det står "Skicka hyrförfrågan". Trycker du på den öppnas ett
                  fält där du väljer datum du önskar hyra produkten. Där får du
                  även ett totalpris för vad det kommer kosta att hyra produkten
                  mellan dessa datum. Efter att du skickat din förfrågan kan du
                  se status för din förfrågan på dina notifikationer.
                </Text>
              </View>
            </Pressable>
          </VStack>
        )}

        {!openQuestion2 ? (
          <VStack
            style={{
              margin: 1,
              marginBottom: 50,
            }}
            width="100%"
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
              onPress={() => setOpenQuestion2(!openQuestion2)}
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
                    fontSize: 19,
                    color: "#6E6E6E",
                    letterSpacing: "-1%",
                    width: 220,
                  }}
                >
                  Hur fungerar kontakten när jag ska hyra en produkt?
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
            alignSelf="flex-start"
          >
            <Pressable
              style={{
                backgroundColor: "#EAEAEA",
                height: 225,
                width: "80%",
                alignSelf: "center",
                borderRadius: "10",
              }}
              onPress={() => setOpenQuestion2(!openQuestion2)}
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
                    fontSize: 19,
                    color: "#6E6E6E",
                    letterSpacing: "-1%",
                    width: 220,
                  }}
                >
                  Hur fungerar kontakten när jag ska hyra en produkt?
                </Text>

                <FontAwesomeIcon icon={faChevronUp} color="#6E6E6E" size={22} />
              </View>
              <View
                style={{
                  bottom: 4,
                }}
              >
                <Text textAlign="center" padding="3">
                  När du har skickat en hyrförfrågan och den blir godkänd av
                  uthyraren, får du tillgång till uthyrarens email. Samtidigt
                  får uthyraren tillgång till din email. Det är då upp till er
                  som användare att sköta kontakten mellan varandra.
                </Text>
              </View>
            </Pressable>
          </VStack>
        )}

        {!openQuestion3 ? (
          <VStack
            style={{
              margin: 1,
              marginBottom: 50,
            }}
            width="100%"
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
              onPress={() => setOpenQuestion3(!openQuestion3)}
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
                    fontSize: 19,
                    color: "#6E6E6E",
                    letterSpacing: "-1%",
                  }}
                >
                  FRÅGA
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
              onPress={() => setOpenQuestion3(!openQuestion3)}
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
                    fontSize: 19,
                    color: "#6E6E6E",
                    letterSpacing: "-1%",
                  }}
                >
                  FRÅGA
                </Text>

                <FontAwesomeIcon icon={faChevronUp} color="#6E6E6E" size={22} />
              </View>
              <View
                style={{
                  bottom: 52,
                }}
              >
                <Text textAlign="center" padding="3">
                  SVAR
                </Text>
              </View>
            </Pressable>
          </VStack>
        )}

        <View marginX="auto" marginTop="10" alignItems="center">
          <Text marginBottom="5" fontFamily="MontserratRegular">
            Hittade du inte det du letade efter?
          </Text>
          <PrimaryButton
            label="Kontakta oss"
            onPress={() => Linking.openURL("mailto:golfrentinfo@gmail.com?")}
          />
        </View>
      </View>
    </ScrollView>
  );
}

export default HelpInfo;
