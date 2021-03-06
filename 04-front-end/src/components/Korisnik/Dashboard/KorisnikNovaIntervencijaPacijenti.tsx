import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../../api/api";
import IPacijent from "../../../models/IPacijent.model";
import './KorisnikPacijenti.sass';
interface IKorisnikPacijentiRowProperties{
    pacijent: IPacijent,
}

export default function KorisnikNovaIntervencijaPacijenti(){
    const [pacijenti, setPacijenti] = useState<IPacijent[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [jmbg, setJmbg] = useState<string>("");

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

            //osnovni nacin dok nismo implementirali api() metodu ...
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

                            <div className="col col-4">
                                <div className="input-group input-group-sm me-5 col-5">
                                    <span className="input-group-text input-group-sm">PACIJENT (JMBG): </span>
                                    <textarea className="form-control form-control-sm" aria-label="With textarea" value={jmbg}></textarea>
                                </div>
                            </div>

                            <div className="col justify-content-end">
                                <Link className="btn btn-success btn-lg me-5 mb-3 Button float-end" to="/korisnik/dashboard/nova_intervencija" >POTVRDI</Link>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}