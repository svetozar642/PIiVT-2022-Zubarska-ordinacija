import IModel from '../../common/IModel.interface';
class KorisnikModel implements IModel{
    korisnikId: number;
    korisnicko_ime: string;
    lozinka_hash: string;
    ime: string;
    prezime: string;
    jmbg: string;
    email: string;
    created_at ?: string;
    is_active: Status;
    
}

enum Status{
    aktivan = "aktivan",
    neaktivan = "neaktivan"
}

export default KorisnikModel;
export {Status};