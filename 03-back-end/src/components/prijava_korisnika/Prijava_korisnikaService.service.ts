import Prijava_korisnikaModel from "./Prijava_korisnikaModel.model";
import * as mysql2 from 'mysql2/promise';
import { resolve } from "path";
import { rejects } from "assert";
import IAddPrijava_korisnika from "./dto/IAddPrijava_korisnika.dto";
import { ResultSetHeader } from "mysql2/promise";
import BaseService from "../../common/BaseService";
import IAdapterOptions from '../../common/IAdapterOptions.interface';

class Prijava_korisnikaAdapterOptions implements IAdapterOptions {
    
}

const DefaultPrijava_korisnikaAdapterOptions: Prijava_korisnikaAdapterOptions = {
    loadKorisnicko_ime: false,
}

class Prijava_korisnikaService extends BaseService<Prijava_korisnikaModel, Prijava_korisnikaAdapterOptions >{
    
    tableName(): string {
        return "prijava_korisnika";
    }

    protected async adaptToModel(data: any, options: Prijava_korisnikaAdapterOptions): Promise<Prijava_korisnikaModel>{
        const prijava_korisnika: Prijava_korisnikaModel = new Prijava_korisnikaModel();

        prijava_korisnika.prijava_korisnikaId= +data?.prijava_korisnika_id;
        prijava_korisnika.logged_at= data?.logged_at;
        prijava_korisnika.status= data?.status;
        prijava_korisnika.korisnicko_ime= data?.korisnicko_ime;
        prijava_korisnika.lozinka_hash= data?.lozinka_hash

        return prijava_korisnika;
    }

    //Metode getAll() i getById() nam se sada nalaze u BaseService klasi tako da cemo ih obrisati odavde ...

    public async getAllByKorisnicko_ime(korisnicko_ime: string, options: Prijava_korisnikaAdapterOptions): Promise<Prijava_korisnikaModel[]>{
        
        return this.getAllByFieldNameAnValue('korisnicko_ime', korisnicko_ime, options );

    }

    public async getAllByStatus(status: number, options: Prijava_korisnikaAdapterOptions): Promise<Prijava_korisnikaModel[]>{
        
        return this.getAllByFieldNameAnValue('status', status, options );

    }

    // Posto smo obecali da cemo dostaviti jedan Prijava_korisnikaModel nakon uspesnog dodavanja zajedno sa njegovim novododeljenim ID
    // Napomena: ukoliko tabela u koju dodajemo polje sadrzi neko UQ polje i mi pokusamo da dodamo novi red sa vec postojecim takvim poljem to nece biti moguce 
    // i moracemo da reject-ujemo (reject od Promise-a) 
    public async add(data: IAddPrijava_korisnika): Promise<Prijava_korisnikaModel> {
        return new Promise<Prijava_korisnikaModel>( (resolve, reject) => {
            //const sql : string = "INSERT `prijava_korisnika` SET `status` AND `korisnicko_ime` = ? AND `lozinka_hash` = ? ;";
            const sql : string = "INSERT INTO `zubarska_ordinacija_2018203764`.`prijava_korisnika` (`status`, `korisnicko_ime`, `lozinka_hash`) VALUES (?, ?, ?);";

            this.db.execute(sql, [data.status, data.korisnicko_ime, data.lozinka_hash ])
                .then( async result => {
                    const info: any = result;

                    const newPrijava_korisnikaId = +(info[0]?.insertId);

                    const newPrijava_korisnika: Prijava_korisnikaModel | null = await this.getById(newPrijava_korisnikaId, Prijava_korisnikaAdapterOptions); 

                    if (newPrijava_korisnika === null){
                        return reject({ message: 'Duplicate row ! ', });
                    }

                    resolve(newPrijava_korisnika);
                })
                .catch(error => {
                    reject(error);
                });
        } );
    }
}

export default Prijava_korisnikaService;

export {DefaultPrijava_korisnikaAdapterOptions};