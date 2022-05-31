import ZubModel, { Strana, Tip, Vilica } from "./ZubModel.model";
import * as mysql2 from 'mysql2/promise';
import { resolve } from "path";
import { rejects } from "assert";
import IAdapterOptions from '../../common/IAdapterOptions.interface';
import Intervencija_logService from '../intervencija_log/Intervencija_logService.service'; 


//Definisali smo opsti interfejs sa opcijama adaptera (IAdapterOptions)
//Sada pravimo konkretan interfejs opcija adaptera za konkretno ovaj servis (ZubService)
interface IZubAdapterOptions extends IAdapterOptions {
    loadIntervencije_log : boolean;
}

const DefaultZubAdapterOptions: IZubAdapterOptions = {
    loadIntervencije_log: false,
}


class ZubService{
    private db: mysql2.Connection;

    constructor(databaseConnection: mysql2.Connection){
        this.db = databaseConnection;
    }

    private async adaptToModel(data: any , options: IZubAdapterOptions = DefaultZubAdapterOptions): Promise<ZubModel>{
        const zub: ZubModel = new ZubModel();

        zub.zubId       = +data?.zub_id;
        zub.broj        = +data?.broj;
        zub.vilica      = data?.vilica;
        zub.tip         = data?.tip;
        zub.strana      = data?.strana;
        zub.sifra_zuba  = data?.sifra_zuba;

       /* if (options.loadIntervencije_log){
            const intervencija_logService: Intervencija_logService = new Intervencija_logService(this.db);

            //Async / await pristup:
            // "await" smo dodali ispred intervencija_logService jer levo intervencije_log ocekuje da dobije Intervencije_logModel[] , a ne Promise<Intervencija_logModel[]>
            zub.intervencije_log = await intervencija_logService.getByZubId(zub.zubId);
        } */

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
                            zubi.push( await this.adaptToModel(
                                row,
                               /* {
                                    loadIntervencije_log: true,
                                } */
                            ) );
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

                        resolve(await this.adaptToModel(
                            rows[0],
                           /* {
                                loadIntervencije_log:true,
                            }   */ 
                        ));
                    })
                    .catch(error => {
                        reject(error);
                    });
            }
        );

    }
}

export default ZubService;