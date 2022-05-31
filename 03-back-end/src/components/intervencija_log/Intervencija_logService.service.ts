import Intervencija_logModel from "./Intervencija_logModel.model";
import * as mysql2 from 'mysql2/promise';
import { resolve } from "path";
import { rejects } from "assert";
import IAddIntervencija_log from "./dto/IAddIntervencija_log.dto";
import { ResultSetHeader } from "mysql2/promise";


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

    // Posto smo obecali da cemo dostaviti jedan Intervencija_logModel nakon uspesnog dodavanja zajedno sa njegovim novododeljenim ID
    // Napomena: ukoliko tabela u koju dodajemo polje sadrzi neko UQ polje i mi pokusamo da dodamo novi red sa vec postojecim takvim poljem to nece biti moguce 
    // i moracemo da reject-ujemo (reject od Promise-a) 
    public async add(data: IAddIntervencija_log): Promise<Intervencija_logModel> {
        return new Promise<Intervencija_logModel>( (resolve, reject) => {
            //const sql : string = "INSERT `intervencija_log` SET `sifra_zuba` = ? AND `sifra_usluge = ? AND `zub_id` = ? AND `usluga_id` = ? AND `pacijent_id` = ? AND `racun_id` = ? ;";
            const sql : string = "INSERT INTO `zubarska_ordinacija_2018203764`.`intervencija_log` (`sifra_zuba`, `sifra_usluge`, `zub_id`, `usluga_id`, `pacijent_id`, `racun_id`) VALUES (?, ?, ?, ?, ?, ?);";

            this.db.execute(sql, [data.sifra_zuba, data.sifra_usluge, data.zubId, data.uslugaId, data.pacijentId, data.racunId])
                .then( async result => {
                    const info: any = result;

                    const newIntervencija_logId = +(info[0]?.insertId);

                    const newIntervencija_log: Intervencija_logModel | null = await this.getById(newIntervencija_logId); 

                    if (newIntervencija_log === null){
                        return reject({ message: 'Duplicate row ! ', });
                    }

                    resolve(newIntervencija_log);
                })
                .catch(error => {
                    reject(error);
                });
        } );
    }
}

export default Intervencija_logService;