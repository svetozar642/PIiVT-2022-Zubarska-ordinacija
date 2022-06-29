import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import'./KorisnikRegistrationPage.sass';

export default function KorisnikLoginPage() {
    //ne smemo da ih kreiramo unutar nekih npr. IF-ova , moraju ovde ovako da postoje ... (pozivaju se globalno na samom pocetku)
    const [email, setEmail]     = useState<string>("");
    const [lozinka, setLozinka] = useState<string>("");
    const [ime, setIme] = useState<string>("");
    const [prezime, setPrezime] = useState<string>("");
    const [korisnickoIme, setKorisnickoIme] = useState<string>("");
    const [jmbg, setJmbg] = useState<string>("");

    const navigate = useNavigate();

    //formiramo doLogin f-ju kao Arrow f-ju zato sto zelimo da this kontekst ostavimo i njoj dostupnim ...
    const doRegistration = () => {
        console.log("Attempting to register account : ", email, lozinka, korisnickoIme, ime ,prezime, jmbg);

        navigate("/auth/korisnik/registracija/uspesna", {
            replace: true,
        });
    };

    return (
        <div className="row">
            <div className="col col-xs-12 col-md-6 offset-md-3">
                <h1 className="h5 mb-3">Registruj novi nalog</h1>
                
                <div className="form-group mb-3">
                    <div className="input-group">
                        <input className="form-control" type="text" placeholder="Unesi svoje korisnicko ime..." value={korisnickoIme}
                            onChange={ e => setKorisnickoIme(e.target.value)} />
                    </div>
                </div>

                <div className="form-group mb-3">
                    <div className="input-group">
                        <input className="form-control" type="password" placeholder="Unesi svoju lozinku..." value={lozinka}
                            onChange={ e => setLozinka(e.target.value)} />
                    </div>
                </div>

                <div className="form-group mb-3">
                    <div className="input-group">
                        <input className="form-control" type="text" placeholder="Unesi svoje ime..." value={ime}
                            onChange={ e => setIme(e.target.value)} />
                    </div>
                </div>

                <div className="form-group mb-3">
                    <div className="input-group">
                        <input className="form-control" type="text" placeholder="Unesi svoje prezime..." value={prezime}
                            onChange={ e => setPrezime(e.target.value)} />
                    </div>
                </div>

                <div className="form-group mb-3">
                    <div className="input-group">
                        <input className="form-control" type="text" placeholder="Unesi svoj email..." value={email}
                            onChange={ e => setEmail(e.target.value)} />
                    </div>
                </div>

                <div className="form-group mb-3">
                    <div className="input-group">
                        <input className="form-control" type="text" placeholder="Unesi svoj jmbg..." value={jmbg}
                            onChange={ e => setJmbg(e.target.value)} />
                    </div>
                </div>

                <div className="form-group">
                    <button className="btn btn-success  mt-3 mb-3 me-3 Button d-block" onClick={ () => doRegistration() }>
                        KREIRAJ NALOG
                    </button>

                    <Link className="btn btn-danger  Button d-block" to="/auth/korisnik/prijava">
                        ODUSTANI
                    </Link>
                </div>
            </div>
        </div>
    );
}