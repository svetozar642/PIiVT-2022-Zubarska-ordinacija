import { TimerOptions } from "timers";
import IModel from '../../common/IModel.interface';

class UslugaModel implements IModel{
    usluga_id: number;
    naziv: string;
    opis: string;
    sifra_usluge: string;
    kategorija: Kategorija;
    cena_pojedinacna_dete: number;
    cena_pojedinacna_penzioner: number;
    cena_pojedinacna_ostali: number;
    cena_paket_dete: number;
    cena_paket_penzioner: number;
    cena_paket_ostali: number;
    status: Status;

    
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
