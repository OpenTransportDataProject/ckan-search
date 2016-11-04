// @flow
import React from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';

type Props ={
  uri: String,
  isTab: Boolean,
  isActive: Boolean,
  isBrand: Boolean,
  children: Object | String
};

const NavItem = (props: Props) => (
  <Link
    to={props.uri}
    activeClassName='is-active'
    className={classNames('nav-item', {
      'is-brand': props.isBrand,
      'is-active': props.isActive,
      'is-tab': props.isTab
    })}
  >
    {props.children}
  </Link>
);

export default NavItem;
