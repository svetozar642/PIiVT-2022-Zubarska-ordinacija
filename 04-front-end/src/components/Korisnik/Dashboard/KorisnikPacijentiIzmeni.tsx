import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './KorisnikPacijenti.sass';
import { useParams } from 'react-router-dom';
import { IPacijentPageUrlParams } from "../Pacijent primer/Pacijent";

export default function KorisnikPacijentiIzmeni() {
    //ne smemo da ih kreiramo unutar nekih npr. IF-ova , moraju ovde ovako da postoje ... (pozivaju se globalno na samom pocetku)
    const [email, setEmail]     = useState<string>("");
    const [lozinka, setLozinka] = useState<string>("");
    const [ime, setIme] = useState<string>("");
    const [prezime, setPrezime] = useState<string>("");
    const [adresa, setAdresa] = useState<string>("");
    const [jmbg, setJmbg] = useState<string|undefined>("");
    const [telefon, setTelefon] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    const [senioritet, setSenioritet] = useState<string>("");

    const navigate = useNavigate();


    const params = useParams<IPacijentPageUrlParams>();

    //formiramo doLogin f-ju kao Arrow f-ju zato sto zelimo da this kontekst ostavimo i njoj dostupnim ...
    const doEditPacijent = () => {
        console.log("Attempting to register account : ", ime,prezime,jmbg,adresa,telefon,email,status,senioritet);
        
        setJmbg(params.jmbg);

        navigate("/korisnik/dashboard/pacijenti", {
            replace: true,
        });
    };

    return (
        <div className="row">
            <div className="col col-xs-12 col-md-6 offset-md-3">
                <div className="card-header  offset-md-4 mb-4">
                    <img src={require('../../../resources/dentist-logo.jpg')}  alt="zub-logo" />
                </div>

                <h1 className="h5 mb-3">Dodaj novog pacijenta :</h1>
                
                <div className="form-group mb-3">
                    <div className="input-group">
                        <input className="form-control" type="text" placeholder="Unesi ime pacijenta..." value={ime}
                            onChange={ e => setIme(e.target.value)} />
                    </div>
                </div>

                <div className="form-group mb-3">
                    <div className="input-group">
                        <input className="form-control" type="text" placeholder="Unesi prezime pacijenta..." value={prezime}
                            onChange={ e => setPrezime(e.target.value)} />
                    </div>
                </div>

                <div className="form-group mb-3">
                    <div className="input-group">
                        <input className="form-control" type="text" placeholder="Unesi jmbg pacijenta..." value={jmbg}
                            onChange={ e => setJmbg(e.target.value)} />
                    </div>
                </div>

                <div className="form-group mb-3">
                    <div className="input-group">
                        <input className="form-control" type="text" placeholder="Unesi adresu pacijenta..." value={adresa}
                            onChange={ e => setAdresa(e.target.value)} />
                    </div>
                </div>

                <div className="form-group mb-3">
                    <div className="input-group">
                        <input className="form-control" type="text" placeholder="Unesi telefon pacijenta..." value={telefon}
                            onChange={ e => setTelefon(e.target.value)} />
                    </div>
                </div>

                <div className="form-group mb-3">
                    <div className="input-group">
                        <input className="form-control" type="text" placeholder="Unesi email pacijenta..." value={email}
                            onChange={ e => setEmail(e.target.value)} />
                    </div>
                </div>

                <div className="form-group mb-3">
                    <div className="input-group">
                        <select className="form-select form-select-md  me-3" aria-label=".form-select-lg example">
                            <option selected>Status...</option>
                            <option value="1">Aktivan</option>
                            <option value="2">Neaktivan</option>
                        </select>
                    </div>
                </div>

                <div className="form-group mb-3">
                    <div className="input-group">
                        <select className="form-select form-select-md  me-3" aria-label=".form-select-lg example">
                            <option selected>Senioritet...</option>
                            <option value="1">Dete</option>
                            <option value="2">Penzioner</option>
                            <option value="3">Ostali</option>
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <Link className="btn btn-danger  Button mt-3 mb-3 me-3 " to="/korisnik/dashboard/pacijenti">
                        NAZAD
                    </Link>

                    <button className="btn btn-primary   Button " onClick={ () => doEditPacijent() }>
                        IZMENI
                    </button>

                    
                </div>
            </div>
        </div>
    );
}