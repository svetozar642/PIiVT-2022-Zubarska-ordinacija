import * as express from 'express';
import Prijava_korisnikaController from './Prijava_korisnikaController.controller';
import Prijava_korisnikaService from './Prijava_korisnikaService.service';
import IApplicationResources from '../../common/IApplicationResources.interface';
import IRouter from '../../common/IRouter.interface';

class Prijava_korisnikaRouter implements IRouter{
    public setupRoutes(application: express.Application, resources: IApplicationResources){
        const prijava_korisnikaService: Prijava_korisnikaService = new Prijava_korisnikaService(resources.databaseConnection);
        const prijava_korisnikaController: Prijava_korisnikaController = new Prijava_korisnikaController(prijava_korisnikaService);

        application.get("/api/prijava_korisnika",     prijava_korisnikaController.getAll.bind(prijava_korisnikaController));
        application.get("/api/prijava_korisnika/:id", prijava_korisnikaController.getById.bind(prijava_korisnikaController));
        application.get("/api/prijava_korisnika/korisnicko_ime/:korisnicko_ime", prijava_korisnikaController.getAllByKorisnicko_ime.bind(prijava_korisnikaController));
        application.get("/api/prijava_korisnika/status/:status", prijava_korisnikaController.getAllByStatus.bind(prijava_korisnikaController));

        application.post("/api/prijava_korisnika", prijava_korisnikaController.add.bind(prijava_korisnikaController));
    }
}

export default Prijava_korisnikaRouter;