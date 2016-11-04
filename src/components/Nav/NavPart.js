import React from 'react';
import classNames from 'classnames';

type Props ={
  location: 'left' | 'center' | 'right',
  children: Object
};

const NavPart = (props: Props) => (
  <div className={classNames(`nav-${props.location}`)}>
    {props.children}
  </div>
);

export default NavPart;
