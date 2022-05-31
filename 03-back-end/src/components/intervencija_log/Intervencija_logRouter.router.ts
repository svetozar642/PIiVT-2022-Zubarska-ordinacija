import * as express from 'express';
import Intervencija_logController from './Intervencija_logController.controller';
import Intervencija_logService from './Intervencija_logService.service';
import IApplicationResources from '../../common/IApplicationResources.interface';
import IRouter from '../../common/IRouter.interface';

class Intervencija_logRouter implements IRouter{
    public setupRoutes(application: express.Application, resources: IApplicationResources){
        const intervencija_logService: Intervencija_logService = new Intervencija_logService(resources.databaseConnection);
        const intervencija_logController: Intervencija_logController = new Intervencija_logController(intervencija_logService);

        application.get("/api/intervencija_log",     intervencija_logController.getAll.bind(intervencija_logController));
        application.get("/api/intervencija_log/:id", intervencija_logController.getById.bind(intervencija_logController));

        application.post("/api/intervencija_log", intervencija_logController.add.bind(intervencija_logController));
    }
}

export default Intervencija_logRouter;