import IModel from '../../common/IModel.interface';
class Intervencija_logModel implements IModel{
    intervencija_logId: number;
    sifra_zuba: string;
    sifra_usluge: string;
    
    //FKs: 
    zubId: number;
    uslugaId: number;
    pacijentId: number;
    racunId: number;
}

export default Intervencija_logModel;