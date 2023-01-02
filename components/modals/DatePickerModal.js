import React from "react";
import { Button, Modal, Center } from "native-base";
import DatePicker from "../inputs/DatePicker";
import PrimaryButton from "../inputs/PrimaryButton";

export default function DatePickerModal({ openModal, setOpenModal, price }) {
  return (
    <Center>
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Hyrförfrågan</Modal.Header>
          <Modal.Body>
            <DatePicker price={price} />
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setOpenModal(false);
                }}
              >
                Avbryt
              </Button>
              <PrimaryButton
                label="Skicka"
                btnWidth={{ width: 80 }}
                onPress={() => setOpenModal(false)}
              />
              {/* <Button
                onPress={() => {
                  setOpenModal(false);
                }}
              >
                Skicka
              </Button> */}
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  );
}
