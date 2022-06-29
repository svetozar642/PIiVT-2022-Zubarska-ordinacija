import { Link } from "react-router-dom";
import { useState } from "react";
import './KorisnikPacijenti.sass';
import { useNavigate } from "react-router-dom";

export default function KorisnikNovaIntervencijaDodajUsluguNaZub(){
    const [sifra_usluge, setSifraUsluge] = useState<string>("");

    const navigate = useNavigate();

    const setStatusPacijenta = () => {
        setSifraUsluge(sifra_usluge);

        //todo

        navigate("/korisnik/dashboard/nova_intervencija", {
            replace: true,
        });
    };

    return (
        <div className="card">
                <div className="card-header mx-auto">
                    <img src={require('../../../resources/dentist-logo.jpg')}  alt="zub-logo" />
                </div>
                
                <div className="card-text">
                    <div className="row mx-auto">

                        <h1 className="mt-2">ZUB</h1>
                        <h3 className="mt-3">Broj:       2</h3>
                        <h3 className="mt-3">Vilica:     Gornja</h3>
                        <h3 className="mt-3">Strana:     Leva</h3>
                        <h3 className="mt-3">Tip zuba:   Sekutic</h3>
                        <h3 className="mt-3 mb-4">Sifra zuba: GLS2</h3>

                        <div className="input-group input-group-sm">
                            <span className="input-group-text input-group-sm">Sifra usluge: </span>
                            <textarea className="form-control form-control-sm" aria-label="With textarea" value={sifra_usluge}></textarea>
                        </div>

                        <div className="col-12 col-md-4 p-3 d-grid gap-3 mx-auto">
                                <Link className="btn btn-primary mt-3 me-3 Button  " to="/korisnik/dashboard/usluge">SPISAK USLUGA</Link> 
                                <button className="btn btn-success mt-3 mb-3 me-3 Button " onClick={() => setStatusPacijenta()}>DODAJ</button>
                        </div>
                    </div>
                </div>
        </div>
    );
}