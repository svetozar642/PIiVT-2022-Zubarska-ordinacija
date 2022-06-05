import KartonModel from "./KartonModel.model";
import * as mysql2 from 'mysql2/promise';
import { resolve } from "path";
import { rejects } from "assert";
import IAddKarton from "./dto/IAddKarton.dto";
import { ResultSetHeader } from "mysql2/promise";
import BaseService from "../../common/BaseService";
import IAdapterOptions from '../../common/IAdapterOptions.interface';

class KartonAdapterOptions implements IAdapterOptions {
    
}

const DefaultKartonAdapterOptions: KartonAdapterOptions = {
    loadIntervencija_log: false,
}
class KartonService extends BaseService<KartonModel, KartonAdapterOptions >{
    
    tableName(): string {
        return "karton";
    }

    protected async adaptToModel(data: any, options: KartonAdapterOptions): Promise<KartonModel>{
        const karton: KartonModel = new KartonModel();

        karton.kartonId             = +data?.karton_id;
        karton.pacijentId           = +data?.pacijent_id;
        karton.intervencija_logId   = +data?.intervencija_log_id;

        return karton;
    }

    //Metode getAll() i getById() nam se sada nalaze u BaseService klasi tako da cemo ih obrisati odavde ...


    public async getAllByIntervencija_log(intervencija_log_id: number, options: KartonAdapterOptions): Promise<KartonModel[]>{
        
        return this.getAllByFieldNameAnValue('intervencija_log_id', intervencija_log_id, options );

    }

    public async getAllByPacijentId(pacijent_id: number, options: KartonAdapterOptions): Promise<KartonModel[]>{
        
        return this.getAllByFieldNameAnValue('pacijent_id', pacijent_id, options );

    }

    // Posto smo obecali da cemo dostaviti jedan KorisnikModel nakon uspesnog dodavanja zajedno sa njegovim novododeljenim ID
    // Napomena: ukoliko tabela u koju dodajemo polje sadrzi neko UQ polje i mi pokusamo da dodamo novi red sa vec postojecim takvim poljem to nece biti moguce 
    // i moracemo da reject-ujemo (reject od Promise-a) 
    public async add(data: IAddKarton): Promise<KartonModel> {
        return new Promise<KartonModel>( (resolve, reject) => {
            //const sql : string = "INSERT `karton` SET `pacijent_id` = ? AND `intervencija_log_id` = ?  ;";
            const sql : string = "INSERT INTO `zubarska_ordinacija_2018203764`.`karton` (`pacijent_id`, `intervencija_log_id`) VALUES (?, ? );";

            this.db.execute(sql, [data.pacijentId, data.intervencija_logId ])
                .then( async result => {
                    const info: any = result;

                    const newKartonId = +(info[0]?.insertId);

                    const newKarton: KartonModel | null = await this.getById(newKartonId, KartonAdapterOptions); 

                    if (newKarton === null){
                        return reject({ message: 'Duplicate row ! ', });
                    }

                    resolve(newKarton);
                })
                .catch(error => {
                    reject(error);
                });
        } );
    }
}

export default KartonService;

export {DefaultKartonAdapterOptions};