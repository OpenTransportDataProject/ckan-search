import React from 'react';
import { Container } from '../Layout';
import Nav, { NavPart, NavItem } from '../Nav';
import './Header.scss';

const Header = () => (
  <header>
    <Nav hasShadow>
      <Container>
        <NavPart location='left'>
          <NavItem uri='/'>
            <img className='brand' src='/images/logo.png' alt='CKAN Search' />
            <h1 className='title'>Open Transport Data</h1>
          </NavItem>
        </NavPart>
      </Container>
    </Nav>
  </header>
);

export default Header;
