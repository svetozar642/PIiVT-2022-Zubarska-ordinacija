import * as express from 'express';
import PacijentController from './PacijentController.controller';
import PacijentService from './PacijentService.service';
import IApplicationResources from '../../common/IApplicationResources.interface';
import IRouter from '../../common/IRouter.interface';

class PacijentRouter implements IRouter{
    public setupRoutes(application: express.Application, resources: IApplicationResources){
        const pacijentService: PacijentService = new PacijentService(resources.databaseConnection);
        const pacijentController: PacijentController = new PacijentController(pacijentService);

        application.get("/api/pacijent",    pacijentController.getAll.bind(pacijentController));
        application.get("/api/pacijent/:id", pacijentController.getById.bind(pacijentController));

        application.get("/api/pacijent/ime/:ime", pacijentController.getAllByIme.bind(pacijentController));
        application.get("/api/pacijent/prezime/:prezime", pacijentController.getAllByPrezime.bind(pacijentController));
        application.get("/api/pacijent/jmbg/:jmbg", pacijentController.getAllByJmbg.bind(pacijentController));
        application.get("/api/pacijent/adresa/:adresa", pacijentController.getAllByAdresa.bind(pacijentController));
        application.get("/api/pacijent/telefon/:telefon", pacijentController.getAllByTelefon.bind(pacijentController));
        application.get("/api/pacijent/email/:email", pacijentController.getAllByEmail.bind(pacijentController));
        application.get("/api/pacijent/status/:status", pacijentController.getAllByStatus.bind(pacijentController));
        application.get("/api/pacijent/korisnik_id/:korisnik_id", pacijentController.getAllByKorisnikId.bind(pacijentController));

        application.post("/api/pacijent", pacijentController.add.bind(pacijentController));
    }
}

export default PacijentRouter;