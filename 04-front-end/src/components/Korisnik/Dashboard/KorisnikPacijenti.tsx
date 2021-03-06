import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../../api/api";
import IPacijent from "../../../models/IPacijent.model";
import './KorisnikPacijenti.sass';
interface IKorisnikPacijentiRowProperties{
    pacijent: IPacijent,
}

//**************************************************************************************************************************************************************
//Da bi mogla ova komponeneta da izlista i prikaze sve pacijente iz baze, morate otici u configs.ts fajl u okviru 03-back-end/src foldera
// i da podesite " allowAllRoutesWithoutAuthTokens: true " kako biste oslobodili sve rute API da moze da im se pristupa bez auth tokena
//**************************************************************************************************************************************************************

export default function KorisnikPacijenti(){
    const [pacijenti, setPacijenti] = useState<IPacijent[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");

    function KorisnikPacijentiRow(props: IKorisnikPacijentiRowProperties){
        return (
            <tr>
                <td>{props.pacijent.pacijent_id}</td>
                <td>{props.pacijent.ime}</td>
                <td>{props.pacijent.prezime}</td>
                <td>{props.pacijent.jmbg}</td>
                <td>{props.pacijent.adresa}</td>
                <td>{props.pacijent.telefon}</td>
                <td>{props.pacijent.email}</td>
                <td>{props.pacijent.status}</td>
                <td>{props.pacijent.senioritet}</td>
                <td>{props.pacijent.korisnik_id}</td>
            </tr>
        );
    }

    useEffect( () => {
        api("get","/api/pacijent","korisnik")
            .then(apiResponse => {
                if ( apiResponse.status === 'ok'){
                    return setPacijenti(apiResponse.data);
                }

                throw {
                    message: 'Unknown error while loading pacijenti ...' ,
                }
            })

        fetch("http://localhost:10000/api/pacijent")
            .then(res => res.json())
            .then(data => {
                setPacijenti(data);
            })
            .catch(error => {
                setErrorMessage(error?.message ?? 'Unknown error while loading pacijenti ...');
            });
    }, []);

    return (
        <div>
            {errorMessage && <p>Error: {errorMessage}</p>}
        
            {!errorMessage && 
                <div>
                    <table className="table table-bordered table-striped table-hover table-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>IME</th>
                                <th>PREZIME</th>
                                <th>JMBG</th>
                                <th>ADRESA</th>
                                <th>TELFON</th>
                                <th>E-MAIL</th>
                                <th>STATUS</th>
                                <th>SENIORITET</th>
                                <th>KORISNIK ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pacijenti.map( pacijent => <KorisnikPacijentiRow key={"pacijent-row-"+pacijent.pacijent_id} pacijent={pacijent}/> )}
                        </tbody>
                    </table>

                    <div className="container">
                        <div className="row ">
                            <div className="col">
                                <Link className="btn btn-warning btn-lg ms-0 Button" to="/korisnik/dashboard" >POCETNA</Link>
                            </div>
                            <div className="col justify-content-end">
                                <Link className="btn btn-success btn-lg me-5 mb-3 Button" to="/korisnik/dashboard/pacijenti/pacijenti_dodaj" >DODAJ</Link>
                                <Link className="btn btn-primary btn-lg me-5 mb-3 Button" to="/korisnik/dashboard/pacijenti/pacijenti_izmeni/:jmbg" >IZMENI</Link>
                                <Link className="btn btn-danger btn-lg mb-3 Button" to="/korisnik/dashboard/pacijenti/pacijenti_deaktiviraj" >DEAKTIVIRAJ</Link>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}
