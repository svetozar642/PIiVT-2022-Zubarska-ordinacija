import ZubModel, { Strana, Tip, Vilica } from "./ZubModel.model";
import * as mysql2 from 'mysql2/promise';
import { resolve } from "path";
import { rejects } from "assert";


class ZubService{
    private db: mysql2.Connection;

    constructor(databaseConnection: mysql2.Connection){
        this.db = databaseConnection;
    }

    private async adaptToModel(data: any): Promise<ZubModel>{
        const zub: ZubModel = new ZubModel();

        zub.zubId       = +data?.zub_id;
        zub.broj        = +data?.broj;
        zub.vilica      = data?.vilica;
        zub.tip         = data?.tip;
        zub.strana      = data?.strana;
        zub.sifra_zuba  = data?.sifra_zuba;

        return zub;
    }

    public async getAll(): Promise<ZubModel[]>{
        
        return new Promise<ZubModel[]>(
            (resolve, reject) => {
                const sql: string = "SELECT * FROM `zub` ORDER BY `zub_id`;" ;
                this.db.execute(sql)
                    .then( async ( [ rows ] ) => {
                        if( rows === undefined){
                            resolve([]);
                        }

                        const zubi: ZubModel[] = [];

                        for (const row of rows as mysql2.RowDataPacket[]){
                           //primer kada bi radili rucno dodavanje (ali posto ce se ponavljati to cemo izmestiti u "adapter") :
                           /* zubi.push({
                                zubId: +(row?.zub_id),
                            }); */

                            // (transformisacemo row podatke u pojedanacne ZubModel-e) pomocu adaptera:
                            zubi.push( await this.adaptToModel(row) );
                        }
                        resolve(zubi);
                    })
                    .catch(error => {

                    });
            }
        );

    }

    public async getById(zubId: number): Promise<ZubModel | null>{
        
        return new Promise<ZubModel>(
            (resolve, reject) => {
                const sql: string = "SELECT * FROM `zub` WHERE zub_id = ?;" ;

                this.db.execute(sql, [zubId])
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

                    });
            }
        );

    }
}

export default ZubService;