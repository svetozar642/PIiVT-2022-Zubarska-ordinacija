import * as express from 'express';
import AuthController from './AuthController.controller';
import KorisnikService from '../korisnik/KorisnikService.service';
import IApplicationResources from '../../common/IApplicationResources.interface';
import IRouter from '../../common/IRouter.interface';

class AuthRouter implements IRouter{
    public setupRoutes(application: express.Application, resources: IApplicationResources){
        const korisnikService: KorisnikService = new KorisnikService(resources.databaseConnection);
        const authController: AuthController = new AuthController(korisnikService);

        application.post("/api/auth/korisnik/login",    authController.korisnikLogin.bind(authController));

        //Saljemo prazno telo jer koristimo POST metodu ,
        //a to cinimo da bi sprecili da neko preko linka ne moze da otvori generisanje tokena npr. ukoliko bi korisitli GET metodu
        application.post("/api/auth/korisnik/refresh",    authController.korisnikRefresh.bind(authController));
        
    }
}

export default AuthRouter;