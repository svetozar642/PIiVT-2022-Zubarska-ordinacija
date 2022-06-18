import * as express from 'express';
import KorisnikController from './KorisnikController.controller';
import KorisnikService from './KorisnikService.service';
import IApplicationResources from '../../common/IApplicationResources.interface';
import IRouter from '../../common/IRouter.interface';
import AuthMiddleware from '../../middlewares/AuthMiddleware';

class KorisnikRouter implements IRouter{
    public setupRoutes(application: express.Application, resources: IApplicationResources){
        const korisnikService: KorisnikService = new KorisnikService(resources.databaseConnection);
        const korisnikController: KorisnikController = new KorisnikController(korisnikService);

        application.get("/api/korisnik",                                AuthMiddleware.getVerifier("korisnik"), korisnikController.getAll.bind(korisnikController));
        application.get("/api/korisnik/:id",                            AuthMiddleware.getVerifier("korisnik"), korisnikController.getById.bind(korisnikController));

        application.get("/api/korisnik/korisnicko_ime/:korisnicko_ime", AuthMiddleware.getVerifier("korisnik"), korisnikController.getByKorisnicko_ime.bind(korisnikController));
        application.get("/api/korisnik/is_active/:is_active",           AuthMiddleware.getVerifier("korisnik"), korisnikController.getAllByIs_active.bind(korisnikController));
        application.get("/api/korisnik/ime/:ime",                       AuthMiddleware.getVerifier("korisnik"), korisnikController.getAllByIme.bind(korisnikController));
        application.get("/api/korisnik/prezime/:prezime",               AuthMiddleware.getVerifier("korisnik"), korisnikController.getAllByPrezime.bind(korisnikController));
        application.get("/api/korisnik/email/:email",                   AuthMiddleware.getVerifier("korisnik"), korisnikController.getAllByEmail.bind(korisnikController));
        application.get("/api/korisnik/jmbg/:jmbg",                     AuthMiddleware.getVerifier("korisnik"), korisnikController.getByJmbg.bind(korisnikController));

        application.post("/api/korisnik/register",                            /*Ova ruta mora biti slobodna ,*/ korisnikController.add.bind(korisnikController));

        application.put("/api/korisnik/:korisnik_id",                   AuthMiddleware.getVerifier("korisnik"), korisnikController.edit.bind(korisnikController));

        application.get("/api/korisnik/activate/:code",                       /*Ova ruta mora biti slobodna ,*/ korisnikController.activate.bind(korisnikController));
    }
}

export default KorisnikRouter;