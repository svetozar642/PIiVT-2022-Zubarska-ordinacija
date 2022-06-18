import * as express from 'express';
import Racun_uslugaController from './Racun_uslugaController.controller';
import Racun_uslugaService from './Racun_uslugaService.service';
import IApplicationResources from '../../common/IApplicationResources.interface';
import IRouter from '../../common/IRouter.interface';
import AuthMiddleware from '../../middlewares/AuthMiddleware';

class Racun_uslugaRouter implements IRouter{
    public setupRoutes(application: express.Application, resources: IApplicationResources){
        const racun_uslugaService: Racun_uslugaService = new Racun_uslugaService(resources.databaseConnection);
        const racun_uslugaController: Racun_uslugaController = new Racun_uslugaController(racun_uslugaService);

        application.get("/api/racun_usluga",                AuthMiddleware.getVerifier("korisnik"), racun_uslugaController.getAll.bind(racun_uslugaController));
        application.get("/api/racun_usluga/:id",            AuthMiddleware.getVerifier("korisnik"), racun_uslugaController.getById.bind(racun_uslugaController));

        application.get("/api/racun_usluga/zub/:id",        AuthMiddleware.getVerifier("korisnik"), racun_uslugaController.getAllByZubId.bind(racun_uslugaController));
        application.get("/api/racun_usluga/usluga/:id",     AuthMiddleware.getVerifier("korisnik"), racun_uslugaController.getAllByUslugaId.bind(racun_uslugaController));
        application.get("/api/racun_usluga/pacijent/:id",   AuthMiddleware.getVerifier("korisnik"), racun_uslugaController.getAllByPacijentId.bind(racun_uslugaController));
        application.get("/api/racun_usluga/racun/:id",      AuthMiddleware.getVerifier("korisnik"), racun_uslugaController.getAllByRacunId.bind(racun_uslugaController));

        application.post("/api/racun_usluga",               AuthMiddleware.getVerifier("korisnik"), racun_uslugaController.add.bind(racun_uslugaController));
    }
}

export default Racun_uslugaRouter;