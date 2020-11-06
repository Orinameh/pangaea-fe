import React from 'react';
import PropTypes from 'prop-types';
import ModalPortal from './ModalPortal';

function Modal({ children, modal, setModal }) {
  if (modal.showModal) {
    return (
      <ModalPortal {...{ modal, setModal }}>
        <div className="modalFormBlock">{children}</div>
      </ModalPortal>
    );
  }

  return null;
}

Modal.propTypes = {
  children: PropTypes.node,
  setModal: PropTypes.func,
  modal: PropTypes.shape({
    showModal: PropTypes.bool.isRequired,
    modalType: PropTypes.string,
    modalItemId: PropTypes.any,
  }),
};

export default Modal;
