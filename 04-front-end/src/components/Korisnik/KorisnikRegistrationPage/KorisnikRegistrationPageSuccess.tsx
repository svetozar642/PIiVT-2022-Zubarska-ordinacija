import { Link } from "react-router-dom";
import './KorisnikRegistrationPageSuccess.sass';

export default function KorisnikLoginPageSuccess() {

    return (
        <div className="card">
            <div className="card-body ">
                <p>Uspesno ste registrovali nalog, poslat Vam je mejl za aktivaciju !</p>

                <Link className="btn btn-primary mt-3 mb-3 d-block Button" to="/auth/korisnik/prijava">PRIJAVA</Link>
            </div>
        </div>
    );
}