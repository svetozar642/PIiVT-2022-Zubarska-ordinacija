import * as express from 'express';
import RacunController from './RacunController.controller';
import RacunService from './RacunService.service';
import IApplicationResources from '../../common/IApplicationResources.interface';
import IRouter from '../../common/IRouter.interface';

class RacunRouter implements IRouter{
    public setupRoutes(application: express.Application, resources: IApplicationResources){
        const racunService: RacunService = new RacunService(resources.databaseConnection);
        const racunController: RacunController = new RacunController(racunService);

        application.get("/api/racun",     racunController.getAll.bind(racunController));
        application.get("/api/racun/:id", racunController.getById.bind(racunController));

        application.get("/api/racun/pacijent_id/:pacijent_id", racunController.getAllByPacijentId.bind(racunController));
        application.get("/api/racun/korisnik_id/:korisnik_id", racunController.getAllByKorisnikId.bind(racunController));
        application.get("/api/racun/tip_usluge/:tip_usluge", racunController.getAllByTipUsluge.bind(racunController));
        application.get("/api/racun/senioritet/:senioritet", racunController.getAllBySenioritet.bind(racunController));

        application.post("/api/racun", racunController.add.bind(racunController));
    }
}

export default RacunRouter;