import * as express from 'express';
import RacunController from './RacunController.controller';
import RacunService from './RacunService.service';
import IApplicationResources from '../../common/IApplicationResources.interface';
import IRouter from '../../common/IRouter.interface';
import AuthMiddleware from '../../middlewares/AuthMiddleware';

class RacunRouter implements IRouter{
    public setupRoutes(application: express.Application, resources: IApplicationResources){
        const racunService: RacunService = new RacunService(resources.databaseConnection);
        const racunController: RacunController = new RacunController(racunService);

        application.get("/api/racun",                           AuthMiddleware.getVerifier("korisnik"), racunController.getAll.bind(racunController));
        application.get("/api/racun/:id",                       AuthMiddleware.getVerifier("korisnik"), racunController.getById.bind(racunController));

        application.get("/api/racun/pacijent_id/:pacijent_id",  AuthMiddleware.getVerifier("korisnik"), racunController.getAllByPacijentId.bind(racunController));
        application.get("/api/racun/korisnik_id/:korisnik_id",  AuthMiddleware.getVerifier("korisnik"), racunController.getAllByKorisnikId.bind(racunController));
        application.get("/api/racun/tip_usluge/:tip_usluge",    AuthMiddleware.getVerifier("korisnik"), racunController.getAllByTipUsluge.bind(racunController));
        application.get("/api/racun/senioritet/:senioritet",    AuthMiddleware.getVerifier("korisnik"), racunController.getAllBySenioritet.bind(racunController));

        application.post("/api/racun",                          AuthMiddleware.getVerifier("korisnik"), racunController.add.bind(racunController));
    }
}

export default RacunRouter;