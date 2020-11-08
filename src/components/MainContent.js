import React, { useContext } from 'react';
import AppContext from '../common/AppContext';
import Item from './Item';

function MainContent() {
  const { data } = useContext(AppContext);
  return (
    <div className="content__main">
      {data.products.map(({ title, image_url, price, id }, i) => (
        <Item key={i} {...{ title, image: image_url, price, id }} />
      ))}
    </div>
  );
}

export default MainContent;
