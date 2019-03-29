import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const NavItem = ({ onClick, linkType, to, exact, children }) => (
  <ListItem
    className="nav-link-wrapper">
    <NavLink
      onClick={onClick}
      className={["nav-link", linkType].join(' ')}
      to={to}
      exact={exact}>
      {children}
    </NavLink>
  </ListItem>
)

const ListItem = styled.li`

  .nav-link {
    color: #fff;
    transition: color .2s ease-in-out;

    &:hover {
      color: #B41027;
    }

    &.active {
      color: #B41027;
    }
  }

  .nav-icon {
    font-size: 1em;
  }
`;

NavItem.propTypes = {
  linkType: PropTypes.string,
  to: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  exact: PropTypes.bool
};

NavItem.defaultProps = {
  exact: true
};

export default NavItem;