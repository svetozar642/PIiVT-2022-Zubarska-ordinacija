import { NextFunction, Request, Response } from "express";
import IKorisnikTokenData from "../components/auth/dto/IKorisnikTokenData";
import { DevConfig } from "../configs";
import * as jwt from "jsonwebtoken";

export default class AuthMiddleware {
    public static getVerifier(... allowedRoles: ("korisnik")[] ) :
        (req: Request, res: Response, next: NextFunction) => void {

            return (req: Request, res: Response, next: NextFunction) => {
                this.verifyAuthToken(req, res, next, allowedRoles);
            }
    }

    private static verifyAuthToken(req: Request, res: Response, next: NextFunction, allowedRoles: ("korisnik")[] ) {

        const tokenHeader: string = req.headers?.authorization ?? ""; // "Bearer TOKEN " 

        try {
            //u listu dodajemo validne role
            const checks = [];

            for (let role of allowedRoles) {
                
                try{
                    const check = this.validateTokenAs(tokenHeader, role, "auth");

                    if (check){
                        checks.push(check);
                    }
                } catch (error) {

                }
            }

            if (checks.length === 0) {
                throw {
                    status: 403,
                    message: "You are not authorized to access this resources !"
                }
            }

            req.authorisation = checks[0];

            next();
            
        } catch (error) {
            res.status(error?.status ?? 500).send(error?.message);
        }
    }

    public static validateTokenAs(tokenString: string, role: "korisnik", type: "auth"|"refresh"): IKorisnikTokenData {
        
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