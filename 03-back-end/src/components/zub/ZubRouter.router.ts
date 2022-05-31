import * as express from 'express';
import ZubController from './ZubController.controller';
import ZubService from './ZubService.service';
import IApplicationResources from '../../common/IApplicationResources.interface';
import IRouter from '../../common/IRouter.interface';

class ZubRouter implements IRouter{
    public setupRoutes(application: express.Application, resources: IApplicationResources){
        const zubService: ZubService = new ZubService(resources.databaseConnection);
        const zubController: ZubController = new ZubController(zubService);

        application.get("/api/zub",     zubController.getAll.bind(zubController));
        application.get("/api/zub/:id", zubController.getById.bind(zubController));
    }
}

export default ZubRouter;