import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/react-hooks';
import './App.css';
import Modal from './common/Modal';
import Content from './Content';
import Navbar from './Navbar';

const GET_ITEMS = gql`
  query getProducts {
    products {
      title
    }
  }
`;

function App() {
  const [modal, setModal] = useState({
    showModal: false, // true or false
    modalType: undefined, // string: create, read, update, or delete,
    modalItemId: '', // Used in times if updating or deleting.
  });
  const { loading, error, data } = useQuery(GET_ITEMS);
  console.log(loading, error, data);
  function getModalToShow() {
    switch (modal.modalType) {
      case 'create':
        return null;
      default:
        return null;
    }
  }
  return (
    <div>
      <Navbar {...{ modal, setModal }} />
      <Content />
      <Modal {...{ modal, setModal }}>{getModalToShow()}</Modal>
    </div>
  );
}

export default App;
