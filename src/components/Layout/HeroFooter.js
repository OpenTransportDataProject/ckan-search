import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';


type Props={
  tabs: Array
};

const HeroFooter = (props: Props) => (
  <div className="hero-foot">
      <nav className="tabs is-boxed is-fullwidth">
        <div className="container">
          <ul>
            {props.tabs.map(tab => (
              <li key={tab.uri}>
                <Link
                  to={tab.uri}
                  activeClassName='is-active'
                >
                  {tab.lable}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
);

export default HeroFooter;
