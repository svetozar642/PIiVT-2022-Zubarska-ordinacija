import { Link } from "react-router-dom";
import { useState } from "react";
import './KorisnikPacijenti.sass';
import { useNavigate } from "react-router-dom";

export default function KorisnikPacijentDeaktivacija(){
    const [jmbg, setJmbg] = useState<string>("");

    const navigate = useNavigate();

    const setStatusPacijenta = () => {
        setJmbg(jmbg);

        //todo

        navigate("/korisnik/dashboard/pacijenti", {
            replace: true,
        });
    };

    return (
        <div className="card">
                <div className="card-header mx-auto">
                    <img src={require('../../../resources/dentist-logo.jpg')}  alt="zub-logo" />
                </div>
                
                <div className="card-text">
                    <div className="row mx-auto">

                        <h1>Unesite JMBG broj pacijenta za njegovu (de)aktivaciju :</h1>
                        <div className="input-group input-group-sm">
                            <span className="input-group-text input-group-sm">JMBG Pacijenta: </span>
                            <textarea className="form-control form-control-sm" aria-label="With textarea" value={jmbg}></textarea>
                        </div>

                        <div className="col-12 col-md-4 p-3 d-grid gap-3 mx-auto">
                                <Link className="btn btn-danger mt-3 me-3 Button d-block " to="/korisnik/dashboard/pacijenti">NAZAD</Link> 
                                <button className="btn btn-success mt-3 mb-3 me-3 Button d-block" onClick={() => setStatusPacijenta()}>(DE)AKTIVIRAJ)</button>
                        </div>
                    </div>
                </div>
        </div>
    );
}