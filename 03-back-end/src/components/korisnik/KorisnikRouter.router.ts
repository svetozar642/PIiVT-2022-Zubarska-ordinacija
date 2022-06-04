import * as express from 'express';
import KorisnikController from './KorisnikController.controller';
import KorisnikService from './KorisnikService.service';
import IApplicationResources from '../../common/IApplicationResources.interface';
import IRouter from '../../common/IRouter.interface';

class KorisnikRouter implements IRouter{
    public setupRoutes(application: express.Application, resources: IApplicationResources){
        const korisnikService: KorisnikService = new KorisnikService(resources.databaseConnection);
        const korisnikController: KorisnikController = new KorisnikController(korisnikService);

        application.get("/api/korisnik",     korisnikController.getAll.bind(korisnikController));
        application.get("/api/korisnik/:id", korisnikController.getById.bind(korisnikController));
        application.get("/api/korisnik/korisnicko_ime/:korisnicko_ime", korisnikController.getAllByKorisnicko_ime.bind(korisnikController));
        application.get("/api/korisnik/is_active/:is_active", korisnikController.getAllByIs_active.bind(korisnikController));

        application.post("/api/korisnik", korisnikController.add.bind(korisnikController));
    }
}

export default KorisnikRouter;