import React from 'react';
import styled from 'styled-components';

const Backdrop = ({ open, hide }) => {
  return (
    open ? <BackdropWrapper onClick={hide}></BackdropWrapper> : null
  );
}

const BackdropWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;
  background: rgba(0,0,0, .7);
`;

export default Backdrop;