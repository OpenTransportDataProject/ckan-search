import React from 'react';
import classNames from 'classnames';
import HeroFooter from './HeroFooter';

type Props ={
  size: 'medium' | 'large' | 'fullheight',
  color: 'primary' | 'info' | 'success' | 'warning' | 'danger' | 'light' | 'dark',
  gradient: Boolean,
  class: String,
  title: String,
  subtitle: String,
  tabs: Array
};

const createMarkup = (html) => ({ __html: html });

const Hero = (props: Props) => (
  <section
    className={classNames(`hero ${props.class}`, {
      [`is-${props.size}`]: props.size,
      [`is-${props.color}`]: props.color,
      'is-bold': props.gradient,
    })}
  >
    <div className='hero-body'>
      <div className='container'>
        <h1 className='title'>
          {props.title}
        </h1>
        <h2 className='subtitle' dangerouslySetInnerHTML={createMarkup(props.subtitle)} />
        {props.children}
      </div>
    </div>
    {props.tabs && <HeroFooter tabs={props.tabs} />}
  </section>
);

export default Hero;
