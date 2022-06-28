import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IPacijent from '../../../models/IPacijent.model';

export interface IPacijentPageUrlParams extends Record<string, string|undefined> {
    jmbg: string;
}

export default function Pacijent(){
    const [pacijent, setPacijent] = useState<IPacijent|null>(null);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const params = useParams<IPacijentPageUrlParams>();

    useEffect( () => {
        setLoading(true);

        fetch("http://localhost:10000/api/pacijent/jmbg/" + params.jmbg)
            .then(res => res.json())
            .then(data => {
                setPacijent(data);
            })
            .catch(error => {
                setErrorMessage(error?.message ?? 'Unknown error while loading pacijent by jmbg ...');
            })
            .finally( () => {
                setLoading(false);
            });
    }, [params.jmbg]);

    return (
        <div>
            {loading && <p>Loading ...</p>}
            {errorMessage && <p>Error: {errorMessage}</p>}
        
            {!errorMessage && pacijent !== null && 
                <ul>            
                    <li key={"pacijent-"+pacijent.pacijent_id}>
                        {pacijent.ime}  {pacijent.prezime}  {pacijent.jmbg}
                    </li>                              
                </ul>
            }
        </div>
    );
}