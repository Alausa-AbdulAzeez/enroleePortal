import * as React from "react";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({
  open,
  handleClose,
  FeedbackModalComponent,
  selectedProvider,
}) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="h-[100%] w-[100%] flex items-center justify-center "
      >
        <>
          <FeedbackModalComponent
            selectedProvider={selectedProvider}
            handleClose={handleClose}
          />
        </>
      </Modal>
    </div>
  );
}
