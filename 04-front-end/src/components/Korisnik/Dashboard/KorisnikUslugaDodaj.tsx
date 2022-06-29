import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './KorisnikUsluge.sass';

export default function KorisnikUslugaDodaj() {
    //ne smemo da ih kreiramo unutar nekih npr. IF-ova , moraju ovde ovako da postoje ... (pozivaju se globalno na samom pocetku)
    const [naziv, setNaziv]     = useState<string>("");
    const [sifra_usluge, setSifraUsluge] = useState<string>("");
    const [opis, setOpis] = useState<string>("");
    const [kategorijaUsluge, setKategorijaUsluge] = useState<string>("");
    const [cenaPojedDete, setCenaPojedDete] = useState<number>();
    const [cenaPojedPenzioner, setCenaPojedPenzioner] = useState<number>();
    const [cenaPojedOstali, setCenaPojedOstali] = useState<number>();
    const [cenaPaketDete, setCenaPaketDete] = useState<number>();
    const [cenaPaketPenzioner, setCenaPaketPenzioner] = useState<number>();
    const [cenaPaketOstali, setCenaPaketOstali] = useState<number>();
    const [status, setStatus] = useState<string>("");

    const navigate = useNavigate();

    //formiramo doLogin f-ju kao Arrow f-ju zato sto zelimo da this kontekst ostavimo i njoj dostupnim ...
    const doAddUsluga = () => {
        console.log("Attempting to register account : ", naziv,sifra_usluge,opis,kategorijaUsluge,cenaPojedDete,cenaPojedPenzioner,cenaPojedOstali,
            cenaPaketDete,cenaPaketPenzioner,cenaPaketOstali,status);

        navigate("/korisnik/dashboard/usluge", {
            replace: true,
        });
    };

    return (
        <div className="row">
            <div className="col col-xs-12 col-md-6 offset-md-3">
                <div className="card-header  offset-md-4 mb-4">
                    <img src={require('../../../resources/dentist-logo.jpg')}  alt="zub-logo" />
                </div>

                <h1 className="h5 mb-3">Dodaj novu uslugu :</h1>
                
                <div className="form-group mb-3">
                    <div className="input-group">
                        <input className="form-control" type="text" placeholder="Unesi naziv usluge..." value={naziv}
                            onChange={ e => setNaziv(e.target.value)} />
                    </div>
                </div>

                <div className="form-group mb-3">
                    <div className="input-group">
                        <input className="form-control" type="text" placeholder="Unesi sifru usluge..." value={sifra_usluge}
                            onChange={ e => setSifraUsluge(e.target.value)} />
                    </div>
                </div>

                <div className="form-group mb-3">
                    <div className="input-group">
                        <input className="form-control" type="text" placeholder="Unesi opis usluge..." value={opis}
                            onChange={ e => setOpis(e.target.value)} />
                    </div>
                </div>

                <div className="form-group mb-3">
                    <div className="input-group">
                        <select className="form-select form-select-md  me-3" aria-label=".form-select-lg example">
                            <option selected>Kategorija...</option>
                            <option value="1">Redovna</option>
                            <option value="2">Preventivna</option>
                            <option value="3">Hirurska</option>
                        </select>
                    </div>
                </div>

                <div className="form-group mb-3">
                    <div className="input-group">
                        <input className="form-control" type="text" placeholder="Unesi cena pojed. dete..." value={cenaPojedDete}
                            onChange={ e => setCenaPojedDete(+e.target.value)} />
                    </div>
                </div>

                <div className="form-group mb-3">
                    <div className="input-group">
                        <input className="form-control" type="text" placeholder="Unesi cena pojed. penzioner..." value={cenaPojedPenzioner}
                            onChange={ e => setCenaPojedPenzioner(+e.target.value)} />
                    </div>
                </div>

                <div className="form-group mb-3">
                    <div className="input-group">
                        <input className="form-control" type="text" placeholder="Unesi cena paket dete..." value={cenaPaketDete}
                            onChange={ e => setCenaPaketDete(+e.target.value)} />
                    </div>
                </div>

                <div className="form-group mb-3">
                    <div className="input-group">
                        <input className="form-control" type="text" placeholder="Unesi cena paket penzioner..." value={cenaPaketPenzioner}
                            onChange={ e => setCenaPaketPenzioner(+e.target.value)} />
                    </div>
                </div>

                <div className="form-group mb-3">
                    <div className="input-group">
                        <input className="form-control" type="text" placeholder="Unesi cena paket ostali..." value={cenaPaketOstali}
                            onChange={ e => setCenaPaketOstali(+e.target.value)} />
                    </div>
                </div>

                <div className="form-group mb-3">
                    <div className="input-group">
                        <select className="form-select form-select-md  me-3" aria-label=".form-select-lg example">
                            <option selected>Status...</option>
                            <option value="1">Aktivna</option>
                            <option value="2">Neaktivna</option>
                        </select>
                    </div>
                </div>


                <div className="form-group">
                    <Link className="btn btn-danger  Button mt-3 mb-3 me-3 " to="/korisnik/dashboard/usluge">
                        NAZAD
                    </Link>

                    <button className="btn btn-success   Button " onClick={ () => doAddUsluga() }>
                        DODAJ
                    </button>

                    
                </div>
            </div>
        </div>
    );
}