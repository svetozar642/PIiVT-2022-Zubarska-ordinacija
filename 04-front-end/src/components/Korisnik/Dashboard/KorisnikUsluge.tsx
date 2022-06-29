import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../../api/api";
import IUsluga from "../../../models/IUsluga.model";
import './KorisnikUsluge.sass';

interface IKorisnikUslugeRowProperties{
    usluga: IUsluga,
}

export default function KorisnikUsluge(){
    const [usluge, setUsluge] = useState<IUsluga[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");

    function KorisnikUslugeRow(props: IKorisnikUslugeRowProperties){
        return (
            <tr>
                <td>{props.usluga.usluga_id}</td>
                <td>{props.usluga.naziv}</td>
                <td>{props.usluga.opis}</td>
                <td>{props.usluga.sifra_usluge}</td>
                <td>{props.usluga.kategorija}</td>
                <td>{props.usluga.cena_pojedinacna_dete}</td>
                <td>{props.usluga.cena_pojedinacna_penzioner}</td>
                <td>{props.usluga.cena_pojedinacna_ostali}</td>
                <td>{props.usluga.cena_paket_dete}</td>
                <td>{props.usluga.cena_paket_penzioner}</td>
                <td>{props.usluga.cena_paket_ostali}</td>
                <td>{props.usluga.status}</td>
            </tr>
        );
    }


    const loadUsluge = () => {
        api("get","/api/usluga","korisnik")
            .then(apiResponse => {
                if ( apiResponse.status === 'ok'){
                    return setUsluge(apiResponse.data);
                }

                throw {
                    message: 'Unknown error while loading usluge ...' ,
                }
            })
            .catch(error => {
                setErrorMessage(error?.message ?? 'Unknown error while loading usluge ...');
            });
    }

    useEffect( () => {
        loadUsluge();
    }, []);

    return (
        <div>
            {errorMessage && <p>Error: {errorMessage}</p>}
        
            {!errorMessage && 
                <div>
                    <table className="table table-bordered table-striped table-hover table-sm mt-3">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAZIV</th>
                                <th>OPIS</th>
                                <th>SIFRA USLUGE</th>
                                <th>KATEGORIJA</th>
                                <th>Cena poj. dete</th>
                                <th>Cena poj. penzioner</th>
                                <th>Cena poj. ostali</th>
                                <th>Cena paket dete</th>
                                <th>Cena paket penzioner</th>
                                <th>Cena paket ostali</th>
                                <th>STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usluge.map( usluga => <KorisnikUslugeRow key={"usluga-row-"+usluga.usluga_id} usluga={usluga}/> )}
                        </tbody>
                    </table>


                    <div className="container">
                        <div className="row ">
                            <div className="col">
                                <Link className="btn btn-warning btn-lg ms-0 Button" to="/korisnik/dashboard" >POCETNA</Link>
                            </div>
                            <div className="col justify-content-end">
                                <Link className="btn btn-success btn-lg me-5 mb-3 Button" to="/korisnik/dashboard/usluge/usluge_dodaj" >DODAJ</Link>
                                <Link className="btn btn-primary btn-lg me-5 mb-3 Button" to="/korisnik/dashboard/usluge/usluge_izmeni/:sifra_usluge" >IZMENI</Link>
                                <Link className="btn btn-danger btn-lg mb-3 Button" to="/korisnik/dashboard/usluge/usluge_deaktiviraj" >DEAKTIVIRAJ</Link>
                            </div>
                        </div>
                    </div>

                </div>
            }
        </div>
    );
}


