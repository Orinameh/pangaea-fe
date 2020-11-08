import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function CartItems({
  addedItems,
  data: { currency, products },
  setCurrency,
  currency: curr_,
  setModal,
  setAddedItems,
}) {
  const [sub, setSub] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  //   https://stackoverflow.com/questions/47956344/lodash-count-duplicate-and-then-remove-them
  useEffect(() => {
    if (addedItems.length > 0) {
      // This helps to update the addedItems when there is a currency change
      const updatedAddedItems = products.filter((prod) =>
        addedItems.some((item) => prod.id === item.id),
      );

      const uniqueItems = addedItems.reduce((accum, val) => {
        const dupeIndex = accum.findIndex((arrayItem) => arrayItem.id === val.id);
        if (dupeIndex === -1) {
          // Not found, so initialize.
          accum.push({
            qty: 1,
            ...val,
          });
        } else {
          // Found, so increment counter.
          accum[dupeIndex].qty++;
        }
        return accum;
      }, []);

      //   Look for a better way Dave!
      const cartItems = uniqueItems.map((item) => ({
        ...item,
        ...{ price: updatedAddedItems.find((it) => it.id === item.id).price },
      }));

      setCartItems(cartItems);
    }
  }, []);

  useEffect(() => {
    if (cartItems.length > 0) {
      const total = cartItems.reduce((acc, val) => acc + val.qty * val.price, 0);
      setSub(total);
    }
  }, [cartItems]);

  function increase(i) {
    const items = [...cartItems];
    let { qty } = items[i];
    setAddedItems((prevState) => [...prevState, items[i]]);

    qty++;
    cartItems[i].qty = qty;
    setCartItems(items);
    setModal({
      showModal: true,
      modalType: 'showCart',
    });
  }

  function decrease(i) {
    let filtered;
    const items = [...cartItems];
    let { qty, id } = items[i];
    qty--;
    cartItems[i].qty = qty;
    if (qty < 1) {
      filtered = items.filter((item) => item.id !== id);
      setCartItems(filtered);
      setAddedItems(addedItems.filter((item) => item.id !== id));
      setModal({
        showModal: true,
        modalType: 'showCart',
      });
    } else {
      cartItems[i].qty = qty;
      setCartItems(items);
    }
  }

  if (cartItems.length === 0) {
    return <div>No items in your cart</div>;
  }
  function close() {
    setModal({
      showModal: false,
      modalType: undefined,
    });
  }
  return (
    <div className="cart">
      <div className="cart__top">
        <div className="cart__top-control">
          <span>
            <i onClick={close} aria-hidden="true" className="fa fa-caret-left" />
          </span>
          <p>Your Cart</p>
          <p></p>
        </div>
        <div className="cart__top-select">
          {/* eslint-disable-next-line jsx-a11y/no-onchange */}
          <select value={curr_} onChange={(e) => setCurrency(e.target.value)}>
            {currency.map((curr) => (
              <option key={curr} value={curr}>
                {curr}
              </option>
            ))}
          </select>
        </div>
      </div>
      {cartItems.map(({ qty, image_url, title, price }, i) => {
        return (
          <div key={i} className="cart__items">
            <div className="cart__items-top">
              <p>{title}</p>
              <span>X</span>
            </div>
            <div className="cart__items-mid">
              <img src={image_url} loading="lazy" alt="cart-img" />
            </div>
            <div className="cart__items-bottom">
              <div>
                <span role="button" aria-hidden="true" tabIndex="0" onClick={() => decrease(i)}>
                  -
                </span>
                <span>{qty}</span>
                <span role="button" aria-hidden="true" tabIndex="0" onClick={() => increase(i)}>
                  +
                </span>
              </div>
              <p>
                {new Intl.NumberFormat('en', { style: 'currency', currency: curr_ }).format(
                  price * qty,
                )}
              </p>
              <p></p>
            </div>
          </div>
        );
      })}
      <div className="cart-total">
        <hr />
        <div className="cart-total__sub">
          <p>Subtotal</p>
          <p>{new Intl.NumberFormat('en', { style: 'currency', currency: curr_ }).format(sub)}</p>
        </div>
        <div className="cart-total__save">Make this a subscription (Save 20%)</div>
        <div className="cart-total__checkout">Proceed to checkout </div>
      </div>
    </div>
  );
}

CartItems.propTypes = {
  data: PropTypes.shape({
    currency: PropTypes.array.isRequired,
    products: PropTypes.array,
  }).isRequired,
  setCurrency: PropTypes.func.isRequired,
  currency: PropTypes.string.isRequired,
  addedItems: PropTypes.array.isRequired,
  setModal: PropTypes.func.isRequired,
  //   cartItems: PropTypes.array.isRequired,
  setAddedItems: PropTypes.func.isRequired,
};

export default CartItems;
