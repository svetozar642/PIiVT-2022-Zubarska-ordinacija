import * as express from 'express';
import KartonController from './KartonController.controller';
import KartonService from './KartonService.service';
import IApplicationResources from '../../common/IApplicationResources.interface';
import IRouter from '../../common/IRouter.interface';

class KartonRouter implements IRouter{
    public setupRoutes(application: express.Application, resources: IApplicationResources){
        const kartonService: KartonService = new KartonService(resources.databaseConnection);
        const kartonController: KartonController = new KartonController(kartonService);

        application.get("/api/karton",     kartonController.getAll.bind(kartonController));
        application.get("/api/karton/:id", kartonController.getById.bind(kartonController));

        application.get("/api/karton/pacijent_id/:pacijent_id", kartonController.getAllByPacijentId.bind(kartonController));
        application.get("/api/karton/intervencija_log/:intervencija_log_id", kartonController.getAllByIntervencija_log.bind(kartonController));

        application.post("/api/karton", kartonController.add.bind(kartonController));
    }
}

export default KartonRouter;