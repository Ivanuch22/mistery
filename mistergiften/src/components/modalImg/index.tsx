// ImageModal.tsx
import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Set the root element for accessibility

interface ImageModalProps {
  isOpen: boolean;
  closeModal: () => void;
  imageUrl: string;
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  closeModal,
  imageUrl,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Image Modal"
      className="image-modal"
      overlayClassName="overlay"
    >
      <img
        width="40px"
        height="40px"
        decoding="async"
        src={imageUrl}
        alt="Large Image"
        className="modal-image"
      />
      <button className="close-button" onClick={closeModal}>
        Close
      </button>
    </Modal>
  );
};

export default ImageModal;
