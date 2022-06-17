import * as express from 'express';
import ZubController from './ZubController.controller';
import ZubService from './ZubService.service';
import IApplicationResources from '../../common/IApplicationResources.interface';
import IRouter from '../../common/IRouter.interface';
import AuthMiddleware from '../../middlewares/AuthMiddleware';

class ZubRouter implements IRouter{
    public setupRoutes(application: express.Application, resources: IApplicationResources){
        const zubService: ZubService = new ZubService(resources.databaseConnection);
        const zubController: ZubController = new ZubController(zubService);

        application.get("/api/zub",                                 AuthMiddleware.getVerifier("korisnik"), zubController.getAll.bind(zubController));
        application.get("/api/zub/:id",                             zubController.getById.bind(zubController));

        application.get("/api/zub/sifra_zuba/:sifra_zuba",          zubController.getAllBySifra_zuba.bind(zubController));
        application.get("/api/zub/broj/:broj",                      zubController.getAllByBroj.bind(zubController));
        application.get("/api/zub/vilica/:vilica",                  zubController.getAllByVilica.bind(zubController));
        application.get("/api/zub/tip/:tip",                        zubController.getAllByTip.bind(zubController));
        application.get("/api/zub/strana/:strana",                  zubController.getAllByStrana.bind(zubController));
    }
}

export default ZubRouter;