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
import KorisnikNovaIntervencija from '../Korisnik/Dashboard/KorisnikNovaIntervencija';
import KorisnikKartonPacijentaUnos from '../Korisnik/Dashboard/KorisnikKartonPacijentaUnos';
import KorisnikKartonPacijenta from '../Korisnik/Dashboard/KorisnikKartonPacijenta';
import KorisnikPacijentDeaktivacija from '../Korisnik/Dashboard/KorisnikPacijentDeaktivacija';
import KorisnikUslugaDeaktivacija from '../Korisnik/Dashboard/KorisnikUslugaDeaktivacija';
import KorisnikNovaIntervencijaPacijenti from '../Korisnik/Dashboard/KorisnikNovaIntervencijaPacijenti';
import KorisnikNovaIntervencijaRacun from '../Korisnik/Dashboard/KorisnikNovaIntervencijaRacun';
import KorisnikPacijentiDodaj from '../Korisnik/Dashboard/KorisnikPacijentiDodaj';
import KorisnikPacijentiIzmeni from '../Korisnik/Dashboard/KorisnikPacijentiIzmeni';
import KorisnikUslugaDodaj from '../Korisnik/Dashboard/KorisnikUslugaDodaj';
import KorisnikUslugaIzmeni from '../Korisnik/Dashboard/KorisnikUslugaIzmeni';
import KorisnikNovaIntervencijaDodajUsluguNaZub from '../Korisnik/Dashboard/KorisnikNovaIntervencijaDodajUsluguNaZub';

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
        <Route path="korisnik/dashboard/nova_intervencija" element={<KorisnikNovaIntervencija/>} />
        <Route path="korisnik/dashboard/karton_pacijenta_unos" element={<KorisnikKartonPacijentaUnos/>} />
        <Route path="korisnik/dashboard/karton_pacijenta_unos/karton_pacijenta" element={<KorisnikKartonPacijenta/>} />
        <Route path="korisnik/dashboard/pacijenti/pacijenti_deaktiviraj" element={<KorisnikPacijentDeaktivacija/>} />
        <Route path="korisnik/dashboard/usluge/usluge_deaktiviraj" element={<KorisnikUslugaDeaktivacija/>} />
        <Route path="korisnik/dashboard/nova_intervencija/pacijenti" element={<KorisnikNovaIntervencijaPacijenti/>} />
        <Route path="korisnik/dashboard/nova_intervencija/racun" element={<KorisnikNovaIntervencijaRacun/>} />
        <Route path="korisnik/dashboard/pacijenti/pacijenti_dodaj" element={<KorisnikPacijentiDodaj/>} />
        <Route path="korisnik/dashboard/pacijenti/pacijenti_izmeni/:jmbg" element={<KorisnikPacijentiIzmeni/>} />
        <Route path="korisnik/dashboard/usluge/usluge_dodaj" element={<KorisnikUslugaDodaj/>} />
        <Route path="korisnik/dashboard/usluge/usluge_izmeni/:sifra_usluge" element={<KorisnikUslugaIzmeni/>} />
        <Route path="korisnik/dashboard/nova_intervencija/dodaj_uslugu_na_zub" element={<KorisnikNovaIntervencijaDodajUsluguNaZub/>} />
      </Routes>

      
    </Container>
  );
}

export default Application;
