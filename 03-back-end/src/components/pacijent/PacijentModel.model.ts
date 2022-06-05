import IModel from '../../common/IModel.interface';

class PacijentModel implements IModel{
    pacijentId: number;
    ime: string;
    prezime: string;
    jmbg: string;
    adresa: string;
    telefon: string;
    email: string;
    senioritet: Senioritet;
    status: Status;

    //FKs :
    korisnikId: number;

}

enum Status{
    aktivan = "aktivan",
    neaktivan = "neaktivan"
}

enum Senioritet{
    dete = "dete",
    penzioner = "penzioner",
    ostali = "ostali"
}


export default PacijentModel;
export  {Status, Senioritet};
