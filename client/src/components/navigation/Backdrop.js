import React from 'react';
import PropTypes from 'prop-types';
import { BackdropWrapper } from './styled';

const Backdrop = ({ open, hide }) => {
  return (
    open ? <BackdropWrapper onHide={hide}></BackdropWrapper> : null
  );
}

Backdrop.propTypes = {
  open: PropTypes.bool,
  hide: PropTypes.func
};

export default Backdrop;