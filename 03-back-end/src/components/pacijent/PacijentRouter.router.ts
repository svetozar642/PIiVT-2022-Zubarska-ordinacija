import * as express from 'express';
import PacijentController from './PacijentController.controller';
import PacijentService from './PacijentService.service';
import IApplicationResources from '../../common/IApplicationResources.interface';
import IRouter from '../../common/IRouter.interface';
import AuthMiddleware from '../../middlewares/AuthMiddleware';

class PacijentRouter implements IRouter{
    public setupRoutes(application: express.Application, resources: IApplicationResources){
        const pacijentService: PacijentService = new PacijentService(resources.databaseConnection);
        const pacijentController: PacijentController = new PacijentController(pacijentService);

        application.get("/api/pacijent",                                AuthMiddleware.getVerifier("korisnik"), pacijentController.getAll.bind(pacijentController));
        application.get("/api/pacijent/:id",                            AuthMiddleware.getVerifier("korisnik"), pacijentController.getById.bind(pacijentController));

        application.get("/api/pacijent/senioritet/:senioritet",         AuthMiddleware.getVerifier("korisnik"), pacijentController.getAllBySenioritet.bind(pacijentController));
        application.get("/api/pacijent/ime/:ime",                       AuthMiddleware.getVerifier("korisnik"), pacijentController.getAllByIme.bind(pacijentController));
        application.get("/api/pacijent/prezime/:prezime",               AuthMiddleware.getVerifier("korisnik"), pacijentController.getAllByPrezime.bind(pacijentController));
        application.get("/api/pacijent/jmbg/:jmbg",                     AuthMiddleware.getVerifier("korisnik"), pacijentController.getAllByJmbg.bind(pacijentController));
        application.get("/api/pacijent/adresa/:adresa",                 AuthMiddleware.getVerifier("korisnik"), pacijentController.getAllByAdresa.bind(pacijentController));
        application.get("/api/pacijent/telefon/:telefon",               AuthMiddleware.getVerifier("korisnik"), pacijentController.getAllByTelefon.bind(pacijentController));
        application.get("/api/pacijent/email/:email",                   AuthMiddleware.getVerifier("korisnik"), pacijentController.getAllByEmail.bind(pacijentController));
        application.get("/api/pacijent/status/:status",                 AuthMiddleware.getVerifier("korisnik"), pacijentController.getAllByStatus.bind(pacijentController));
        application.get("/api/pacijent/korisnik_id/:korisnik_id",       AuthMiddleware.getVerifier("korisnik"), pacijentController.getAllByKorisnikId.bind(pacijentController));

        application.post("/api/pacijent",                               AuthMiddleware.getVerifier("korisnik"), pacijentController.add.bind(pacijentController));

        application.put("/api/pacijent/:pacijent_id",                   AuthMiddleware.getVerifier("korisnik"), pacijentController.edit.bind(pacijentController));
    }
}

export default PacijentRouter;