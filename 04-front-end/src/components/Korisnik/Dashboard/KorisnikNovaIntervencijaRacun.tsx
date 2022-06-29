import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';

export default function KorisnikNovaIntervencijaRacun(){
    const [jmbg, setJmbg] = useState<string>("");
    const [ukupnaCena, setUkupnaCena] = useState<number>();

    const navigate = useNavigate();

    const snimiRacun = () => {
        //todo

        navigate("/korisnik/dashboard", {
            replace: true,
        });
    };

    return (
        <div>
            <div className="card">
                    <div className="card-header mx-auto">
                        <h1>SPISAK IZVRSENIH USLUGA</h1>
                    </div>
                    
                    <div className="card-text">
                        <div className="row mx-auto">
                            <table className="table table-bordered table-striped table-hover table-sm">
                                <thead>
                                    <tr className='col'>
                                        <th className='col-2 text-center'>SIFRA ZUBA</th>
                                        <th className='col-5 text-center'>NAZIV INTERVENCIJE</th>
                                        <th className='col-2 text-center'>CENA</th>
                                        <th className='col-3 text-center'>CENA SA POPUSTOM</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
            </div>

            <div className="row">
                <div className="col col-5">
                    <h2 className="mt-3">PACIJENT (JMBG) : 0102999710111{jmbg}</h2> <br/>
                    <h2 className="mt-3">UKUPNA CENA: 2600{ukupnaCena} DIN</h2>
                </div>

                <div className="col col-5">
                    
                    <button className="btn btn-warning mt-3 me-3 Button d-block float-end " onClick={() => snimiRacun()} >SNIMI</button> 
                    <Link className="btn btn-danger mt-3 me-3 Button d-block float-end " to="/korisnik/dashboard/nova_intervencija" >NAZAD</Link> 
                </div>
            </div>
        </div>
    );
}