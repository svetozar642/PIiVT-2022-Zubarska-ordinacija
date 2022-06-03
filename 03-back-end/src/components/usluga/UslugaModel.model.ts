import { TimerOptions } from "timers";
import Intervencija_logModel from "../intervencija_log/Intervencija_logModel.model";
import IModel from '../../common/IModel.interface';

class UslugaModel implements IModel{
    uslugaId: number;
    naziv: string;
    opis: string;
    sifra_usluge: string;
    kategorija: Kategorija;
    cena: number;
    popust_paket: number;
    popust_dete: number;
    popust_penzioner: number;
    status: Status;

    intervencije_log ?: Intervencija_logModel[];
}

enum Kategorija{
    preventivna = "preventivna",
    redovna     = "redovna",
    hirurska    = "hirurska"
}

enum Status{
    aktivna = "aktivna",
    neaktivna = "neaktivna"
}



export default UslugaModel;
export  {Kategorija,Status};
