import React from 'react';
import './Application.sass';
import { Container} from 'react-bootstrap';
import KorisnikLoginPage from '../Korisnik/KorisnikLoginPage/KorisnikLoginPage';
import { Routes, Route} from 'react-router-dom';
import Menu from '../Menu/Menu';
import Pacijenti from '../Korisnik/Pacijent/Pacijenti';
import Pacijent from '../Korisnik/Pacijent/Pacijent';
import KorisnikDashboard from '../Korisnik/Dashboard/KorisnikDashboard';
import KorisnikUsluge from '../Korisnik/Dashboard/KorisnikUsluge';
import KorisnikPacijenti from '../Korisnik/Dashboard/KorisnikPacijenti';


function Application() {
  return (
    <Container className='mt-4'>

      <Routes>
        <Route path='/' element={ <div></div>}/>
        <Route path='auth/korinsik/prijava' element={<KorisnikLoginPage/>} />

        <Route path='pacijent/jmbg/:jmbg' element={<Pacijent/>} />

        <Route path="korisnik/dashboard" element={<KorisnikDashboard/>} />
        <Route path="korisnik/dashboard/usluge" element={<KorisnikUsluge/>} />
        <Route path="korisnik/dashboard/pacijenti" element={<KorisnikPacijenti/>} />
      </Routes>

      
    </Container>
  );
}

export default Application;
