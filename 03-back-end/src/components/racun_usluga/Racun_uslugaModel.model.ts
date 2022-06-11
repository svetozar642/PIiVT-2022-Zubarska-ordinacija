import IModel from '../../common/IModel.interface';
class Racun_uslugaModel implements IModel{
    racun_usluga_id: number;
    
    //FKs: 
    zub_id: number;
    usluga_id: number;
    pacijent_id: number;
    racun_id: number;
}

export default Racun_uslugaModel;