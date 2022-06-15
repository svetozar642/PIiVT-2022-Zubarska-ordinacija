import IModel from '../../common/IModel.interface';
class KorisnikModel implements IModel{
    korisnik_id: number;
    korisnicko_ime: string;
    lozinka_hash: string | null;
    ime: string;
    prezime: string;
    jmbg: string;
    email: string;
    created_at ?: string;
    is_active: Status;
    aktivacioni_kod: string | null;
    
}

enum Status{
    aktivan = "aktivan",
    neaktivan = "neaktivan"
}

export default KorisnikModel;
export {Status};