import { IKorisnikLoginDto } from "./dto/IKorisnikLogin.dto";
import KorisnikService, { DefaultKorisnikAdapterOptions } from '../korisnik/KorisnikService.service';
import {Request,Response} from "express";
import * as bcrypt from "bcrypt";
import KorisnikModel from '../korisnik/KorisnikModel.model';
import * as jwt from "jsonwebtoken";
import IKorisnikTokenData from './dto/IKorisnikTokenData';
import { DevConfig } from "../../configs";

export default class AuthController {

    private KorisnikService: KorisnikService;

    constructor(KorisnikService: KorisnikService){
        this.KorisnikService = KorisnikService;
    }

    //ovde sam nazvao korisnikLogin jer u ovoj aplikaciji zubar ima ulogu i korisnika i administratora (na vprimeru sa vezbi ovo bi se zvalo administratorLogin() )...
    // korisnik = administrator
    public async korisnikLogin( req: Request, res: Response) {
        const data = req.body as IKorisnikLoginDto;

        this.KorisnikService.getByKorisnicko_ime(data.korisnicko_ime, DefaultKorisnikAdapterOptions)
            .then( result  => {
                if (result === null ){
                    throw {
                        status: 404,
                        message: "User account not found !"
                    };
                }

                return result;
            })
            .then( korisnik => {
                if ( !bcrypt.compareSync(data.lozinka, korisnik.lozinka_hash)) {
                    throw {
                        status: 404,
                        message: "User account not found !"
                    };
                }

                return korisnik;
            })
            .then( korisnik => {
                //TODO - rad sa JWT tokenom:
                
                const tokenData: IKorisnikTokenData = {
                    role: "korisnik",
                    id: korisnik.korisnik_id,
                    identity: korisnik.korisnicko_ime,
                };

                //sada kada smo napravili podatke token moramo da ga potpisemo ... kreiramo autorizacioni token u nastavku
                //Napomena: kreiranje tokena je sinhroni proces
                const authToken = jwt.sign(tokenData, DevConfig.auth.korisnik.tokens.auth.keys.private , {
                    algorithm: DevConfig.auth.korisnik.algorithm,
                    issuer: DevConfig.auth.korisnik.issuer,
                    expiresIn: DevConfig.auth.korisnik.tokens.auth.duration,
                });

                //dalje kreiramo refresh token ...
                const refreshToken = jwt.sign(tokenData, DevConfig.auth.korisnik.tokens.refresh.keys.private , {
                    algorithm: DevConfig.auth.korisnik.algorithm,
                    issuer: DevConfig.auth.korisnik.issuer,
                    expiresIn: DevConfig.auth.korisnik.tokens.refresh.duration /*30*/ /*za potrebe simulacije kada istekne refreshToken*/,
                });


                res.send({
                    authToken: authToken,
                    refreshToken: refreshToken,
                });
            })
            .catch( error => {
                setTimeout( () => {
                    res.status(error?.status ?? 500).send(error?.message);
                }, 1500);
            });
    }

    korisnikRefresh(req: Request , res: Response) {
        const refreshTokenHeader: string = req.headers?.authorization ?? ""; // "Bearer TOKEN " 

        //Ovo je prvi nacin kada radimo manuelno za konkretnu rolu :
      /*  if (refreshTokenHeader === "") {
            return res.status(400).send("No token specified !");
        }

        const [tokenType, token] = refreshTokenHeader.trim().split(" ");

        if (tokenType !== "Bearer") {
            return res.status(401).send("Invalid token type !");
        }

        if ( typeof token !== "string" || token.length === 0) {
            return res.status(401).send("Token not specified !");
        }  */

        try {
        // Prvi nacin kad radimo mehanicki za konkretnu rolu :
            /*  const refreshTokenVerification = jwt.verify(token, DevConfig.auth.korisnik.tokens.refresh.keys.public);

            if ( !refreshTokenVerification ) {
                return res.status(401).send("Invalid token specified !");
            }
            
            //Ovim osiguravamo da budu prosledjeni samo podaci koji nam trebaju bez dodatnih poput podataka kada je token kreiran ili kada istice
            const originalTokenData = refreshTokenVerification as IKorisnikTokenData;

            const tokenData : IKorisnikTokenData = {
                role: originalTokenData.role,
                id: originalTokenData.id,
                identity: originalTokenData.identity,
            }
            //-----------------------------------------------------------------------------------------
    
            //u nastavku cemo staviti proveru role ,da bi sprecili eventualno da npr. korisnikovim refreshToken osvezi adminov authToken
            //Ali posto je u ovoj aplikaciji uloga korisnika i admina ista obe uloge ima zubar kao korisnik sistema , ovo je nepotrebno 
            //ali cemo napisati kao primer kako bi se implementiralo ...
            if (tokenData.role !== "korisnik") {
                return res.status(401).send("Invalid token role !");
            } */

        //Drugi nacin kada smo implementirali univerzalnu f-ju validateTokenAs() ...
            const tokenData = this.validateTokenAs(refreshTokenHeader, "korisnik" ,"refresh" );
    
            //sada nakon svih provera trebamo da generisemo novi autorizacioni token
            const authToken = jwt.sign(tokenData, DevConfig.auth.korisnik.tokens.auth.keys.private , {
                algorithm: DevConfig.auth.korisnik.algorithm,
                issuer: DevConfig.auth.korisnik.issuer,
                expiresIn: DevConfig.auth.korisnik.tokens.auth.duration,
            });
    
            //Saljemo samo authToken bez refreshTokena jer smo njega imali od ranije
            res.send({
                authToken: authToken,
            });

        } catch (error) {
          //Ovaj exception ne moramo sada da hendlujemo kada radimo pomocu drugog nacina i f-je validateTokenAs() ...
          /*  const message: string = (error?.message ?? "");

            if ( message.includes("jwt expired")) {
                return res.status(401).send("This token has expired !");
            } */

            res.status(/*500*/ error?.status ?? 500).send(error?.message);
        }
        
    }

    private validateTokenAs(tokenString: string, role: "korisnik", type: "auth"|"refresh"): IKorisnikTokenData {
        
        if (tokenString === "") {
            throw {
                status: 400,
                message: "No token specified !"
            }
        }

        const [tokenType, token] = tokenString.trim().split(" ");

        if (tokenType !== "Bearer") {
            throw {
                status: 401,
                message: "Invalid token type !"
            }
        }

        if ( typeof token !== "string" || token.length === 0) {
            throw {
                status: 401,
                message: "Token not specified !"
            }
        }

        try {
            const tokenVerification = jwt.verify(token, DevConfig.auth[role].tokens[type].keys.public);

            if ( !tokenVerification ) {
                throw {
                    status: 401,
                    message: "Invalid token specified !"
                }
            }
            
            //Ovim osiguravamo da budu prosledjeni samo podaci koji nam trebaju bez dodatnih poput podataka kada je token kreiran ili kada istice
            const originalTokenData = tokenVerification as IKorisnikTokenData;

            const tokenData : IKorisnikTokenData = {
                role: originalTokenData.role,
                id: originalTokenData.id,
                identity: originalTokenData.identity,
            }
            //-----------------------------------------------------------------------------------------
    
            //u nastavku cemo staviti proveru role ,da bi sprecili eventualno da npr. korisnikovim refreshToken osvezi adminov authToken
            //Ali posto je u ovoj aplikaciji uloga korisnika i admina ista obe uloge ima zubar kao korisnik sistema , ovo je nepotrebno 
            //ali cemo napisati kao primer kako bi se implementiralo ...
            if (tokenData.role !== role ) {
                throw {
                    status: 401,
                    message: "Invalid token role !"
                }
            }
    
            return tokenData;

        } catch (error) {
            const message: string = (error?.message ?? "");

            if ( message.includes("jwt expired")) {
                throw {
                    status: 401,
                    message: "This token has expired !"
                }
            }

            throw {
                status: 500,
                message: error?.message,
            }
        }
    }
}