import { useEffect, useState } from "react";
import { api } from "../../../api/api";
import IUsluga from "../../../models/IUsluga.model";

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

    useEffect( () => {
        api("get","/api/usluga","korisnik")
            .then(apiResponse => {
                if ( apiResponse.status === 'ok'){
                    return setUsluge(apiResponse.data);
                }

                throw {
                    message: 'Unknown error while loading usluge ...' ,
                }
            })

        fetch("http://localhost:10000/api/usluga")
            .then(res => res.json())
            .then(data => {
                setUsluge(data);
            })
            .catch(error => {
                setErrorMessage(error?.message ?? 'Unknown error while loading usluge ...');
            });
    }, []);

    return (
        <div>
            {errorMessage && <p>Error: {errorMessage}</p>}
        
            {!errorMessage && 
                <table className="table table-bordered table-striped table-hover table-sm">
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
            }
        </div>
    );
}
