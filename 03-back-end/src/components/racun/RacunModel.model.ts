import IModel from '../../common/IModel.interface';
class RacunModel implements IModel{
   
    racunId: number;
    created_at: string;
    tip_usluge: TipUsluge;
    senioritet: Senioritet;
    
    pacijentId: number;
    korisnikId: number;
    
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