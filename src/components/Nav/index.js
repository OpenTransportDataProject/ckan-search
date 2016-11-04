import React from 'react';
import classNames from 'classnames';

type Props ={
  hasShadow: Boolean,
  children: Object
};

const Nav = (props: Props) => (
  <div
    className={classNames('nav', {
      'has-shadow': props.hasShadow
    })}
  >
    {props.children}
  </div>
);

export default Nav;
export NavItem from './NavItem';
export NavPart from './NavPart';
