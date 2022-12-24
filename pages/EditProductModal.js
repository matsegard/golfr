import { StyleSheet, View, Text } from "react-native";
import { Modal, Center, Input, Select } from "native-base";
import PrimaryButton from "../components/PrimaryButton";

export default function EditProductModal({ open, setOpen }) {
  return (
    <Center>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        onBackdropPress={() => setOpen(false)}
      >
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Redigera</Modal.Header>
          <Modal.Body>
            <View style={styles.editFormContainer}>
              <View style={styles.form}>
                <Text
                  style={{
                    fontFamily: "MontserratSemiBold",
                    color: "#878787",
                    marginBottom: 8,
                  }}
                >
                  Titel
                </Text>
                <Input variant="underlined" placeholder="Skriv en titel" />
              </View>
              <View style={styles.form}>
                <Text
                  style={{
                    fontFamily: "MontserratSemiBold",
                    color: "#878787",
                    marginBottom: 8,
                  }}
                >
                  Bild
                </Text>
                <Input variant="underlined" placeholder="Välj bild" />
              </View>

              <View style={styles.form}>
                <Text
                  style={{
                    fontFamily: "MontserratSemiBold",
                    color: "#878787",
                    marginBottom: 8,
                  }}
                >
                  Beskrivning
                </Text>
                <Input variant="underlined" placeholder="Beskrivning" />
              </View>
              <View style={styles.form}>
                <Text
                  style={{
                    fontFamily: "MontserratSemiBold",
                    color: "#878787",
                    marginBottom: 8,
                  }}
                >
                  Pris
                </Text>
                <Input variant="underlined" placeholder="Ange pris" />
              </View>
              <View style={styles.form}>
                <Text
                  style={{
                    fontFamily: "MontserratSemiBold",
                    color: "#878787",
                    marginBottom: 8,
                  }}
                >
                  Kategori
                </Text>
                <Select
                  variant="underlined"
                  accessibilityLabel="Choose Service"
                  placeholder="Välj kategori"
                  _selectedItem={{
                    bg: "#6A8E4E",
                  }}
                >
                  <Select.Item label="Golfset" value="Golfset" />
                  <Select.Item label="Vagn/bag" value="Vagn/bag" />
                  <Select.Item label="Golfklubba" value="Golfklubba" />
                  <Select.Item label="Golfbil" value="Golfbil" />
                  <Select.Item label="Övrigt" value="Övrigt" />
                </Select>
              </View>
              <View style={styles.form}>
                <Text
                  style={{
                    fontFamily: "MontserratSemiBold",
                    color: "#878787",
                    marginBottom: 8,
                  }}
                >
                  Plats
                </Text>
                <Select
                  variant="underlined"
                  accessibilityLabel="Choose Service"
                  placeholder="Ange plats"
                  _selectedItem={{
                    bg: "#6A8E4E",
                  }}
                >
                  <Select.Item label="UX Research" value="ux" />
                  <Select.Item label="Web Development" value="web" />
                  <Select.Item
                    label="Cross Platform Development"
                    value="cross"
                  />
                  <Select.Item label="UI Designing" value="ui" />
                  <Select.Item label="Backend Development" value="backend" />
                </Select>
              </View>
            </View>
          </Modal.Body>
          <Modal.Footer>
            <PrimaryButton
              label="Spara"
              btnWidth={{ width: 182, marginRight: 50 }}
              onPress={() => setOpen(false)}
            />
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: "1",
    backgroundColor: "FAFAFA",
    justifyContent: "center",
    alignItems: "center",
  },
  forms: {
    position: "absolute",
    top: 280,
  },
  form: {
    marginTop: 30,
  },
});
