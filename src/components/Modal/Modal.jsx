import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalWindow } from './Modal.style';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');
export const Modal = ({ onClose, children }) => {
  useEffect(() => {
    window.addEventListener('keydown', onEscClick);
    return () => {
      window.removeEventListener('keydown', onEscClick);
    };
  }, []);

  const onEscClick = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const onBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={onBackdropClick}>
      <ModalWindow>{children}</ModalWindow>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
};
