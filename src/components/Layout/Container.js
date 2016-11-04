import React from 'react';
import classNames from 'classnames';

type Props ={
  fluid: Boolean,
  children: Array
};

const Container = (props: Props) => (
  <div
    className={classNames('container', {
      'is-fluid': props.fluid
    })}
  >
    {props.children}
  </div>
);

export default Container;
