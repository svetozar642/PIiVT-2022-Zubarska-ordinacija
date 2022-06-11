import * as mysql2 from 'mysql2/promise';
import { resolve } from "path";
import { rejects } from "assert";
import IAddPacijent from "./dto/IAddPacijent.dto";
import { ResultSetHeader } from "mysql2/promise";
import BaseService from "../../common/BaseService";
import IAdapterOptions from '../../common/IAdapterOptions.interface';
import PacijentModel from "./PacijentModel.model";

class PacijentAdapterOptions implements IAdapterOptions {
    
}

const DefaultPacijentAdapterOptions: PacijentAdapterOptions = {
    
}
class PacijentService extends BaseService<PacijentModel, PacijentAdapterOptions >{
    
    tableName(): string {
        return "pacijent";
    }

    protected async adaptToModel(data: any, options: PacijentAdapterOptions): Promise<PacijentModel>{
        const pacijent: PacijentModel = new PacijentModel();

        pacijent.pacijentId = +data?.pacijent_id;
        pacijent.ime        = data?.ime;
        pacijent.prezime    = data?.prezime;
        pacijent.jmbg       = data?.jmbg;
        pacijent.adresa     = data?.adresa;
        pacijent.telefon    = data?.telefon;
        pacijent.email      = data?.email;
        pacijent.senioritet = data?.senioritet;
        pacijent.status     = data?.status;

        pacijent.korisnikId = +data?.korisnik_id;
        
        return pacijent;
    }

    //Metode getAll() i getById() nam se sada nalaze u BaseService klasi tako da cemo ih obrisati odavde ...

    public async getAllBySenioritet(senioritet: string, options: PacijentAdapterOptions): Promise<PacijentModel[]>{
        
        return this.getAllByFieldNameAnValue('senioritet', senioritet, options );

    }

    public async getAllByIme(ime: string, options: PacijentAdapterOptions): Promise<PacijentModel[]>{
        
        return this.getAllByFieldNameAnValue('ime', ime, options );

    }
    
    public async getAllByPrezime(prezime: string, options: PacijentAdapterOptions): Promise<PacijentModel[]>{
        
        return this.getAllByFieldNameAnValue('prezime', prezime, options );

    }

    public async getAllByJmbg(jmbg: string, options: PacijentAdapterOptions): Promise<PacijentModel[]>{
        
        return this.getAllByFieldNameAnValue('jmbg', jmbg, options );

    }

    
    public async getAllByAdresa(adresa: string, options: PacijentAdapterOptions): Promise<PacijentModel[]>{
        
        return this.getAllByFieldNameAnValue('adresa', adresa, options );

    }

    
    public async getAllByTelefon(telefon: string, options: PacijentAdapterOptions): Promise<PacijentModel[]>{
        
        return this.getAllByFieldNameAnValue('telefon', telefon, options );

    }

    public async getAllByEmail(email: string, options: PacijentAdapterOptions): Promise<PacijentModel[]>{
        
        return this.getAllByFieldNameAnValue('email', email, options );

    }

    public async getAllByStatus(status: string, options: PacijentAdapterOptions): Promise<PacijentModel[]>{
        
        return this.getAllByFieldNameAnValue('status', status, options );

    }

    
    public async getAllByKorisnikId(korisnik_id: number, options: PacijentAdapterOptions): Promise<PacijentModel[]>{
        
        return this.getAllByFieldNameAnValue('korisnik_id', korisnik_id, options );

    }
    // Posto smo obecali da cemo dostaviti jedan PacijentModel nakon uspesnog dodavanja zajedno sa njegovim novododeljenim ID
    // Napomena: ukoliko tabela u koju dodajemo polje sadrzi neko UQ polje i mi pokusamo da dodamo novi red sa vec postojecim takvim poljem to nece biti moguce 
    // i moracemo da reject-ujemo (reject od Promise-a) 
    public async add(data: IAddPacijent): Promise<PacijentModel> {
        return new Promise<PacijentModel>( (resolve, reject) => {
            //const sql : string = "INSERT `pacijent` SET `ime` = ? AND `prezime = ? AND `jmbg` = ? AND `adresa` = ? AND `telefon` = ? AND `email` = ? AND `status` = ? AND `korisnik_id` = ? ;";
            const sql : string = "INSERT INTO `zubarska_ordinacija_2018203764`.`pacijent` (`ime`, `prezime`, `jmbg`, `adresa`, `telefon`, `email`, `status`, `korisnik_id`) VALUES (?, ?, ?, ?, ?, ?, ?, ?);";

            this.db.execute(sql, [data.ime, data.prezime, data.jmbg, data.adresa, data.telefon, data.email, data.status, data.korisnikId])
                .then( async result => {
                    const info: any = result;

                    const newPacijentId = +(info[0]?.insertId);

                    const newPacijent: PacijentModel | null = await this.getById(newPacijentId, PacijentAdapterOptions); 

                    if (newPacijent === null){
                        return reject({ message: 'Duplicate row ! ', });
                    }

                    resolve(newPacijent);
                })
                .catch(error => {
                    reject(error);
                });
        } );
    }
}

export default PacijentService;

export {DefaultPacijentAdapterOptions};