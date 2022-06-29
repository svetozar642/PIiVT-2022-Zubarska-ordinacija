import { useState } from 'react';
import { Link } from 'react-router-dom';
import './KorisnikPacijenti.sass';

export default function KorisnikKartonPacijenta(){
    const [ime, setIme] = useState<string>("");
    const [prezime, setPrezime] = useState<string>("");
    const [jmbg, setJmbg] = useState<string>("");

    //todo

    return (
        <div className="card">
                <div className="card-header mx-auto">
                    <h1>Petar {ime} Petkovic {prezime} ( 0102999710111 {jmbg} )</h1>
                </div>
                
                <div className="card-text">
                    <div className="row mx-auto">
                        <table className="table table-bordered table-striped table-hover table-sm">
                            <thead>
                                <tr className='col'>
                                    <th className='col-2 text-center'>SIFRA ZUBA</th>
                                    <th className='col-5 text-center'>NAZIV INTERVENCIJE</th>
                                    <th className='col-2 text-center'>KATEGORIJA</th>
                                    <th className='col-3 text-center'>OPIS</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                            </tbody>
                        </table>
                    </div>

                    <Link className="btn btn-warning mt-3 me-3 Button d-block float-end " to="/korisnik/dashboard">POCETNA</Link> 
                </div>
        </div>
    );
}