import Racun_uslugaModel from "./Racun_uslugaModel.model";
import * as mysql2 from 'mysql2/promise';
import { resolve } from "path";
import { rejects } from "assert";
import IAddRacun_usluga from "./dto/IAddRacun_usluga.dto";
import { ResultSetHeader } from "mysql2/promise";
import BaseService from "../../common/BaseService";
import IAdapterOptions from '../../common/IAdapterOptions.interface';

class Racun_uslugaAdapterOptions implements IAdapterOptions {
    
}

const DefaultRacun_uslugaAdapterOptions: Racun_uslugaAdapterOptions = {
    
}
class Racun_uslugaService extends BaseService<Racun_uslugaModel, Racun_uslugaAdapterOptions >{
    
    tableName(): string {
        return "racun_usluga";
    }

    protected async adaptToModel(data: any, options: Racun_uslugaAdapterOptions): Promise<Racun_uslugaModel>{
        const racun_usluga: Racun_uslugaModel = new Racun_uslugaModel();

        racun_usluga.racun_uslugaId = +data?.racun_usluga_id;
        

        racun_usluga.zubId              = data?.zub_id;
        racun_usluga.uslugaId           = data?.usluga_id;
        racun_usluga.pacijentId         = data?.pacijent_id;
        racun_usluga.racunId            = data?.racun_id;

        return racun_usluga;
    }

    //Metode getAll() i getById() nam se sada nalaze u BaseService klasi tako da cemo ih obrisati odavde ...

    public async getAllByZubId(zubId: number, options: Racun_uslugaAdapterOptions): Promise<Racun_uslugaModel[]>{
        
        return this.getAllByFieldNameAnValue('zub_id', zubId, options );

    }

    public async getAllByUslugaId(uslugaId: number, options: Racun_uslugaAdapterOptions): Promise<Racun_uslugaModel[]>{
        
        return this.getAllByFieldNameAnValue('usluga_id', uslugaId, options );

    }

    public async getAllByPacijentId(pacijentId: number, options: Racun_uslugaAdapterOptions): Promise<Racun_uslugaModel[]>{
        
        return this.getAllByFieldNameAnValue('pacijent_id', pacijentId, options );

    }

    public async getAllByRacunId(racunId: number, options: Racun_uslugaAdapterOptions): Promise<Racun_uslugaModel[]>{
        
        return this.getAllByFieldNameAnValue('racun_id', racunId, options );

    }

    // Posto smo obecali da cemo dostaviti jedan Racun_uslugaModel nakon uspesnog dodavanja zajedno sa njegovim novododeljenim ID
    // Napomena: ukoliko tabela u koju dodajemo polje sadrzi neko UQ polje i mi pokusamo da dodamo novi red sa vec postojecim takvim poljem to nece biti moguce 
    // i moracemo da reject-ujemo (reject od Promise-a) 
    public async add(data: IAddRacun_usluga): Promise<Racun_uslugaModel> {
        return new Promise<Racun_uslugaModel>( (resolve, reject) => {
            //const sql : string = "INSERT `racun_usluga` SET `zub_id` = ? AND `usluga_id` = ? AND `pacijent_id` = ? AND `racun_id` = ? ;";
            const sql : string = "INSERT INTO `zubarska_ordinacija_2018203764`.`racun_usluga` ( `zub_id`, `usluga_id`, `pacijent_id`, `racun_id`) VALUES ( ?, ?, ?, ?);";

            this.db.execute(sql, [ data.zubId, data.uslugaId, data.pacijentId, data.racunId])
                .then( async result => {
                    const info: any = result;

                    const newRacun_uslugaId = +(info[0]?.insertId);

                    const newRacun_usluga: Racun_uslugaModel | null = await this.getById(newRacun_uslugaId, Racun_uslugaAdapterOptions); 

                    if (newRacun_usluga === null){
                        return reject({ message: 'Duplicate row ! ', });
                    }

                    resolve(newRacun_usluga);
                })
                .catch(error => {
                    reject(error);
                });
        } );
    }
}

export default Racun_uslugaService;

export {DefaultRacun_uslugaAdapterOptions};