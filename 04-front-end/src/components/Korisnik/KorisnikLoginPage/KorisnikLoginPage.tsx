import { useState } from "react";
import { Link } from "react-router-dom";
import './KorisnikLoginPage.sass';

export default function KorisnikLoginPage() {
    //ne smemo da ih kreiramo unutar nekih npr. IF-ova , moraju ovde ovako da postoje ... (pozivaju se globalno na samom pocetku)
    const [email, setEmail]     = useState<string>("");
    const [lozinka, setLozinka] = useState<string>("");


    //formiramo doLogin f-ju kao Arrow f-ju zato sto zelimo da this kontekst ostavimo i njoj dostupnim ...
    const doLogin = () => {
        console.log("Attempting to log in : ", email, lozinka);
    };

    return (
        <div className="row">
            <div className="col col-xs-12 col-md-6 offset-md-3">
                <h1 className="h5 mb-3">Prijavi se na svoj nalog</h1>

                <div className="form-group mb-3">
                    <div className="input-group">
                        <input className="form-control" type="text" placeholder="Unesi svoj email:" value={email}
                            onChange={ e => setEmail(e.target.value)} />
                    </div>
                </div>

                <div className="form-group mb-3">
                    <div className="input-group">
                        <input className="form-control" type="password" placeholder="Unesi svoju lozinku:" value={lozinka}
                            onChange={ e => setLozinka(e.target.value)} />
                    </div>
                </div>

                <div className="form-group">
                    <button className="btn btn-primary px-5 mt-3 mb-3 me-3 Button d-block" onClick={ () => doLogin() }>
                        PRIJAVA
                    </button>

                    <Link className="btn btn-success px-5 Button d-block" to="/auth/korisnik/registracija">
                        REGISTRACIJA
                    </Link>
                </div>
            </div>
        </div>
    );
}