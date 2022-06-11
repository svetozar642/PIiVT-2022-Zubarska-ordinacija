import RacunModel from "./RacunModel.model";
import * as mysql2 from 'mysql2/promise';
import { resolve } from "path";
import { rejects } from "assert";
import IAddRacun from "./dto/IAddRacun.dto";
import { ResultSetHeader } from "mysql2/promise";
import BaseService from "../../common/BaseService";
import IAdapterOptions from '../../common/IAdapterOptions.interface';

class RacunAdapterOptions implements IAdapterOptions {
    
}

const DefaultRacunAdapterOptions: RacunAdapterOptions = {
    
}
class RacunService extends BaseService<RacunModel, RacunAdapterOptions >{
    
    tableName(): string {
        return "racun";
    }

    protected async adaptToModel(data: any, options: RacunAdapterOptions): Promise<RacunModel>{
        const racun: RacunModel = new RacunModel();

        racun.racunId       = +data?.racun_id;
        racun.created_at    = data?.created_at;

        racun.tip_usluge    = data?.tip_usluge;
        racun.senioritet    = data?.senioritet;
        
        racun.pacijent_id    = +data?.pacijent_id;
        racun.korisnik_id    = +data?.korisnik_id;

        return racun;
    }

    //Metode getAll() i getById() nam se sada nalaze u BaseService klasi tako da cemo ih obrisati odavde ...


    public async getAllByKorisnikId(korisnik_id: number, options: RacunAdapterOptions): Promise<RacunModel[]>{
        
        return this.getAllByFieldNameAnValue('korisnik_id', korisnik_id, options );

    }

    public async getAllByPacijentId(pacijent_id: number, options: RacunAdapterOptions): Promise<RacunModel[]>{
        
        return this.getAllByFieldNameAnValue('pacijent_id', pacijent_id, options );

    }

    public async getAllBySenioritet(senioritet: string, options: RacunAdapterOptions): Promise<RacunModel[]>{
        
        return this.getAllByFieldNameAnValue('senioritet', senioritet, options );

    }

    public async getAllByTipUsluge(tip_usluge: string, options: RacunAdapterOptions): Promise<RacunModel[]>{
        
        return this.getAllByFieldNameAnValue('tip_usluge', tip_usluge, options );

    }
    

    // Posto smo obecali da cemo dostaviti jedan KorisnikModel nakon uspesnog dodavanja zajedno sa njegovim novododeljenim ID
    // Napomena: ukoliko tabela u koju dodajemo polje sadrzi neko UQ polje i mi pokusamo da dodamo novi red sa vec postojecim takvim poljem to nece biti moguce 
    // i moracemo da reject-ujemo (reject od Promise-a) 
    //Posto smo implementirali u Base servisu univerzalnu metodu add() ovo cemo da stavimo pod komentar jer necemo koristiti ovaj nacin (manuelni)...
    /*public async add(data: IAddRacun): Promise<RacunModel> {
        return new Promise<RacunModel>( (resolve, reject) => {
            //const sql : string = "INSERT `racun` SET `tip_usluge` = ? AND `senioritet` = ? AND `cena` = ? AND `pacijent_id` = ? AND `korinsik_id` = ? ;";
            const sql : string = "INSERT INTO `zubarska_ordinacija_2018203764`.`racun` (`tip_usluge`, `senioritet`, `pacijent_id`, `korisnik_id`) VALUES ( ?, ?, ?, ?);";

            this.db.execute(sql, [data.tip_usluge, data.senioritet, data.pacijentId, data.korisnikId ])
                .then( async result => {
                    const info: any = result;

                    const newRacunId = +(info[0]?.insertId);

                    const newRacun: RacunModel | null = await this.getById(newRacunId, RacunAdapterOptions); 

                    if (newRacun === null){
                        return reject({ message: 'Duplicate row ! ', });
                    }

                    resolve(newRacun);
                })
                .catch(error => {
                    reject(error);
                });
        } );
    }*/

    public async add(data: IAddRacun): Promise<RacunModel> {
        return this.baseAdd(data, DefaultRacunAdapterOptions);
    }

}

export default RacunService;

export {DefaultRacunAdapterOptions};