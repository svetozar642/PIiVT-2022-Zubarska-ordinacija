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

        application.post("/api/usluga", uslugaController.add.bind(uslugaController));
    }
}

export default UslugaRouter;