import UslugaModel, { Kategorija, Status } from "./UslugaModel.model";
import * as mysql2 from 'mysql2/promise';
import { resolve } from "path";
import { rejects } from "assert";
import IAdapterOptions from '../../common/IAdapterOptions.interface';
import BaseService from "../../common/BaseService";
import IAddUsluga from "./dto/IAddUsluga.dto";
import IEditUsluga from "./dto/IEditUsluga.dto";


//Definisali smo opsti interfejs sa opcijama adaptera (IAdapterOptions)
//Sada pravimo konkretan interfejs opcija adaptera za konkretno ovaj servis (UslugaService)
interface IUslugaAdapterOptions extends IAdapterOptions {
    
}

const DefaultUslugaAdapterOptions: IUslugaAdapterOptions = {
    
}

class UslugaAdapterOptions implements IAdapterOptions {
    
}

class UslugaService extends BaseService<UslugaModel, UslugaAdapterOptions>{

    tableName(): string {
        return "usluga";
    }

    protected async adaptToModel(data: any , options: IUslugaAdapterOptions = DefaultUslugaAdapterOptions): Promise<UslugaModel>{
        const usluga: UslugaModel = new UslugaModel();

        usluga.uslugaId                     = +data?.usluga_id;
        usluga.naziv                        = data?.naziv;
        usluga.opis                         = data?.opis;
        usluga.sifra_usluge                 = data?.sifra_usluge;
        usluga.kategorija                   = data?.kategorija;
        usluga.cena_pojedinacna_dete        = +data?.cena_pojedinacna_dete;
        usluga.cena_pojedinacna_penzioner   = +data?.cena_pojedinacna_penzioner;
        usluga.cena_pojedinacna_ostali      = +data?.cena_pojedinacna_ostali;
        usluga.cena_paket_dete              = +data?.cena_paket_dete;
        usluga.cena_paket_penzioner         = +data?.cena_paket_penzioner;
        usluga.cena_paket_ostali            = +data?.cena_paket_ostali;
        usluga.status                       = data?.status;

        return usluga;
    }

    
    // getAll() i getById() metode nam vise ne trebaju jer se nalaze u BaseService klasi , tako da cemo ih obrisati odavde ...

    public async getAllByNaziv(naziv: string, options: UslugaAdapterOptions): Promise<UslugaModel[]>{
        
        return this.getAllByFieldNameAnValue('naziv', naziv, options );

    }

    public async getAllBySifra_usluge(sifra_usluge: string, options: UslugaAdapterOptions): Promise<UslugaModel[]>{
        
        return this.getAllByFieldNameAnValue('sifra_usluge', sifra_usluge, options );

    }

    public async getAllByKategorija(kategorija: string, options: UslugaAdapterOptions): Promise<UslugaModel[]>{
        
        return this.getAllByFieldNameAnValue('kategorija', kategorija, options );

    }

    public async getAllByStatus(status: string, options: UslugaAdapterOptions): Promise<UslugaModel[]>{
        
        return this.getAllByFieldNameAnValue('status', status, options );

    }

    // Posto smo obecali da cemo dostaviti jedan UslugaModel nakon uspesnog dodavanja zajedno sa njegovim novododeljenim ID
    // Napomena: ukoliko tabela u koju dodajemo polje sadrzi neko UQ polje i mi pokusamo da dodamo novi red sa vec postojecim takvim poljem to nece biti moguce 
    // i moracemo da reject-ujemo (reject od Promise-a) 
    //Posto smo implementirali u Base servisu univerzalnu metodu add() ovo cemo da stavimo pod komentar jer necemo koristiti ovaj nacin (manuelni)...
    /*public async add(data: IAddUsluga): Promise<UslugaModel> {
        return new Promise<UslugaModel>( (resolve, reject) => {
            //const sql : string = "INSERT `usluga` SET `naziv` = ? AND `opis = ? AND `sifra_usluge` = ? AND `kategorija` = ? AND `cena_pojedinacna_dete` = ? AND `cena_pojedinacna_penzioner` = ? AND `cena_pojedinacna_ostali` = ? AND `cena_paket_dete` = ? AND `cena_paket_penzioner` = ? AND `cena_paket_ostali` = ? AND `status` = ?;";
            const sql : string = "INSERT INTO `zubarska_ordinacija_2018203764`.`usluga` (`naziv`, `opis`, `sifra_usluge`, `kategorija`, `cena_pojedinacna_dete`, `cena_pojedinacna_penzioner`, `cena_pojedinacna_ostali`, `cena_paket_dete`, `cena_paket_penzioner`, `cena_paket_ostali`, `status`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";

            this.db.execute(sql, [data.naziv, data.opis, data.sifra_usluge, data.kategorija, data.cena_pojedinacna_dete, data.cena_pojedinacna_penzioner, data.cena_pojedinacna_ostali, data.cena_paket_dete, data.cena_paket_penzioner, data.cena_paket_ostali, data.status])
                .then( async result => {
                    const info: any = result;

                    const newUslugaId = +(info[0]?.insertId);

                    const newUsluga: UslugaModel | null = await this.getById(newUslugaId, UslugaAdapterOptions); 

                    if (newUsluga === null){
                        return reject({ message: 'Duplicate row ! ', });
                    }

                    resolve(newUsluga);
                })
                .catch(error => {
                    reject(error);
                });
        } );
    }*/

    public async add(data: IAddUsluga): Promise<UslugaModel> {
        return this.baseAdd(data, DefaultUslugaAdapterOptions);
    }

    public async editById(usluga_id: number, data: IEditUsluga ): Promise<UslugaModel> {
        return this.baseEditById(usluga_id, data, DefaultUslugaAdapterOptions);
    } 

}

export default UslugaService;

export {DefaultUslugaAdapterOptions};