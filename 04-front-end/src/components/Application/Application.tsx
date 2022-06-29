import React from 'react';
import './Application.sass';
import { Container} from 'react-bootstrap';
import { Routes, Route} from 'react-router-dom';
import KorisnikRegistrationPage from '../Korisnik/KorisnikRegistrationPage/KorisnikRegistrationPage';
import KorisnikLoginPage from '../Korisnik/KorisnikLoginPage/KorisnikLoginPage';
import KorisnikRegistrationPageSuccess from '../Korisnik/KorisnikRegistrationPage/KorisnikRegistrationPageSuccess';
import Pacijent from '../Korisnik/Pacijent primer/Pacijent';
import KorisnikDashboard from '../Korisnik/Dashboard/KorisnikDashboard';
import KorisnikUsluge from '../Korisnik/Dashboard/KorisnikUsluge';
import KorisnikPacijenti from '../Korisnik/Dashboard/KorisnikPacijenti';

function Application() {
  return (
    <Container className='mt-4'>

      <Routes>
        <Route path='/' element={ <div></div>}/>
        <Route path='auth/korisnik/prijava' element={<KorisnikLoginPage/>} />
        <Route path='auth/korisnik/registracija' element={<KorisnikRegistrationPage/>} />
        <Route path='auth/korisnik/registracija/uspesna' element={<KorisnikRegistrationPageSuccess/>} />

        <Route path='pacijent/jmbg/:jmbg' element={<Pacijent/>} />

        <Route path="korisnik/dashboard" element={<KorisnikDashboard/>} />
        <Route path="korisnik/dashboard/usluge" element={<KorisnikUsluge/>} />
        <Route path="korisnik/dashboard/pacijenti" element={<KorisnikPacijenti/>} />
      </Routes>

      
    </Container>
  );
}

export default Application;
