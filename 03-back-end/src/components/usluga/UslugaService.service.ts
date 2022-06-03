import UslugaModel, { Kategorija, Status } from "./UslugaModel.model";
import * as mysql2 from 'mysql2/promise';
import { resolve } from "path";
import { rejects } from "assert";
import IAdapterOptions from '../../common/IAdapterOptions.interface';
import Intervencija_logService from '../intervencija_log/Intervencija_logService.service'; 
import BaseService from "../../common/BaseService";


//Definisali smo opsti interfejs sa opcijama adaptera (IAdapterOptions)
//Sada pravimo konkretan interfejs opcija adaptera za konkretno ovaj servis (UslugaService)
interface IUslugaAdapterOptions extends IAdapterOptions {
    loadIntervencije_log : boolean;
}

const DefaultUslugaAdapterOptions: IUslugaAdapterOptions = {
    loadIntervencije_log: false,
}

class UslugaAdapterOptions implements IAdapterOptions {
    
}

class UslugaService extends BaseService<UslugaModel, UslugaAdapterOptions>{

    tableName(): string {
        return "usluga";
    }

    protected async adaptToModel(data: any , options: IUslugaAdapterOptions = DefaultUslugaAdapterOptions): Promise<UslugaModel>{
        const usluga: UslugaModel = new UslugaModel();

        //Zaokruzivanje decimalnog broja na jednu decimalu (za dve decimale sa 100):
        //Math.round(number * 10) / 10

        usluga.uslugaId         = +data?.usluga_id;
        usluga.naziv            = data?.naziv;
        usluga.opis             = data?.opis;
        usluga.sifra_usluge     = data?.sifra_usluge;
        usluga.kategorija       = data?.kategorija;
        usluga.cena             = +data?.cena;
        usluga.popust_paket     = Math.round(+data?.popust_paket*100)/100;
        usluga.popust_dete      = Math.round(+data?.popust_dete*100)/100;
        usluga.popust_penzioner = Math.round(+data?.popust_penzioner*100)/100;
        usluga.status           = data?.status;

        /* if (options.loadIntervencije_log){
            const intervencija_logService: Intervencija_logService = new Intervencija_logService(this.db);

            //Async / await pristup:
            // "await" smo dodali ispred intervencija_logService jer levo intervencije_log ocekuje da dobije Intervencije_logModel[] , a ne Promise<Intervencija_logModel[]>
            usluga.intervencije_log = await intervencija_logService.getAllByUslugaId(usluga.uslugaId, {});
        } */

        return usluga;
    }

    
    // getAll() i getById() metode nam vise ne trebaju jer se nalaze u BaseService klasi , tako da cemo ih obrisati odavde ...

}

export default UslugaService;

export {DefaultUslugaAdapterOptions};