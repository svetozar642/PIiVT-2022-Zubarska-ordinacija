import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './KorisnikPacijenti.sass';
import './KorisnikNovaIntervencija.sass'

export default function KorisnikNovaIntervencija(){
    const [jmbg, setJmbg] = useState<string>("");

    const navigate = useNavigate();

    const goListPacijenti = () => {
        //todo

        navigate("/korisnik/dashboard/nova_intervencija/pacijenti", {
            replace: true,
        });
    };

    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col ">
                    <Link className="btn btn-success mt-3 me-3 ButtonPlus  " to="/korisnik/dashboard/nova_intervencija/dodaj_uslugu_na_zub">+</Link>
                    <img src={require('../../../resources/teeth-diagram-2.png')} />
                </div>
                <div className="col">
                    <table className="table table-bordered table-striped table-hover table-sm">
                        <thead>
                            <tr>
                                <th>SIFRA ZUBA</th>
                                <th>NAZIV USLUGE</th>
                                <th>SIFRA USLUGE</th>
                            </tr>
                        </thead>
                        <tbody>
                           
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-3">
                    <select className="form-select form-select-lg mb-3 mt-5 me-3" aria-label=".form-select-lg example">
                        <option selected>TIP USLUGE</option>
                        <option value="1">Pojedinacna</option>
                        <option value="2">Paket</option>
                    </select>
                </div>
                <div className="col-3">
                    <div className="input-group mb-3 mt-5 me-3">
                        <input type="text" className="form-control form-control-lg" placeholder="JMBG broj pacijenta..." aria-label="JMBG broj pacijenta" 
                            aria-describedby="button-addon2" value={jmbg} />
                        <button className="btn  btn-success" type="button" id="button-addon2" onClick={() => goListPacijenti()}>+</button>
                    </div>
                </div>
                <div className="col-3">
                    <select className="form-select form-select-lg mb-3 mt-5 me-3" aria-label=".form-select-lg example">
                        <option selected>SENIORITET</option>
                        <option value="1">Dete</option>
                        <option value="2">Penzioner</option>
                        <option value="3">Ostali</option>
                    </select>
                </div>
                <div className="col-3">
                    <Link className="btn btn-danger btn-lg mt-5 ms-3 float-end Button" to="/korisnik/dashboard/nova_intervencija/racun">RACUN</Link>
                </div>
            </div>
        </div>
    );
}