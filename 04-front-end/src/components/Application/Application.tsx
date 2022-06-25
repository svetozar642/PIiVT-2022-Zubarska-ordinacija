import React from 'react';
import './Application.sass';
import {Button, Container} from 'react-bootstrap';
import KorisnikLoginPage from '../Korisnik/KorisnikLoginPage/KorisnikLoginPage';

function Application() {
  return (
    <Container className='mt-4'>
      <KorisnikLoginPage/>
    </Container>
  );
}

export default Application;
