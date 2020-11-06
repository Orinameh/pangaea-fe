import React from 'react';
import PropTypes from 'prop-types';
import './styles/index.scss';

function Navbar({ setModal }) {
  function openCart() {
    setModal({
      showModal: true,
      modalType: 'create',
    });
  }
  return (
    <div className="navbar">
      <nav>
        <div className="left">
          <p>LUMIN</p>
          <div>
            <span>Shop</span>
            <span>Learn</span>
          </div>
        </div>
        <div className="right">
          <p>Account</p>
          <i onClick={openCart} className="fa fa-shopping-cart" aria-hidden="true"></i>
        </div>
      </nav>
    </div>
  );
}

Navbar.propTypes = {
  setModal: PropTypes.func.isRequired,
};

export default Navbar;
