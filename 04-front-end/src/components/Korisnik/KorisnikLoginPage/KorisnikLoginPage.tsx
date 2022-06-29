import { useState } from "react";
import { Link } from "react-router-dom";
import './KorisnikLoginPage.sass';
import { useNavigate } from "react-router-dom";
import { api } from "../../../api/api";
import AppStore from "../../../store/AppStore";
import { motion } from 'framer-motion';

export default function KorisnikLoginPage() {
    //ne smemo da ih kreiramo unutar nekih npr. IF-ova , moraju ovde ovako da postoje ... (pozivaju se globalno na samom pocetku)
    const [korisnickoIme, setKorisnickoIme]     = useState<string>("");
    const [lozinka, setLozinka] = useState<string>("");
    const [ error, setError ] = useState<string>("");

    const navigate = useNavigate();

    //formiramo doLogin f-ju kao Arrow f-ju zato sto zelimo da this kontekst ostavimo i njoj dostupnim ...
    const doLogin = () => {
        api("post", "/api/auth/korisnik/login", "korisnik", { korisnickoIme, lozinka })
        .then(res => {
            if (res.status !== "ok") {
                throw new Error("Could not log in. Reason: " + JSON.stringify(res.data));
            }

            return res.data;
        })
        .then(data => {
            AppStore.dispatch( { type: "auth.update", key: "authToken", value: data?.authToken } );
            AppStore.dispatch( { type: "auth.update", key: "refreshToken", value: data?.refreshToken } );
            AppStore.dispatch( { type: "auth.update", key: "identity", value: korisnickoIme } );
            AppStore.dispatch( { type: "auth.update", key: "id", value: +(data?.id) } );
            AppStore.dispatch( { type: "auth.update", key: "role", value: "korisnik" } );

            navigate("/korisnik/dashboard", {
                replace: true,
            });
        })
        .catch(error => {
            setError(error?.message ?? "Could not log in!");

            setTimeout(() => {
                setError("");
            }, 3500);
        });

        navigate("/korisnik/dashboard", {
            replace: true,
        });
    };

    return (
        <motion.div className="row"
            initial={{
                position: "relative",
                top: 20,
                scale: 0.95,
                opacity: 0,
            }}
            animate={{
                top: 0,
                scale: 1,
                opacity: 1,
            }}
            transition={{
                delay: 0.125,
                duration: 0.75,
            }}>
            <div className="col col-xs-12 col-md-6 offset-md-3 ">
                <h1 className="h5 mb-3 mx-auto">Prijavi se na svoj nalog</h1>

                <div className="form-group mb-3 ">
                    <div className="input-group">
                        <input className="form-control" type="text" placeholder="Unesi svoje korisnicko ime..." value={ korisnickoIme }
                            onChange={ e => setKorisnickoIme(e.target.value) } />
                    </div>
                </div>

                <div className="form-group mb-3 ">
                    <div className="input-group">
                        <input className="form-control" type="password" placeholder="Unesi svoju lozniku..." value={ lozinka }
                            onChange={ e => setLozinka(e.target.value) }/>
                    </div>
                </div>

                <div className="form-group mb-3 ">
                    <button className="btn btn-primary mt-3 mb-3 me-3 Button d-block " onClick={ () => doLogin() }>
                        PRIJAVA
                    </button>

                    <Link className="btn btn-success Button d-block " to="/auth/korisnik/registracija">
                        REGISTRACIJA
                    </Link>
                </div>

                { error && <p className="alert alert-danger">{ error }</p> }
            </div>
        </motion.div>
    );
}