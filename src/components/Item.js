import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../common/AppContext';

function Item({ title, image, price, id }) {
  const { data, currency, navRef, setAddedItems, setModal } = useContext(AppContext);
  function addToCart(val) {
    // setItemAdded((prevState) => prevState + 1);
    const selected = data.products.find(({ id }) => id === val);
    setAddedItems((prevState) => {
      return [...prevState, selected];
    });
    setModal({
      showModal: true,
      modalType: 'showCart',
    });
    // Helps to scroll the page up when item is added to cart so users can see the count
    navRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className="content__main--item">
      <img src={image} loading="lazy" alt="item" />
      <p className="title">{title}</p>
      <p className="price">
        {new Intl.NumberFormat('en', { style: 'currency', currency }).format(price)}
      </p>
      <button onClick={() => addToCart(id)}>Add to cart</button>
    </div>
  );
}

Item.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
};
export default Item;
