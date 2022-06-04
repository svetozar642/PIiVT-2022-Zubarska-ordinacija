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

        application.post("/api/pacijent", pacijentController.add.bind(pacijentController));
    }
}

export default PacijentRouter;