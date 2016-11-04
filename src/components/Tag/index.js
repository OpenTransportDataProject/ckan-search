import React from 'react';
import classNames from 'classnames';
import './Tag.scss';

type Props ={
  size: 'medium' | 'large' | 'fullheight',
  color: 'primary' | 'info' | 'success' | 'warning' | 'danger' | 'light' | 'dark',
  children: Text
};

const Tag = (props: Props) => (
  <span
    className={classNames('tag', {
      [`is-${props.size}`]: props.size,
      [`is-${props.color}`]: props.color
    })}
  >
    {props.children}
  </span>
);

export default Tag;
