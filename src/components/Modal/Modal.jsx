import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalWindow } from './Modal.style';

const modalRoot = document.querySelector('#modal-root');
export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', e => {
      if (e.code === 'Escape') {
        console.log(e.code);
        this.props.onClose();
      }
    });
  }

  render() {
    return createPortal(
      <Overlay>
        <ModalWindow>{this.props.children}</ModalWindow>
      </Overlay>,
      modalRoot
    );
  }
}
