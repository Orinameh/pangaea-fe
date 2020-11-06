import React from 'react';
import Item from './Item';

function MainContent() {
  return (
    <div className="content__main">
      {[...Array(9).keys()].map((i) => (
        <Item key={i} {...{ data: i }} />
      ))}
    </div>
  );
}

export default MainContent;
