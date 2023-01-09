import { Center, ScrollView } from "native-base";
import { StyleSheet, Text, View, Image } from "react-native";
import PrimaryButton from "../inputs/PrimaryButton";

const Notifications = () => {
  return (
    <View style={styles.container}>
      <ScrollView vertical>
        <View style={styles.adsContainer}>
          <Text style={styles.title}>Mina annonser</Text>
          <View style={styles.adsCard}>
            <Text style={styles.cardText}>
              MaxAndersson vill hyra din produkt mellan 10-06-2023 - 13-06-2023
            </Text>
            <View style={styles.product}>
              <Image
                style={styles.image}
                source={{
                  uri: "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                }}
              ></Image>
              <View>
                <Text style={styles.productTitle}>Title</Text>
                <Text style={styles.productText}>Beskrivning</Text>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <PrimaryButton
                label="Acceptera"
                btnWidth={{ width: 130, marginTop: 25 }}
                // onPress={handleSubmit}
                // disabled={!isValid}
              />
              <PrimaryButton
                label="Neka"
                btnWidth={{
                  width: 130,
                  marginTop: 20,
                  backgroundColor: "#c32f27",
                }}
                // onPress={handleSubmit}
                // disabled={!isValid}
              />
            </View>
          </View>
        </View>
        <View style={styles.adsContainer}>
          <Text style={styles.title}>Hyrda produkter</Text>
          <View style={styles.adsCard}>
            <Text style={styles.cardText}>
              MaxAndersson vill hyra din produkt mellan 10-06-2023 - 13-06-2023
            </Text>
            <View style={styles.product}>
              <Image
                style={styles.image}
                source={{
                  uri: "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                }}
              ></Image>
              <View>
                <Text style={styles.productTitle}>Title</Text>
                <Text style={styles.productText}>Beskrivning</Text>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <PrimaryButton
                label="Acceptera"
                btnWidth={{ width: 130, marginTop: 25 }}
                // onPress={handleSubmit}
                // disabled={!isValid}
              />
              <PrimaryButton
                label="Neka"
                btnWidth={{
                  width: 130,
                  marginTop: 20,
                  backgroundColor: "#c32f27",
                }}
                // onPress={handleSubmit}
                // disabled={!isValid}
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
