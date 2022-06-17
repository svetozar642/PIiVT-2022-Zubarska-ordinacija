import KorisnikModel from "./KorisnikModel.model";
import BaseService from "../../common/BaseService";
import IAdapterOptions from '../../common/IAdapterOptions.interface';
import IEditKorisnik from './dto/IEditKorisnik.dto';
import IAddKorisnik from "./dto/IAddKorisnik.dto";
import { rejects } from 'assert';
import { resolve } from 'path';

class KorisnikAdapterOptions implements IAdapterOptions {
    removePassword: boolean;
    removeActivationCode: boolean; 
}

const DefaultKorisnikAdapterOptions: KorisnikAdapterOptions = {
    removePassword:false,
    removeActivationCode: false, 
}
class KorisnikService extends BaseService<KorisnikModel, KorisnikAdapterOptions >{
    
    tableName(): string {
        return "korisnik";
    }

    protected async adaptToModel(data: any, options: KorisnikAdapterOptions): Promise<KorisnikModel>{
        const korisnik: KorisnikModel = new KorisnikModel();

        korisnik.korisnik_id        = +data?.korisnik_id;
        korisnik.korisnicko_ime     = data?.korisnicko_ime;
        korisnik.lozinka_hash       = data?.lozinka_hash;

        korisnik.ime                = data?.ime;
        korisnik.prezime            = data?.prezime;
        korisnik.jmbg               = data?.jmbg;
        korisnik.email              = data?.email;
        korisnik.created_at         = data?.created_at;
        korisnik.is_active          = data?.is_active;
        korisnik.aktivacioni_kod    = data?.aktivacioni_kod ? data?.aktivacioni_kod : null ;

        if (options.removePassword) {
            korisnik.lozinka_hash = null;
        }

        if (options.removeActivationCode) {
            korisnik.aktivacioni_kod = null;
        }

        return korisnik;
    }

    //Metode getAll() i getById() nam se sada nalaze u BaseService klasi tako da cemo ih obrisati odavde ...

    public async getByKorisnicko_ime(korisnicko_ime: string, options: KorisnikAdapterOptions): Promise<KorisnikModel/*[]*/ | null>{
        
        //return this.getAllByFieldNameAnValue('korisnicko_ime', korisnicko_ime, options );

        //Drugi nacin : samo smo gore u Promise morali da obecamo da cemo dostaviti jedan KorisnikModel a ne niz  KorinsikModel[] ...
        // (posto samo jedan krisnik moze da postoji sa nekim korisnickim imenom (unique) )
        return new Promise((resolve, reject) => {
            this.getAllByFieldNameAnValue("korisnicko_ime", korisnicko_ime , {removePassword:false , removeActivationCode:true})
                .then( result => {
                    if ( result.length === 0) {
                        return resolve(null);
                    }
                    
                    resolve(result[0]);
                })
                .catch ( error => {
                    reject(error);
                });

        });
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

    public async getByJmbg(jmbg: string, options: KorisnikAdapterOptions): Promise<KorisnikModel[]>{
        
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
        return this.baseAdd(data, /*DefaultKorisnikAdapterOptions*/ {
            removePassword:true,
            removeActivationCode:false
        });
    }

    public async editById(korisnik_id: number, data: IEditKorisnik ): Promise<KorisnikModel> {
        return this.baseEditById(korisnik_id, data, /*DefaultKorisnikAdapterOptions*/ {
            removePassword:true,
            removeActivationCode:true
        });
    } 

    public async getKorisnikByAktivacioniKod(code: string , options: KorisnikAdapterOptions = DefaultKorisnikAdapterOptions): Promise<KorisnikModel | null>{
        return new Promise( (resolve , reject) => {
            return this.getAllByFieldNameAnValue("aktivacioni_kod", code, options)
                .then(result => {
                    if ( result.length === 0){
                       return resolve(null);
                    }

                    resolve(result[0]);
                })
                .catch(error => {
                    reject(error?.message);
                })
        })
    }

}

export default KorisnikService;

export {DefaultKorisnikAdapterOptions};