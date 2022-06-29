import React from "react";
import { Link } from "react-router-dom";

export default function KorisnikDashboard(){
    return (
        <div className="card">
                <div className="card-header mx-auto">
                    <img src={require('../../../resources/dentist-logo.jpg')}  alt="zub-logo" />
                </div>
                
                <div className="card-text">
                    <div className="row mx-auto">

                        <div className="col-12 col-md-4 p-3 d-grid gap-3 mx-auto">  
                                <Link className="btn btn-primary " to="/korisnik/dashboard/usluge">USLUGE</Link> 
                                <Link className="btn btn-primary " to="/korisnik/dashboard/pacijenti">PACIJENTI</Link>
                                <Link className="btn btn-primary " to="/korisnik/dashboard/karton_pacijenta_unos">KARTON PACIJENTA</Link>
                        </div>

                        <div className="col-12 col-md-4 p-3 d-grid gap-3 mx-auto">
                                <Link className="btn btn-success " to="/korisnik/dashboard/nova_intervencija">NOVA INTERVENCIJA</Link> 
                                <Link className="btn btn-danger  " to="/auth/korisnik/prijava">ODJAVA</Link>
                        </div>
                    </div>
                </div>
        </div>
       
    );
}