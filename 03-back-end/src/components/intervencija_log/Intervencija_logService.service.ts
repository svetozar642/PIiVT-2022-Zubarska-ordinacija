import Intervencija_logModel from "./Intervencija_logModel.model";
import * as mysql2 from 'mysql2/promise';
import { resolve } from "path";
import { rejects } from "assert";


class Intervencija_logService{
    private db: mysql2.Connection;

    constructor(databaseConnection: mysql2.Connection){
        this.db = databaseConnection;
    }

    private async adaptToModel(data: any): Promise<Intervencija_logModel>{
        const intervencija: Intervencija_logModel = new Intervencija_logModel();

        intervencija.intervencija_logId = +data?.intervencija_log_id;
        intervencija.sifra_zuba         = data?.sifra_zuba;
        intervencija.sifra_usluge       = data?.sifra_usluge;

        intervencija.zubId              = data?.zub_id;
        intervencija.uslugaId           = data?.usluga_id;
        intervencija.pacijentId         = data?.pacijent_id;
        intervencija.kartonId           = data?.karton_id;
        intervencija.racunId            = data?.racun_id;

        return intervencija;
    }

    public async getAll(): Promise<Intervencija_logModel[]>{
        
        return new Promise<Intervencija_logModel[]>(
            (resolve, reject) => {
                const sql: string = "SELECT * FROM `intervencija_log` ORDER BY `intervencija_log_id`;" ;
                this.db.execute(sql)
                    .then( async ( [ rows ] ) => {
                        if( rows === undefined){
                            resolve([]);
                        }

                        const intervencije: Intervencija_logModel[] = [];

                        for (const row of rows as mysql2.RowDataPacket[]){
                           //primer kada bi radili rucno dodavanje (ali posto ce se ponavljati to cemo izmestiti u "adapter") :
                           /* zubi.push({
                                zubId: +(row?.zub_id),
                            }); */

                            // (transformisacemo row podatke u pojedanacne ZubModel-e) pomocu adaptera:
                            intervencije.push( await this.adaptToModel(row) );
                        }
                        resolve(intervencije);
                    })
                    .catch(error => {

                    });
            }
        );

    }

    public async getById(intervencija_logId: number): Promise<Intervencija_logModel | null>{
        
        return new Promise<Intervencija_logModel>(
            (resolve, reject) => {
                const sql: string = "SELECT * FROM `intervencija_log` WHERE intervencija_log_id = ?;" ;

                this.db.execute(sql, [intervencija_logId])
                    .then( async ( [ rows ] ) => {
                        if( rows === undefined){
                            resolve(null);
                        }

                        if (Array.isArray(rows) && rows.length === 0){
                            resolve(null);
                        }

                        resolve(await this.adaptToModel(rows[0]));
                    })
                    .catch(error => {
                        reject(error);
                    });
            }
        );

    }

    public async getByZubId(zubId: number): Promise<Intervencija_logModel[]>{
        
        return new Promise<Intervencija_logModel[]>(
            (resolve, reject) => {
                const sql: string = "SELECT * FROM `intervencija_log` WHERE zub_id = ? ORDER BY `zub_id`;" ;

                this.db.execute(sql, [zubId])
                    .then( async ( [ rows ] ) => {
                        if( rows === undefined){
                            resolve([]);
                        }

                        const intervencije: Intervencija_logModel[] = [];

                        for (const row of rows as mysql2.RowDataPacket[]){
                        //primer kada bi radili rucno dodavanje (ali posto ce se ponavljati to cemo izmestiti u "adapter") :
                        /* zubi.push({
                                zubId: +(row?.zub_id),
                            }); */

                            // (transformisacemo row podatke u pojedanacne ZubModel-e) pomocu adaptera:
                            intervencije.push( await this.adaptToModel(row) );
                        }
                        resolve(intervencije);
                    })
                    .catch(error => {

                    });
            }
        );

    }
}

export default Intervencija_logService;