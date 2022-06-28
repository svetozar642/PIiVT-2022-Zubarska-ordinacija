import React from "react";
import { Link } from "react-router-dom";

export default function KorisnikDashboard(){
    return (
        <div className="card">
                <div className="card-header">
                    <img src="../../../resources/dentist-logo.jpg" className="img-thumbnail mx-auto " alt="zub-logo"/>
                </div>
                
                <div className="card-text ">
                    <div className="row">

                        <div className="col-12 col-md-4 p-3 d-grid gap-3">  
                                <Link className="btn btn-primary " to="/korisnik/dashboard/usluge">USLUGE</Link> 
                                <Link className="btn btn-primary " to="/korisnik/dashboard/pacijenti">PACIJENTI</Link>
                                <Link className="btn btn-primary " to="/korisnik/dashboard/karton_pacijenta">KARTON PACIJENTA</Link>
                        </div>

                        <div className="col-12 col-md-4 p-3 d-grid gap-3 ">
                                <Link className="btn btn-success " to="/korisnik/dashboard/nova_intervencija">NOVA INTERVENCIJA</Link> 
                                <Link className="btn btn-danger  " to="/korisnik/dashboard/odjava">ODJAVA</Link>
                        </div>
                    </div>
                </div>
        </div>
       
    );
}