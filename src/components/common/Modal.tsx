import React from 'react'
import { Modal as BsModal, Button } from 'react-bootstrap'

interface ModalProps {
  show: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  primaryButtonText?: string
  onPrimaryAction?: () => void
  secondaryButtonText?: string
  onSecondaryAction?: () => void
}

const Modal: React.FC<ModalProps> = ({
  show,
  onClose,
  title,
  children,
  primaryButtonText,
  onPrimaryAction,
  secondaryButtonText,
  onSecondaryAction,
}) => {
  return (
    <BsModal show={show} onHide={onClose}>
      <BsModal.Header closeButton>
        <BsModal.Title>{title}</BsModal.Title>
      </BsModal.Header>
      <BsModal.Body>{children}</BsModal.Body>
      <BsModal.Footer>
        {secondaryButtonText && (
          <Button
            variant="secondary"
            onClick={onSecondaryAction || onClose}
          >
            {secondaryButtonText}
          </Button>
        )}
        {primaryButtonText && (
          <Button
            variant="primary"
            onClick={onPrimaryAction}
          >
            {primaryButtonText}
          </Button>
        )}
      </BsModal.Footer>
    </BsModal>
  )
}

export default Modal
