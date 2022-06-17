import { NextFunction, Request, Response } from "express";

export default class AuthMiddleware {
    public static getVerifier(... allowedRoles: ("korisnik")[] ) :
        (req: Request, res: Response, next: NextFunction) => void 
}