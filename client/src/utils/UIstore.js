import React, { useState, createContext } from 'react';

export const SideDrawerContext = createContext(false);
export const ModalContext = createContext(false);

const UIstore = ({ children }) => {
  // SideDrawer store
  const [open, setOpen] = useState(false);

  // Modal store
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);

  const handleModal = (message, error) => {
    setShow(true);
    setMessage(message);
    setError(error);

    setTimeout(() => {
      setShow(false);
      setMessage(null);
      setError(false);
    }, 2500)
  };

  return (
    <SideDrawerContext.Provider value={[open, setOpen]}>
      <ModalContext.Provider value={{ show, message, error, handleModal }}>
        {children}
      </ModalContext.Provider>
    </SideDrawerContext.Provider >
  );
};

export default UIstore;