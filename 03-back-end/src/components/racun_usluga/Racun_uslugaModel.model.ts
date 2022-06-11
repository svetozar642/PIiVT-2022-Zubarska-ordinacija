import IModel from '../../common/IModel.interface';
class Racun_uslugaModel implements IModel{
    racun_uslugaId: number;
    
    //FKs: 
    zubId: number;
    uslugaId: number;
    pacijentId: number;
    racunId: number;
}

export default Racun_uslugaModel;