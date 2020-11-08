import React, { forwardRef, useContext } from 'react';
import PropTypes from 'prop-types';
import './styles/index.scss';
import AppContext from './common/AppContext';

// eslint-disable-next-line react/display-name
const Navbar = forwardRef(({ setModal }, ref) => {
  const { addedItems } = useContext(AppContext);
  function openCart() {
    setModal({
      showModal: true,
      modalType: 'showCart',
    });
  }
  return (
    <div ref={ref} className="navbar">
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

          <span onClick={openCart} aria-hidden="true">
            <i className="fa fa-shopping-cart"></i> {<sup>{addedItems.length}</sup>}
          </span>
        </div>
      </nav>
    </div>
  );
});

Navbar.propTypes = {
  setModal: PropTypes.func.isRequired,
};

export default Navbar;
