import Intervencija_logModel from "./Intervencija_logModel.model";
import * as mysql2 from 'mysql2/promise';
import { resolve } from "path";
import { rejects } from "assert";
import IAddIntervencija_log from "./dto/IAddIntervencija_log.dto";
import { ResultSetHeader } from "mysql2/promise";
import BaseService from "../../common/BaseService";
import IAdapterOptions from '../../common/IAdapterOptions.interface';

class Intervencija_logAdapterOptions implements IAdapterOptions {
    
}

const DefaultIntervencija_logAdapterOptions: Intervencija_logAdapterOptions = {
    loadIntervencije_log: false,
}
class Intervencija_logService extends BaseService<Intervencija_logModel, Intervencija_logAdapterOptions >{
    
    tableName(): string {
        return "intervencija_log";
    }

    protected async adaptToModel(data: any, options: Intervencija_logAdapterOptions): Promise<Intervencija_logModel>{
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

    //Metode getAll() i getById() nam se sada nalaze u BaseService klasi tako da cemo ih obrisati odavde ...

    public async getAllByZubId(zubId: number, options: Intervencija_logAdapterOptions): Promise<Intervencija_logModel[]>{
        
        return this.getAllByFieldNameAnValue('zub_id', zubId, options );

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

                    const newIntervencija_log: Intervencija_logModel | null = await this.getById(newIntervencija_logId, Intervencija_logAdapterOptions); 

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

export {DefaultIntervencija_logAdapterOptions};