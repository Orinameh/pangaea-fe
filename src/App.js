import React, { createContext, useRef, useState } from 'react';
import { useQuery, gql } from '@apollo/react-hooks';
import Modal from './common/Modal';
import Content from './Content';
import Navbar from './Navbar';
import { AppProvider } from './common/AppContext';
import CartItems from './components/CartItems';

const GET_ITEMS = gql`
  query getProducts($currency: Currency) {
    currency
    products {
      id
      image_url
      title
      price(currency: $currency)
    }
  }
`;
export const ProdContext = createContext(undefined);

function App() {
  const [currency, setCurrency] = useState('USD');
  const [addedItems, setAddedItems] = useState([]);
  const navRef = useRef();

  const { loading, error, data } = useQuery(GET_ITEMS, {
    variables: { currency },
  });

  const [modal, setModal] = useState(
    addedItems.length > 0
      ? {
          showModal: true,
          modalType: 'showCart',
        }
      : {
          showModal: false,
          modalType: undefined,
          modalItemId: '',
        },
  );

  function getModalToShow() {
    switch (modal.modalType) {
      case 'showCart':
        return (
          <CartItems
            {...{
              addedItems,
              data,
              setCurrency,
              currency,
              modal,
              setModal,
              setAddedItems,
              // cartItems,
              // setCartItems,
            }}
          />
        );
      default:
        return null;
    }
  }

  if (loading) {
    return <div className="loading">Loading Products...</div>;
  }

  if (error) {
    return <div className="error">{error.message}</div>;
  }
  return (
    <div>
      <AppProvider
        value={{
          data,
          setModal,
          currency,
          setCurrency,
          navRef,
          setAddedItems,
          addedItems,
        }}>
        <Navbar ref={navRef} {...{ setModal }} />
        <Content />
      </AppProvider>
      <Modal {...{ modal, setModal }}>{getModalToShow()}</Modal>
    </div>
  );
}

export default App;
