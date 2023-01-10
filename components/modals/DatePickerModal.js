import React from "react";
import { Button, Modal, Center } from "native-base";
import DatePicker from "../inputs/DatePicker";
import PrimaryButton from "../inputs/PrimaryButton";

export default function DatePickerModal({
  openModal,
  setOpenModal,
  price,
  productId,
  user,
}) {
  return (
    <Center>
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Hyrförfrågan</Modal.Header>
          <Modal.Body>
            <DatePicker
              price={price}
              productId={productId}
              openModal={openModal}
              setOpenModal={setOpenModal}
              user={user}
            />
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </Center>
  );
}
