import {  Link } from "react-router-dom";

export default function Menu(){
    return (
       
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand active" to="/">Pocetna</Link>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-item nav-link" to="auth/korinsik/prijava">Prijava korisnika</Link>
                        <Link className="nav-item nav-link" to="auth/korisnik/registracija">Registracija novog korisnika</Link>
                        <Link className="nav-item nav-link" to="pacijenti">Prikaz svih pacijenata</Link>
                        
                    </div>
                </div>
            </nav>
        
    );
}