import React from 'react';
import PropTypes from 'prop-types';

function Item({ data }) {
  return (
    <div className="content__main--item">
      <img src={`https://via.placeholder.com/150`} loading="lazy" alt="item" />
      <p className="title">Title {data}</p>
      <p className="price">Title</p>
      <button>Add to cart</button>
    </div>
  );
}

Item.propTypes = {
  data: PropTypes.any,
};
export default Item;
