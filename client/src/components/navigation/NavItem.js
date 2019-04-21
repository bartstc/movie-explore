import React from 'react';
import PropTypes from 'prop-types';
import { NavItemWrapper } from './styled';
import { NavLink, Link } from 'react-router-dom';

const NavItem = ({ onClick, linkType, to, exact, children, withoutActive = false }) => (
  <NavItemWrapper>
    {withoutActive
      ? <NavLink
        onClick={onClick}
        className={["nav-link", linkType].join(' ')}
        to={to}
        exact={exact}>
        {children}
      </NavLink>
      : <Link
        onClick={onClick}
        className={["nav-link", linkType].join(' ')}
        to={to}
      >
        {children}
      </Link>
    }

  </NavItemWrapper>
)

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