import IModel from '../../common/IModel.interface';

class PacijentModel implements IModel{
    pacijentId: number;
    ime: string;
    prezime: string;
    jmbg: string;
    adresa: string;
    telefon: string;
    email: string;
    status: Status;

    //FKs :
    korisnikId: number;

}

enum Status{
    aktivan = "aktivan",
    neaktivan = "neaktivan"
}


export default PacijentModel;
export  {Status};
