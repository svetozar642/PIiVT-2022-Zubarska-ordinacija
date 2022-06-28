import { useEffect, useState } from 'react';
import { api } from '../../../api/api';
import IPacijent from '../../../models/IPacijent.model';

export default function Pacijent(){
    const [pacijenti, setPacijenti] = useState<IPacijent[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");

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
                <ul>
                    { pacijenti.map(pacijent => (
                        <li key={"pacijent-"+pacijent.pacijent_id}>
                            {pacijent.ime}  {pacijent.prezime}  {pacijent.jmbg}
                        </li>
                    ))}
                </ul>
            }
        </div>
    );
}