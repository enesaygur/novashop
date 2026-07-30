import Button from "./Button/Button";
import styles from "./Modal.module.css";
import type { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
}

function Modal({ isOpen, title, children, onClose }: ModalProps) {
  if (!isOpen) {
    return null;
  }
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>{title}</h2>
        {children}
        <Button variant="secondary" className={styles.closeButton} onClick={onClose}>
          x
        </Button>
      </div>
    </div>
  );
}

export default Modal;
