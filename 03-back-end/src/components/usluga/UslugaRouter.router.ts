import * as express from 'express';
import UslugaController from './UslugaController.controller';
import UslugaService from './UslugaService.service';
import IApplicationResources from '../../common/IApplicationResources.interface';
import IRouter from '../../common/IRouter.interface';

class UslugaRouter implements IRouter{
    public setupRoutes(application: express.Application, resources: IApplicationResources){
        const uslugaService: UslugaService = new UslugaService(resources.databaseConnection);
        const uslugaController: UslugaController = new UslugaController(uslugaService);

        application.get("/api/usluga",    uslugaController.getAll.bind(uslugaController));
        application.get("/api/usluga/:id", uslugaController.getById.bind(uslugaController));

        application.get("/api/usluga/naziv/:naziv", uslugaController.getAllByNaziv.bind(uslugaController));
        application.get("/api/usluga/sifra_usluge/:sifra_usluge", uslugaController.getAllBySifra_usluge.bind(uslugaController));
        application.get("/api/usluga/kategorija/:kategorija", uslugaController.getAllByKategorija.bind(uslugaController));
        application.get("/api/usluga/status/:status", uslugaController.getAllByStatus.bind(uslugaController));

        application.post("/api/usluga", uslugaController.add.bind(uslugaController));
    }
}

export default UslugaRouter;