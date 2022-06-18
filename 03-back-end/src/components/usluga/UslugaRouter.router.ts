import * as express from 'express';
import UslugaController from './UslugaController.controller';
import UslugaService from './UslugaService.service';
import IApplicationResources from '../../common/IApplicationResources.interface';
import IRouter from '../../common/IRouter.interface';
import AuthMiddleware from '../../middlewares/AuthMiddleware';

class UslugaRouter implements IRouter{
    public setupRoutes(application: express.Application, resources: IApplicationResources){
        const uslugaService: UslugaService = new UslugaService(resources.databaseConnection);
        const uslugaController: UslugaController = new UslugaController(uslugaService);

        application.get("/api/usluga",                              AuthMiddleware.getVerifier("korisnik"), uslugaController.getAll.bind(uslugaController));
        application.get("/api/usluga/:id",                          AuthMiddleware.getVerifier("korisnik"), uslugaController.getById.bind(uslugaController));

        application.get("/api/usluga/naziv/:naziv",                 AuthMiddleware.getVerifier("korisnik"), uslugaController.getAllByNaziv.bind(uslugaController));
        application.get("/api/usluga/sifra_usluge/:sifra_usluge",   AuthMiddleware.getVerifier("korisnik"), uslugaController.getAllBySifra_usluge.bind(uslugaController));
        application.get("/api/usluga/kategorija/:kategorija",       AuthMiddleware.getVerifier("korisnik"), uslugaController.getAllByKategorija.bind(uslugaController));
        application.get("/api/usluga/status/:status",               AuthMiddleware.getVerifier("korisnik"), uslugaController.getAllByStatus.bind(uslugaController));

        application.post("/api/usluga",                             AuthMiddleware.getVerifier("korisnik"), uslugaController.add.bind(uslugaController));

        application.put("/api/usluga/:usluga_id",                   AuthMiddleware.getVerifier("korisnik"), uslugaController.edit.bind(uslugaController));
    }
}

export default UslugaRouter;