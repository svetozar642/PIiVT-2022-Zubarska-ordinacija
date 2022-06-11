import KorisnikModel, { Status } from "./KorisnikModel.model";
import * as mysql2 from 'mysql2/promise';
import { resolve } from "path";
import { rejects } from "assert";
import IAddKorisnik from "./dto/IAddKorisnik.dto";
import { ResultSetHeader } from "mysql2/promise";
import BaseService from "../../common/BaseService";
import IAdapterOptions from '../../common/IAdapterOptions.interface';

class KorisnikAdapterOptions implements IAdapterOptions {
    
}

const DefaultKorisnikAdapterOptions: KorisnikAdapterOptions = {
    loadRacune: false,
}
class KorisnikService extends BaseService<KorisnikModel, KorisnikAdapterOptions >{
    
    tableName(): string {
        return "korisnik";
    }

    protected async adaptToModel(data: any, options: KorisnikAdapterOptions): Promise<KorisnikModel>{
        const korisnik: KorisnikModel = new KorisnikModel();

        korisnik.korisnikId     = +data?.korisnik_id;
        korisnik.korisnicko_ime = data?.korisnicko_ime;
        korisnik.lozinka_hash   = data?.lozinka_hash;

        korisnik.ime            = data?.ime;
        korisnik.prezime        = data?.prezime;
        korisnik.jmbg           = data?.jmbg;
        korisnik.email          = data?.email;
        korisnik.created_at     = data?.created_at;
        korisnik.is_active      = data?.is_active;

        return korisnik;
    }

    //Metode getAll() i getById() nam se sada nalaze u BaseService klasi tako da cemo ih obrisati odavde ...

    public async getAllByKorisnicko_ime(korisnicko_ime: string, options: KorisnikAdapterOptions): Promise<KorisnikModel[]>{
        
        return this.getAllByFieldNameAnValue('korisnicko_ime', korisnicko_ime, options );

    }

    public async getAllByIme(ime: string, options: KorisnikAdapterOptions): Promise<KorisnikModel[]>{
        
        return this.getAllByFieldNameAnValue('ime', ime, options );

    }

    public async getAllByPrezime(prezime: string, options: KorisnikAdapterOptions): Promise<KorisnikModel[]>{
        
        return this.getAllByFieldNameAnValue('prezime', prezime, options );

    }

    public async getAllByEmail(email: string, options: KorisnikAdapterOptions): Promise<KorisnikModel[]>{
        
        return this.getAllByFieldNameAnValue('email', email, options );

    }

    public async getAllByJmbg(jmbg: string, options: KorisnikAdapterOptions): Promise<KorisnikModel[]>{
        
        return this.getAllByFieldNameAnValue('jmbg', jmbg, options );

    }

    public async getAllByIs_active(is_active: string, options: KorisnikAdapterOptions): Promise<KorisnikModel[]>{
        
        return this.getAllByFieldNameAnValue('is_active', is_active, options );

    }

    // Posto smo obecali da cemo dostaviti jedan KorisnikModel nakon uspesnog dodavanja zajedno sa njegovim novododeljenim ID
    // Napomena: ukoliko tabela u koju dodajemo polje sadrzi neko UQ polje i mi pokusamo da dodamo novi red sa vec postojecim takvim poljem to nece biti moguce 
    // i moracemo da reject-ujemo (reject od Promise-a) 
    //Posto smo implementirali u Base servisu univerzalnu metodu add() ovo cemo da stavimo pod komentar jer necemo koristiti ovaj nacin (manuelni)...
    /*public async add(data: IAddKorisnik): Promise<KorisnikModel> {
        return new Promise<KorisnikModel>( (resolve, reject) => {
            //const sql : string = "INSERT `korisnik` SET `korisnicko_ime` = ? AND `lozinka_hash` = ? AND `ime` = ? AND `prezime` = ? AND `jmbg` = ? AND `email` = ? AND `created_at` = ? AND `is_active` = ? ;";
            const sql : string = "INSERT INTO `zubarska_ordinacija_2018203764`.`korisnik` (`korisnicko_ime`, `lozinka_hash`, `ime`, `prezime`, `jmbg`, `email`, `is_active`) VALUES (?, ?, ?, ?, ?, ?, ?);";

            this.db.execute(sql, [data.korisnicko_ime, data.lozinka_hash, data.ime, data.prezime, data.jmbg, data.email, data.is_active])
                .then( async result => {
                    const info: any = result;

                    const newKorisnikId = +(info[0]?.insertId);

                    const newKorisnik: KorisnikModel | null = await this.getById(newKorisnikId, KorisnikAdapterOptions); 

                    if (newKorisnik === null){
                        return reject({ message: 'Duplicate row ! ', });
                    }

                    resolve(newKorisnik);
                })
                .catch(error => {
                    reject(error);
                });
        } );
    }*/

    public async add(data: IAddKorisnik): Promise<KorisnikModel> {
        return this.baseAdd(data, DefaultKorisnikAdapterOptions);
    }

}

export default KorisnikService;

export {DefaultKorisnikAdapterOptions};