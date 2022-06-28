import IModel from '../../common/IModel.interface';
class RacunModel implements IModel{
   
    racun_id: number;
    created_at: string;
    tip_usluge: TipUsluge;
    senioritet: Senioritet;
    
    pacijent_id: number;
    korisnik_id: number;
    
}

enum TipUsluge{
    pojedinacna = "pojedinacna",
    paket = "paket"
}

enum Senioritet{
    dete = "dete",
    penzioner = "penzioner",
    ostali = "ostali"
}

export default RacunModel ;
export {TipUsluge, Senioritet};