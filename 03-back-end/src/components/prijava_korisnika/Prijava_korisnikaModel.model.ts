import IModel from '../../common/IModel.interface';
class Prijava_korisnikaModel implements IModel{
    prijava_korisnikaId: number;
    logged_at: string;
    status: number;
    korisnicko_ime: string;
    lozinka_hash: string;
    
}

export default Prijava_korisnikaModel;