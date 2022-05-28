import IApplicationResources from "./IApplicationResources.interface";
import * as express from "express";

//"Common interface" koji ce predstavljati svaki buducu Router koji budemo imali
export default interface IRouter{
    setupRoutes(application: express.Application, resources: IApplicationResources);
}