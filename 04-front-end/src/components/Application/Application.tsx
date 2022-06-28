import React from 'react';
import './Application.sass';
import { Container} from 'react-bootstrap';
import KorisnikLoginPage from '../Korisnik/KorisnikLoginPage/KorisnikLoginPage';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Menu from '../Menu/Menu';
import Pacijenti from '../Korisnik/Pacijent/Pacijenti';
import Pacijent from '../Korisnik/Pacijent/Pacijent';


function Application() {
  return (
    <Container className='mt-4'>
      <Menu/>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <div></div>}/>
          <Route path='auth/korinsik/prijava' element={<KorisnikLoginPage/>} />
          <Route path='pacijenti' element={<Pacijenti/>} />
          <Route path='pacijent/jmbg/:jmbg' element={<Pacijent/>} />
        </Routes>
      </BrowserRouter>

      
    </Container>
  );
}

export default Application;
