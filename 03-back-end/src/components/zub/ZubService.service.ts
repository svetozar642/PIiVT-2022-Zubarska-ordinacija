import ZubModel, { Strana, Tip, Vilica } from "./ZubModel.model";
import * as mysql2 from 'mysql2/promise';
import { resolve } from "path";
import { rejects } from "assert";
import IAdapterOptions from '../../common/IAdapterOptions.interface';
import Intervencija_logService from '../intervencija_log/Intervencija_logService.service'; 
import BaseService from "../../common/BaseService";


//Definisali smo opsti interfejs sa opcijama adaptera (IAdapterOptions)
//Sada pravimo konkretan interfejs opcija adaptera za konkretno ovaj servis (ZubService)
interface IZubAdapterOptions extends IAdapterOptions {
    loadIntervencije_log : boolean;
}

const DefaultZubAdapterOptions: IZubAdapterOptions = {
    loadIntervencije_log: false,
}

class ZubAdapterOptions implements IAdapterOptions {
    
}

class ZubService extends BaseService<ZubModel, ZubAdapterOptions>{

    tableName(): string {
        return "zub";
    }

    protected async adaptToModel(data: any , options: IZubAdapterOptions = DefaultZubAdapterOptions): Promise<ZubModel>{
        const zub: ZubModel = new ZubModel();

        zub.zubId       = +data?.zub_id;
        zub.broj        = +data?.broj;
        zub.vilica      = data?.vilica;
        zub.tip         = data?.tip;
        zub.strana      = data?.strana;
        zub.sifra_zuba  = data?.sifra_zuba;

       /* if (options.loadIntervencije_log){
            const intervencija_logService: Intervencija_logService = new Intervencija_logService(this.db);

            //Async / await pristup:
            // "await" smo dodali ispred intervencija_logService jer levo intervencije_log ocekuje da dobije Intervencije_logModel[] , a ne Promise<Intervencija_logModel[]>
            zub.intervencije_log = await intervencija_logService.getAllByZubId(zub.zubId, {});
        } */

        return zub;
    }

    
    // getAll() i getById() metode nam vise ne trebaju jer se nalaze u BaseService klasi , tako da cemo ih obrisati odavde ...

}

export default ZubService;

export {DefaultZubAdapterOptions};