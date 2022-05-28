import * as mysql2 from "mysql2/promise";

/*Ovaj interfejs sadrzi sve deljene resurse koje mogu sadrzati servisi i 
ostale komponente (npr. resurs baze podataka, resurs mail api , google storage, ...) */
export default interface IApplicationResources{
    databaseConnection: mysql2.Connection;
}